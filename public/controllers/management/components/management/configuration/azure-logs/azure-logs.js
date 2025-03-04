/*
 * Wazuh app - React component for show configuration of Azure logs.
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
import WzNoConfig from '../util-components/no-config';
import withWzConfig from '../util-hocs/wz-config';
import { isString, renderValueNoThenEnabled } from '../utils/utils';
import { wodleBuilder } from '../utils/builders';
import { webDocumentationLink } from '../../../../../../../common/services/web_documentation';

const helpLinks = [
  {
    text: 'Sử dụng Wazuh để giám sát Azure',
    href: webDocumentationLink('cloud-security/azure/index.html'),
  },
  {
    text: 'Tài liệu tham khảo Azure',
    href: webDocumentationLink(
      'user-manual/reference/ossec-conf/wodle-azure-logs.html',
    ),
  },
];

const mainSettings = [
  { field: 'disabled', label: 'Đã bật', render: renderValueNoThenEnabled },
  { field: 'timeout', label: 'Thời gian chờ cho mỗi đánh giá' },
  { field: 'day', label: 'Ngày trong tháng để chạy Azure-Logs' },
  { field: 'wday', label: 'Ngày trong tháng để chạy Azure-Logs' },
  { field: 'time', label: 'Thời gian trong ngày để chạy Azure-Logs' },
  { field: 'interval', label: 'Khoảng thời gian giữa các lần thực hiện Azure-Logs' },
  {
    field: 'run_on_start',
    label: 'Chạy đánh giá ngay khi dịch vụ khởi động',
  },
];

const contentSettings = [
  { field: 'application_id', label: 'ID ứng dụng' },
  { field: 'tag', label: 'Nhãn' },
  { field: 'tenantdomain', label: 'Miền người thuê' },
  { field: 'application_key', label: 'Key ứng dụng' },
  { field: 'account_name', label: 'Tên tài khoản' },
  { field: 'account_key', label: 'Key tài khoản' },
  {
    field: 'auth_path',
    label:
      'Path of the file that contains the application identifier and the application key',
  },
];

class WzConfigurationAzure extends Component {
  constructor(props) {
    super(props);
    this.wodleConfig = wodleBuilder(this.props.currentConfig, 'azure-logs');
  }
  componentDidMount() {
    this.props.updateBadge(this.badgeEnabled());
  }
  badgeEnabled() {
    return (
      this.wodleConfig &&
      this.wodleConfig['azure-logs'] &&
      this.wodleConfig['azure-logs'].disabled === 'no'
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
          !this.wodleConfig['azure-logs'] &&
          !isString(currentConfig['wmodules-wmodules']) && (
            <WzNoConfig error='not-present' help={helpLinks} />
          )}
        {currentConfig && this.wodleConfig['azure-logs'] && (
          <WzConfigurationSettingsTabSelector
            title='Cài đặt chính'
            description='Cấu hình cho Azure logs wodle'
            currentConfig={this.wodleConfig}
            minusHeight={260}
            helpLinks={helpLinks}
          >
            <WzConfigurationSettingsGroup
              config={this.wodleConfig['azure-logs']}
              items={mainSettings}
            />
            {this.wodleConfig['azure-logs'].content &&
            this.wodleConfig['azure-logs'].content.length ? (
              <Fragment>
                {this.wodleConfig['azure-logs'].content.map(
                  (currentContent, key) => (
                    <Fragment key={`azure-logs-content-${key}`}>
                      {(currentContent.type || currentContent.tag) && (
                        <WzConfigurationSettingsGroup
                          title={currentContent.type || currentContent.tag}
                          config={currentContent}
                          items={contentSettings}
                        />
                      )}
                    </Fragment>
                  ),
                )}
              </Fragment>
            ) : null}
          </WzConfigurationSettingsTabSelector>
        )}
      </Fragment>
    );
  }
}

const sections = [{ component: 'wmodules', configuration: 'wmodules' }];

export default withWzConfig(sections)(WzConfigurationAzure);
