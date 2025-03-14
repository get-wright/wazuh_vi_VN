/*
 * Wazuh app - React component for show configuration of integrity monitoring - synchronization tab.
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
import WzConfigurationSettingsGroup from '../util-components/configuration-settings-group';
import WzNoConfig from '../util-components/no-config';
import helpLinks from './help-links';
import { renderValueYesThenEnabled } from '../utils/utils';

const mainSettings = [
  {
    field: 'enabled',
    label: 'Trạng thái đồng bộ hóa',
    render: renderValueYesThenEnabled
  },
  {
    field: 'max_interval',
    label: 'Khoảng thời gian tối đa (tính bằng giây) giữa các lần đồng bộ'
  },
  { field: 'interval', label: 'Khoảng (tính bằng giây) giữa mỗi lần đồng bộ' },
  { field: 'response_timeout', label: 'Thời gian chờ phản hồi (tính bằng giây)' },
  { field: 'queue_size', label: 'Kích thước hàng đợi của phản hồi từ trình quản lý' },
  { field: 'max_eps', label: 'Thông lượng tin nhắn tối đa' }
];

class WzConfigurationIntegrityMonitoringSynchronization extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentConfig } = this.props;
    return (
      <Fragment>
        {currentConfig &&
        currentConfig['syscheck-syscheck'] &&
        currentConfig['syscheck-syscheck'].syscheck &&
        currentConfig['syscheck-syscheck'].syscheck.synchronization ? (
          <WzConfigurationSettingsTabSelector
            title="Đồng bộ hóa"
            description="Cài đặt đồng bộ hóa cơ sở dữ liệu"
            currentConfig={currentConfig['syscheck-syscheck']}
            minusHeight={this.props.agent.id === '000' ? 320 : 415}
            helpLinks={helpLinks}
          >
            <WzConfigurationSettingsGroup
              config={
                currentConfig['syscheck-syscheck'].syscheck.synchronization
              }
              items={mainSettings}
            />
          </WzConfigurationSettingsTabSelector>
        ) : (
          <WzNoConfig error="not-present" help={helpLinks} />
        )}
      </Fragment>
    );
  }
}

WzConfigurationIntegrityMonitoringSynchronization.proptTypes = {
  // currentConfig: PropTypes.object.isRequired
};

export default WzConfigurationIntegrityMonitoringSynchronization;
