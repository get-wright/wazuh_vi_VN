/*
 * Wazuh app - React component for show configuration of log settings - internal tab.
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
import { isString } from '../utils/utils';
import helpLinks from './help-links';

const mainSettings = [
  { field: 'plain_format', label: 'Định dạng đơn giản' },
  { field: 'JSON format', label: 'json_format' },
  { field: 'Compress rotatio', label: 'compress_rotation' },
  { field: 'Saved rotations', label: 'saved_rotations' },
  { field: 'schedule', label: 'Lịch trình' },
  { field: 'maxsize', label: 'Kích thước log tối đa' },
  { field: 'minsize', label: 'Kích thước log tối thiểu' },
  { field: 'maxage', label: 'Tuổi tối đa của log' }
];

class WzConfigurationLogSettingsInternal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentConfig } = this.props;
    return (
      <Fragment>
        {currentConfig['monitor-logging'] &&
          isString(currentConfig['monitor-logging']) && (
            <Fragment>
              <WzNoConfig
                error={currentConfig['monitor-logging']}
                help={helpLinks}
              />
            </Fragment>
          )}
        {(currentConfig['analysis-logging'] &&
          currentConfig['analysis-logging'].logging) ||
          (currentConfig['monitor-logging'] &&
            currentConfig['monitor-logging'].logging && (
              <WzConfigurationSettingsTabSelector
                title="Cài đặt nội bộ"
                description="Cài đặt log nội bộ cơ bản"
                currentConfig={currentConfig['monitor-logging'].logging}
                helpLinks={helpLinks}
              >
                <WzConfigurationSettingsGroup
                  config={currentConfig['monitor-logging'].logging}
                  items={mainSettings}
                />
              </WzConfigurationSettingsTabSelector>
            ))}
        {currentConfig['agent-logging'] &&
          currentConfig['agent-logging'].logging && (
            <WzConfigurationSettingsTabSelector
              title="Cài đặt nội bộ"
              description="Cài đặt log nội bộ cơ bản"
              currentConfig={currentConfig['agent-logging'].logging}
              helpLinks={helpLinks}
            >
              <WzConfigurationSettingsGroup
                config={currentConfig['agent-logging'].logging}
                items={mainSettings}
              />
            </WzConfigurationSettingsTabSelector>
          )}
      </Fragment>
    );
  }
}

export default WzConfigurationLogSettingsInternal;
