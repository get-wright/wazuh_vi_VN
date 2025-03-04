/*
 * Wazuh app - React component for show configuration of log settings - alerts tab.
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

import { isString } from '../utils/utils';
import helpLinks from './help-links';
import WzConfigurationSettingsTabSelector from '../util-components/configuration-settings-tab-selector';
import WzConfigurationSettingsGroup from '../util-components/configuration-settings-group';

const mainSettings = [
  { field: 'plain_format', label: 'Định dạng đơn giản' },
  { field: 'json_format', label: 'Định dạng JSON' },
  { field: 'compress_rotation', label: 'Nén xoay' },
  { field: 'saved_rotations', label: 'Các vòng quay đã lưu' },
  { field: 'schedule', label: 'Lịch trình' },
  { field: 'maxsize', label: 'Kích thước log tối đa' },
  { field: 'minsize', label: 'Kích thước log tối thiểu' },
  { field: 'maxage', label: 'Tuổi tối đa của log' }
];

class WzConfigurationLogSettingsAlerts extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentConfig } = this.props;
    return (
      <Fragment>
        {currentConfig['analysis-logging'] &&
          isString(currentConfig['analysis-logging']) && (
            <WzNoConfig
              error={currentConfig['analysis-logging']}
              help={helpLinks}
            />
          )}
        {((currentConfig['analysis-logging'] &&
          currentConfig['analysis-logging'].logging) ||
          (currentConfig['com-logging'] &&
            currentConfig['com-logging'].logging)) && (
          <WzConfigurationSettingsTabSelector
            title="Cài đặt cảnh báo"
            description="Cài đặt log cảnh báo cơ bản"
            currentConfig={currentConfig['analysis-logging'].logging.alerts}
            helpLinks={helpLinks}
          >
            <WzConfigurationSettingsGroup
              config={currentConfig['analysis-logging'].logging.alerts}
              items={mainSettings}
            />
          </WzConfigurationSettingsTabSelector>
        )}
      </Fragment>
    );
  }
}

export default WzConfigurationLogSettingsAlerts;
