/*
 * Wazuh app - React component for show configuration of log collection - logs tab.
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
import WzConfigurationListSelector from '../util-components/configuration-settings-list-selector';
import { isString, renderValueOrDefault, renderValueOrNoValue } from '../utils/utils';
import { settingsListBuilder } from '../utils/builders';

import helpLinks from './help-links';
import { LOGCOLLECTOR_LOCALFILE_PROP, LOCALFILE_LOGS_PROP } from './types';

const renderTargetField = (item) => (item ? item.join(', ') : 'agent');

const mainSettings = [
  { field: 'logformat', label: 'Định dạng log' },
  { field: 'file', label: 'Vị trí log', render: renderValueOrNoValue },
  {
    field: 'only-future-events',
    label: 'Chỉ nhận logs xảy ra sau khi bắt đầu',
    when: 'agent',
  },
  {
    field: 'reconnect_time',
    label: 'Thời gian (tính bằng giây) để thử kết nối lại với Windows Event Channel khi nó bị ngắt',
    when: 'agent',
  },
  {
    field: 'query',
    label: 'Lọc logs theo truy vấn XPATH',
    render: renderValueOrNoValue,
    when: 'agent',
  },
  {
    field: 'labels',
    label: 'Chỉ nhận logs xảy ra sau khi bắt đầu',
    render: renderValueOrNoValue,
    when: 'agent',
  },
  {
    field: 'target',
    label: 'Chuyển hướng đầu ra tới socket này',
    render: renderTargetField,
  },
];

const getMainSettingsAgentOrManager = (agent) =>
  agent && agent.id === '000'
    ? mainSettings.filter((setting) => setting.when !== 'agent')
    : mainSettings.filter((setting) =>
        setting.when === 'agent' ? agent && agent.os && agent.os.platform === 'windows' : true
      );
class WzConfigurationLogCollectionLogs extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentConfig, agent } = this.props;
    const items = currentConfig?.[LOGCOLLECTOR_LOCALFILE_PROP]?.[LOCALFILE_LOGS_PROP]
      ? settingsListBuilder(currentConfig[LOGCOLLECTOR_LOCALFILE_PROP][LOCALFILE_LOGS_PROP], [
          'file',
          'alias',
          'commnad',
          (item) => `${item.logformat}${item.target ? ` - ${item.target.join(', ')}` : ''}`,
        ])
      : [];
    return (
      <Fragment>
        {isString(currentConfig?.[LOGCOLLECTOR_LOCALFILE_PROP]) && (
          <WzNoConfig error={currentConfig[LOGCOLLECTOR_LOCALFILE_PROP]} help={helpLinks} />
        )}
        {!isString(currentConfig?.[LOGCOLLECTOR_LOCALFILE_PROP]) &&
        !currentConfig?.[LOGCOLLECTOR_LOCALFILE_PROP]?.[LOCALFILE_LOGS_PROP]?.length ? (
          <WzNoConfig error="not-present" help={helpLinks} />
        ) : null}
        {!isString(currentConfig?.[LOGCOLLECTOR_LOCALFILE_PROP]) &&
        currentConfig?.[LOGCOLLECTOR_LOCALFILE_PROP]?.[LOCALFILE_LOGS_PROP]?.length ? (
          <WzConfigurationSettingsTabSelector
            title="Các tệp logs"
            description="Danh sách các tệp log sẽ được phân tích"
            currentConfig={currentConfig}
            minusHeight={this.props.agent.id === '000' ? 320 : 415}
            helpLinks={helpLinks}
          >
            <WzConfigurationListSelector
              items={items}
              settings={getMainSettingsAgentOrManager(agent)}
            />
          </WzConfigurationSettingsTabSelector>
        ) : null}
      </Fragment>
    );
  }
}

export default WzConfigurationLogCollectionLogs;
