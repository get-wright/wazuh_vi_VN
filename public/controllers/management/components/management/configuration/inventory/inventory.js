/*
 * Wazuh app - React component for show configuration of inventory.
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

import WzNoConfig from '../util-components/no-config';
import WzConfigurationSettingsTabSelector from '../util-components/configuration-settings-tab-selector';
import WzConfigurationSettingsGroup from '../util-components/configuration-settings-group';
import withWzConfig from '../util-hocs/wz-config';
import { isString, renderValueNoThenEnabled } from '../utils/utils';
import { wodleBuilder } from '../utils/builders';
import { webDocumentationLink } from '../../../../../../../common/services/web_documentation';

const mainSettings = [
  {
    field: 'disabled',
    label: 'Trạng thái tích hợp syscollector',
    render: renderValueNoThenEnabled,
  },
  { field: 'interval', label: 'Khoảng thời gian giữa các lần quét hệ thống' },
  { field: 'scan-on-start', label: 'Quét khi khởi động' },
];

const scanSettings = [
  { field: 'hardware', label: 'Quét thông tin phần cứng' },
  { field: 'processes', label: 'Quét các tiến trình hiện tại' },
  { field: 'os', label: 'Quét thông tin hệ điều hành' },
  { field: 'packages', label: 'Quét các gói đã cài' },
  { field: 'network', label: 'Quét giao diện mạng' },
  { field: 'ports', label: 'Quét các cổng mạng mở' },
  { field: 'ports_all', label: 'Quét tất cả các cổng mạng' },
];

const helpLinks = [
  {
    text: 'Inventory hệ thống',
    href: webDocumentationLink(
      'user-manual/capabilities/system-inventory/index.html',
    ),
  },
  {
    text: 'Tham khảo module syscollector',
    href: webDocumentationLink(
      'user-manual/reference/ossec-conf/wodle-syscollector.html',
    ),
  },
];

class WzConfigurationInventory extends Component {
  constructor(props) {
    super(props);
    this.wodleConfig = wodleBuilder(this.props.currentConfig, 'syscollector');
  }
  componentDidMount() {
    this.props.updateBadge(this.badgeEnabled());
  }
  badgeEnabled() {
    return (
      this.wodleConfig &&
      this.wodleConfig.syscollector &&
      this.wodleConfig.syscollector.disabled === 'no'
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
          !this.wodleConfig.syscollector &&
          !isString(currentConfig['wmodules-wmodules']) && (
            <WzNoConfig error='not-present' help={helpLinks} />
          )}
        {currentConfig && this.wodleConfig && this.wodleConfig.syscollector && (
          <WzConfigurationSettingsTabSelector
            title='Cài đặt chính'
            description='Cài đặt chung áp dụng cho tất cả các lần quét'
            currentConfig={this.wodleConfig}
            minusHeight={this.props.agent.id === '000' ? 260 : 355}
            helpLinks={helpLinks}
          >
            <WzConfigurationSettingsGroup
              config={this.wodleConfig.syscollector}
              items={mainSettings}
            />
            <WzConfigurationSettingsGroup
              title='Cài đặt quét'
              description='Các lần quét inventory cụ thể để thu thập'
              config={this.wodleConfig.syscollector}
              items={scanSettings}
            />
          </WzConfigurationSettingsTabSelector>
        )}
      </Fragment>
    );
  }
}

const sections = [{ component: 'wmodules', configuration: 'wmodules' }];

WzConfigurationInventory.propTypes = {
  // currentConfig: PropTypes.object.isRequired
};

export default withWzConfig(sections)(WzConfigurationInventory);
