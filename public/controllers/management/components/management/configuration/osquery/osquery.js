/*
 * Wazuh app - React component for show configuration of Osquery.
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

import { EuiBasicTable } from '@elastic/eui';

import WzConfigurationSettingsTabSelector from '../util-components/configuration-settings-tab-selector';
import withWzConfig from '../util-hocs/wz-config';
import WzConfigurationSettingsGroup from '../util-components/configuration-settings-group';
import WzNoConfig from '../util-components/no-config';
import WzConfigurationSettingsHeader from '../util-components/configuration-settings-header';
import { isString, isArray, renderValueNoThenEnabled } from '../utils/utils';
import { wodleBuilder } from '../utils/builders';
import { webDocumentationLink } from '../../../../../../../common/services/web_documentation';

const mainSettings = [
  {
    field: 'disabled',
    label: 'Trạng thái tích hợp Osquery',
    render: renderValueNoThenEnabled
  },
  { field: 'run_daemon', label: 'Tự động chạy Osquery daemon' },
  { field: 'bin_path', label: 'Đường dẫn đến Osquery thực thi' },
  { field: 'log_path', label: 'Đường dẫn đến tệp log kết quả của Osquery' },
  { field: 'config_path', label: 'Đường dẫn tệp cấu hình Osquery' },
  { field: 'add_labels', label: 'Sử dụng nhãn đã định nghĩa làm decorators' }
];

const helpLinks = [
  {
    text: 'Tài liệu module Osquery',
    href: webDocumentationLink('user-manual/capabilities/osquery.html')
  },
  {
    text: 'Tham khảo module Osquery',
    href: webDocumentationLink('user-manual/reference/ossec-conf/wodle-osquery.html')
  }
];

const columns = [
  { field: 'name', name: 'Name' },
  { field: 'path', name: 'Path' }
];

class WzConfigurationOsquery extends Component {
  constructor(props) {
    super(props);
    this.wodleConfig = wodleBuilder(this.props.currentConfig, 'osquery');
  }
  componentDidMount() {
    this.props.updateBadge(this.badgeEnabled());
  }
  badgeEnabled() {
    return (
      this.wodleConfig &&
      this.wodleConfig.osquery &&
      this.wodleConfig.osquery.disabled === 'no'
    );
  }
  render() {
    const { currentConfig } = this.props;
    return (
      <Fragment>
        {currentConfig['wmodules-wmodules'] &&
          isString(currentConfig['wmodules-wmodules']) && (
            <WzNoConfig
              error={currentConfig['wmodules-wmodules']}
              help={helpLinks}
            />
          )}
        {currentConfig &&
          !this.wodleConfig.osquery &&
          !isString(currentConfig['wmodules-wmodules']) && (
            <WzNoConfig error="not-present" help={helpLinks} />
          )}
        {currentConfig && this.wodleConfig && this.wodleConfig.osquery && (
          <WzConfigurationSettingsTabSelector
            title="Cài đặt chính"
            description="Cài đặt tích hợp Osquery chung"
            currentConfig={this.wodleConfig}
            minusHeight={this.props.agent.id === '000' ? 260 : 355}
            helpLinks={helpLinks}
          >
            <WzConfigurationSettingsGroup
              config={this.wodleConfig.osquery}
              items={mainSettings}
              ks
            />
            {this.wodleConfig.osquery.packs &&
              isArray(this.wodleConfig.osquery.packs) &&
              this.wodleConfig.osquery.packs.length && (
                <Fragment>
                  <WzConfigurationSettingsHeader
                    title="Các gói Osquery"
                    description="Một gói chứa nhiều truy vấn để nhanh chóng truy xuất thông tin hệ thống"
                  />
                  <EuiBasicTable
                    items={this.wodleConfig.osquery.packs}
                    columns={columns}
                  />
                </Fragment>
              )}
          </WzConfigurationSettingsTabSelector>
        )}
      </Fragment>
    );
  }
}

const sections = [{ component: 'wmodules', configuration: 'wmodules' }];

WzConfigurationOsquery.propTypes = {
  // currentConfig: PropTypes.object.isRequired
};

export default withWzConfig(sections)(WzConfigurationOsquery);
