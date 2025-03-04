/*
 * Wazuh app - React component for show configuration of registration service.
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

import WzConfigurationSettingsGroup from '../util-components/configuration-settings-group';
import WzConfigurationSettingsTabSelector from '../util-components/configuration-settings-tab-selector';
import withWzConfig from '../util-hocs/wz-config';
import WzNoConfig from '../util-components/no-config';
import { isString, renderValueNoThenEnabled, renderValueYesThenEnabled } from '../utils/utils';
import { webDocumentationLink } from '../../../../../../../common/services/web_documentation';

const helpLinks = [
  {
    text: 'Đăng ký trạm Wazuh',
    href: webDocumentationLink('user-manual/agent-enrollment/index.html')
  },
  {
    text: 'Tham khảo dịch vụ đăng ký',
    href: webDocumentationLink('user-manual/reference/ossec-conf/auth.html')
  }
];

const mainSettings = [
  {
    field: 'disabled',
    label: 'Trạng thái dịch vụ',
    render: renderValueNoThenEnabled,
  },
  { field: 'port', label: 'Lắng nghe kết nối tại cổng' },
  { field: 'use_source_ip', label: "Use client's source IP address" },
  { field: 'use_password', label: 'Sử dụng mật khẩu để đăng ký trạm' },
  { field: 'purge', label: 'Xóa danh sách trạm khi loại bỏ trạm' },
  {
    field: 'limit_maxagents',
    label: 'Giới hạn đăng ký tới số trạm tối đa',
  },
  {
    field: 'force.enabled',
    label: 'Bắt buộc đăng ký khi sử dụng địa chỉ IP hiện có',
  },
  {
    field: 'force.after_registration_time',
    label:
      'Specifies that the agent replacement will be performed only when the time (seconds) passed since the agent registration is greater than the value configured in the setting',
  },
  {
    field: 'force.key_mismatch',
    label: 'Tránh đăng ký lại các trạm đã có keys hợp lệ',
  },
  {
    field: 'force.disconnected_time.enabled',
    label:
      'Specifies that the replacement will be performed only for agents that have been disconnected longer than a certain time',
  },
  {
    field: 'force.disconnected_time.value',
    label: 'Số giây kể từ khi trạm bị ngắt kết nối',
  },
];

const keyRequestSettings = [
  {
    field: 'key_request.enabled',
    label: 'Trạng thái yêu cầu key',
    render: renderValueYesThenEnabled,
  },
  {
    field: 'key_request.exec_path',
    label: 'Đường dẫn đầy đủ đến tệp thực thi',
  },
  {
    field: 'key_request.socket',
    label: 'Đường dẫn đầy đủ đến Unix domain socket',
  },
  {
    field: 'key_request.timeout',
    label: 'Thời gian chờ tối đa phản hồi từ tệp thực thi',
  },
  {
    field: 'key_request.threads',
    label: 'Số luồng để gửi yêu cầu key bên ngoài',
  },
  {
    field: 'key_request.queue_size',
    label: 'Chỉ ra kích thước tối đa của hàng đợi để lấy các key bên ngoài',
  },
];

const sslSettings = [
  { field: 'ssl_verify_host', label: 'Xác minh trạm bằng chứng chỉ CA' },
  {
    field: 'ssl_auto_negotiate',
    label: 'Tự động chọn phương thức đàm phán SSL',
  },
  { field: 'ssl_manager_ca', label: 'Vị trí chứng chỉ CA' },
  { field: 'ssl_manager_cert', label: 'Vị trí chứng chỉ SSL máy chủ' },
  { field: 'ssl_manager_key', label: 'Vị trí khóa SSL máy chủ' },
  { field: 'ciphers', label: 'Sử dụng các cipher SSL sau' },
];

class WzRegistrationService extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.updateBadge(this.badgeEnabled());
  }
  badgeEnabled() {
    return (
      this.props.currentConfig['auth-auth'] &&
      this.props.currentConfig['auth-auth'].auth &&
      this.props.currentConfig['auth-auth'].auth.disabled === 'no'
    );
  }
  render() {
    const { currentConfig } = this.props;
    return (
      <Fragment>
        {currentConfig['auth-auth'] && !currentConfig['auth-auth'].auth && (
          <WzNoConfig error={currentConfig['auth-auth']} help={helpLinks} />
        )}
        {currentConfig['auth-auth'] &&
          currentConfig['auth-auth'].auth &&
          !isString(currentConfig['auth-auth'].auth) && (
            <WzConfigurationSettingsTabSelector
              title="Cài đặt chính"
              description="Cài đặt chung áp dụng cho dịch vụ đăng ký"
              currentConfig={currentConfig}
              minusHeight={260}
              helpLinks={helpLinks}
            >
              <WzConfigurationSettingsGroup
                config={currentConfig['auth-auth'].auth}
                items={mainSettings}
              />
              <WzConfigurationSettingsGroup
                title="Cài đặt yêu cầu key"
                description="Tính năng yêu cầu key cho phép lấy key của trạm từ nguồn bên ngoài, ví dụ như cơ sở dữ liệu"
                config={currentConfig['auth-auth'].auth}
                items={keyRequestSettings}
              />
              <WzConfigurationSettingsGroup
                title="Cài đặt SSL"
                description="Áp dụng khi dịch vụ đăng ký sử dụng chứng chỉ SSL"
                config={currentConfig['auth-auth'].auth}
                items={sslSettings}
              />
            </WzConfigurationSettingsTabSelector>
          )}
      </Fragment>
    );
  }
}

WzRegistrationService.propTypes = {
  // currentConfig: PropTypes.object.isRequired
};

export default withWzConfig([{ component: 'auth', configuration: 'auth' }])(WzRegistrationService);
