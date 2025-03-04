/*
 * Wazuh app - React component for show configuration of policy monitoring - general tab.
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

import WzConfigurationSettingsTabSelector from '../util-components/configuration-settings-tab-selector';
import WzConfigurationSettingsGroup from '../util-components/configuration-settings-group';
import helpLinks from './help-links';
import { isString, renderValueNoThenEnabled } from '../utils/utils';
import WzNoConfig from '../util-components/no-config';

const allSettings = [
  {
    field: 'disabled',
    label: 'Trạng thái dịch vụ giám sát chính sách',
    render: renderValueNoThenEnabled
  },
  { field: 'base_directory', label: 'Thư mục gốc' },
  { field: 'scanall', label: 'Quét toàn bộ hệ thống' },
  { field: 'frequency', label: 'Tần số (tính bằng giây) để chạy quét' },
  { field: 'check_dev', label: 'Kiểm tra đường dẫn /dev' },
  { field: 'check_files', label: 'Kiểm tra các tập tin' },
  { field: 'check_if', label: 'Kiểm tra giao diện mạng' },
  { field: 'check_pids', label: 'Kiểm tra IDs của các tiến trình' },
  { field: 'check_ports', label: 'Kiểm tra các cổng mạng' },
  { field: 'check_sys', label: 'Kiểm tra các đối tượng hệ thống dị thường' },
  { field: 'check_trojans', label: 'Kiểm tra Trojans' },
  { field: 'check_unixaudit', label: 'Kiểm tra kiểm định UNIX' },
  { field: 'check_winapps', label: 'Kiểm tra ứng dụng Windows' },
  { field: 'check_winaudit', label: 'Kiểm tra kiểm định Windows' },
  { field: 'check_winmalware', label: 'Kiểm tra phần mềm độc hại trên Windows' },
  { field: 'skip_nfs', label: 'Bỏ qua quét ổ CIFS/NFS' },
  { field: 'rootkit_files', label: 'Đường dẫn cơ sở dữ liệu tệp rootkit' },
  { field: 'rootkit_trojans', label: 'Đường dẫn cơ sở dữ liệu trojans rootkit' },
  { field: 'windows_audit', label: 'Đường dẫn tệp định nghĩa kiểm định Windows' },
  { field: 'windows_apps', label: 'Đường dẫn tệp định nghĩa ứng dụng Windows' },
  { field: 'windows_malware', label: 'Đường dẫn tệp định nghĩa phần mềm độc hại Windows' }
];

class WzConfigurationPolicyMonitoringGeneral extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentConfig } = this.props;
    return (
      <Fragment>
        {currentConfig['syscheck-rootcheck'] &&
          isString(currentConfig['syscheck-rootcheck']) && (
            <WzNoConfig
              error={currentConfig['syscheck-rootcheck']}
              help={helpLinks}
            />
          )}
        {currentConfig['syscheck-rootcheck'] &&
          !isString(currentConfig['syscheck-rootcheck']) &&
          !currentConfig['syscheck-rootcheck'].rootcheck && (
            <WzNoConfig error="not-present" help={helpLinks} />
          )}
        {((currentConfig['syscheck-rootcheck'] &&
          !isString(currentConfig['syscheck-rootcheck']) &&
          currentConfig['syscheck-rootcheck'].rootcheck) ||
          currentConfig['sca']) && (
          <WzConfigurationSettingsTabSelector
            title="Tất cả các cài đặt"
            description="Cài đặt chung cho daemon rootcheck"
            currentConfig={currentConfig}
            minusHeight={this.props.agent.id === '000' ? 320 : 415}
            helpLinks={helpLinks}
          >
            <WzConfigurationSettingsGroup
              config={currentConfig['syscheck-rootcheck'].rootcheck}
              items={allSettings}
            />
          </WzConfigurationSettingsTabSelector>
        )}
      </Fragment>
    );
  }
}

WzConfigurationPolicyMonitoringGeneral.propTypes = {
  // currentConfig: PropTypes.object.isRequired
};

export default WzConfigurationPolicyMonitoringGeneral;
