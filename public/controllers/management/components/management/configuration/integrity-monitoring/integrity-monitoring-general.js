/*
 * Wazuh app - React component for show configuration of integrity monitoring - general tab.
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

import WzConfigurationSettingsTabSelector from '../util-components/configuration-settings-tab-selector';
import WzSettingsGroup from '../util-components/configuration-settings-group';

import {
  renderValueOrDefault,
  renderValueOrNoValue,
  renderValueOrYes,
  renderValueOrNo,
  renderValueNoThenEnabled
} from '../utils/utils';

import helpLinks from './help-links';

const mainSettings = [
  {
    field: 'disabled',
    label: 'Trạng thái giám sát toàn vẹn',
    render: renderValueNoThenEnabled
  },
  {
    field: 'frequency',
    label: 'Khoảng thời gian (tính bằng giây) để chạy quét toàn vẹn'
  },
  {
    field: 'scan_time',
    label: 'Thời gian trong ngày để chạy quét toàn vẹn',
    render: renderValueOrNoValue
  },
  {
    field: 'scan_day',
    label: 'Ngày trong tuần để chạy quét toàn vẹn',
    render: renderValueOrNoValue
  },
  {
    field: 'auto_ignore',
    label: 'Bỏ qua các tệp thay đổi quá nhiều lần',
    render: renderValueOrNo,
    when: 'manager'
  },
  {
    field: 'alert_new_files',
    label: 'Cảnh báo khi tệp mới được tạo',
    render: renderValueOrNo,
    when: 'manager'
  },
  { field: 'scan_on_start', label: 'Quét khi khởi động' },
  { field: 'skip_nfs', label: 'Bỏ qua quét ổ CIFS/NFS' },
  { field: 'skip_dev', label: 'Bỏ qua quét thư mục /dev' },
  { field: 'skip_sys', label: 'Bỏ qua quét thư mục /sys' },
  { field: 'skip_proc', label: 'Bỏ qua quét thư mục /proc' },
  {
    field: 'remove_old_diff',
    label: 'Xóa các snapshot cũ cục bộ',
    render: renderValueOrYes
  },
  { field: 'restart_audit', label: 'Khởi động lại daemon Audit' },
  {
    field: 'windows_audit_interval',
    label: "Interval (in seconds) to check directories' SACLs",
    render: renderValueOrDefault('300')
  },
  {
    field: 'prefilter_cmd',
    label: 'Lệnh để ngăn chặn liên kết trước',
    render: renderValueOrNoValue
  },
  { field: 'max_eps', label: 'Thông lượng báo cáo sự kiện tối đa' },
  { field: 'process_priority', label: 'Ưu tiên quá trình' },
  { field: 'database', label: 'Loại cơ sở dữ liệu' }
];

const mainSettingsOfAgentOrManager = agent =>
  agent.id === '000'
    ? mainSettings
    : mainSettings.filter(setting => setting.when !== 'manager');

class WzConfigurationIntegrityMonitoringGeneral extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentConfig, agent } = this.props;
    return (
      <Fragment>
        <WzConfigurationSettingsTabSelector
          title="Tổng quan"
          description="Các cài đặt dưới đây được áp dụng toàn cục"
          currentConfig={currentConfig['syscheck-syscheck']}
          minusHeight={this.props.agent.id === '000' ? 320 : 415}
          helpLinks={helpLinks}
        >
          <WzSettingsGroup
            config={currentConfig['syscheck-syscheck'].syscheck}
            items={mainSettingsOfAgentOrManager(agent)}
          />
        </WzConfigurationSettingsTabSelector>
      </Fragment>
    );
  }
}

WzConfigurationIntegrityMonitoringGeneral.proptTypes = {
  // currentConfig: PropTypes.object.isRequired,
  agent: PropTypes.object
};

export default WzConfigurationIntegrityMonitoringGeneral;
