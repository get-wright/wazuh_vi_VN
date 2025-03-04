/*
 * Wazuh app - React component for show configuration of integrity monitoring - monitored tab.
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { EuiBasicTable, EuiSpacer } from '@elastic/eui';

import WzConfigurationSettingsTabSelector from '../util-components/configuration-settings-tab-selector';
import WzConfigurationSettingsHeader from '../util-components/configuration-settings-header';
import WzConfigurationListSelector from '../util-components/configuration-settings-list-selector';
import WzNoConfig from '../util-components/no-config';
import { settingsListBuilder } from '../utils/builders';
import helpLinks from './help-links';

const renderOptsIncludes = key => item => (item.includes(key) ? 'yes' : 'no');

const mainSettings = [
  { field: 'dir', label: 'Mục đã chọn' },
  {
    field: 'opts',
    label: 'Bật giám sát thời gian thực',
    render: renderOptsIncludes('realtime')
  },
  {
    field: 'opts',
    label: 'Cho phép kiểm định (who-data)',
    render: renderOptsIncludes('check_whodata')
  },
  {
    field: 'opts',
    label: 'Báo cáo thay đổi tệp',
    render: renderOptsIncludes('report_changes')
  },
  {
    field: 'opts',
    label: 'Thực hiện tất cả các checksum',
    render: renderOptsIncludes('check_all')
  },
  {
    field: 'opts',
    label: 'Kiểm tra tổng (MD5 & SHA1)',
    render: renderOptsIncludes('check_sum')
  },
  {
    field: 'opts',
    label: 'Kiểm tra MD5 sum',
    render: renderOptsIncludes('check_md5sum')
  },
  {
    field: 'opts',
    label: 'Kiểm tra SHA1 sum',
    render: renderOptsIncludes('check_sha1sum')
  },
  {
    field: 'opts',
    label: 'Kiểm tra SHA256 sum',
    render: renderOptsIncludes('check_sha256sum')
  },
  {
    field: 'opts',
    label: 'Kiểm tra kích thước tập tin',
    render: renderOptsIncludes('check_size')
  },
  {
    field: 'opts',
    label: 'Kiểm tra chủ sở hữu tập tin',
    render: renderOptsIncludes('check_owner')
  },
  {
    field: 'opts',
    label: 'Kiểm tra các nhóm tập tin',
    render: renderOptsIncludes('check_group')
  },
  {
    field: 'opts',
    label: 'Kiểm tra quyền của tập tin',
    render: renderOptsIncludes('check_perm')
  },
  {
    field: 'opts',
    label: 'Kiểm tra thời gian sửa đổi của tập tin',
    render: renderOptsIncludes('check_mtime')
  },
  {
    field: 'opts',
    label: 'Kiểm tra inodes của các tập tin',
    render: renderOptsIncludes('check_inode')
  },
  { field: 'restrict', label: 'Giới hạn các tệp chứa chuỗi này' },
  { field: 'tags', label: 'Tags tùy chỉnh cho cảnh báo' },
  { field: 'recursion_level', label: 'Mức độ đệ quy' },
  {
    field: 'opts',
    label: 'Theo symbolic link',
    render: renderOptsIncludes('follow_symbolic_link')
  }
];

const columnsAgentWin = [
  { field: 'entry', name: 'Entry' },
  { field: 'arch', name: 'Arch' }
];

class WzConfigurationIntegrityMonitoringMonitored extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentConfig, agent } = this.props;
    const items =
      currentConfig['syscheck-syscheck'] &&
      currentConfig['syscheck-syscheck'].syscheck &&
      currentConfig['syscheck-syscheck'].syscheck.directories
        ? settingsListBuilder(
            currentConfig['syscheck-syscheck'].syscheck.directories,
            'dir'
          )
        : [];
    return (
      <Fragment>
        {currentConfig &&
        currentConfig['syscheck-syscheck'] &&
        currentConfig['syscheck-syscheck'].syscheck &&
        (currentConfig['syscheck-syscheck'].syscheck.directories &&
        !currentConfig['syscheck-syscheck'].syscheck.directories.length  &&
        ((currentConfig['syscheck-syscheck'].syscheck.registry &&
        !currentConfig['syscheck-syscheck'].syscheck.registry.length) || !currentConfig['syscheck-syscheck'].syscheck.registry)) ? (
          <WzNoConfig error="not-present" help={helpLinks} />
        ) : null}
        {currentConfig &&
        currentConfig['syscheck-syscheck'] &&
        currentConfig['syscheck-syscheck'].syscheck &&
        currentConfig['syscheck-syscheck'].syscheck.directories &&
        currentConfig['syscheck-syscheck'].syscheck.directories.length > 0 ? (
          <WzConfigurationSettingsTabSelector
            title="Các thư mục được theo dõi"
            description="Các thư mục này được đưa vào quét toàn vẹn"
            currentConfig={currentConfig['syscheck-syscheck']}
            minusHeight={this.props.agent.id === '000' ? 320 : 415}
            helpLinks={helpLinks}
          >
            <WzConfigurationListSelector
              items={items}
              settings={mainSettings}
            />
            {((agent || {}).os || {}).platform === 'windows' &&
              currentConfig &&
              currentConfig['syscheck-syscheck'] &&
              currentConfig['syscheck-syscheck'].syscheck &&
              currentConfig['syscheck-syscheck'].syscheck.registry && (
                <Fragment>
                  <EuiSpacer />
                  <WzConfigurationSettingsHeader
                    title="Các mục registry được theo dõi"
                    description="Danh sách các registry sẽ được theo dõi"
                  />
                  <EuiBasicTable
                    items={currentConfig['syscheck-syscheck'].syscheck.registry}
                    columns={columnsAgentWin}
                  />
                </Fragment>
            )}
          </WzConfigurationSettingsTabSelector>
        ) : null}
        {((agent || {}).os || {}).platform === 'windows' &&
          currentConfig &&
          currentConfig['syscheck-syscheck'] &&
          currentConfig['syscheck-syscheck'].syscheck &&
          !currentConfig['syscheck-syscheck'].syscheck.registry && (
            <WzNoConfig error="not-present" help={helpLinks} />
          )}
        {((agent || {}).os || {}).platform === 'windows' &&
          currentConfig &&
          currentConfig['syscheck-syscheck'] &&
          currentConfig['syscheck-syscheck'].syscheck &&
          currentConfig['syscheck-syscheck'].syscheck.registry &&
          currentConfig['syscheck-syscheck'].syscheck.registry.length > 0 &&
          ((currentConfig['syscheck-syscheck'].syscheck.directories && !currentConfig['syscheck-syscheck'].syscheck.directories.length)
            || !currentConfig['syscheck-syscheck'].syscheck.directories) && (
              <WzConfigurationSettingsTabSelector
                title="Các mục registry được theo dõi"
                description="Danh sách các registry sẽ được theo dõi"
                currentConfig={currentConfig}
                minusHeight={this.props.agent.id === '000' ? 320 : 415}
                helpLinks={helpLinks}
              >
                <EuiBasicTable
                  items={currentConfig['syscheck-syscheck'].syscheck.registry}
                  columns={columnsAgentWin}
                />
              </WzConfigurationSettingsTabSelector>
          )}
      </Fragment>
    );
  }
}

WzConfigurationIntegrityMonitoringMonitored.proptTypes = {
  // currentConfig: PropTypes.object.isRequired,
  agent: PropTypes.object
};

export default WzConfigurationIntegrityMonitoringMonitored;
