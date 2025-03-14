/*
 * Wazuh app - React component for show configuration of log collection - sockets tab.
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
import { isString, isArray, renderValueOrDefault, renderValueOrNoValue } from '../utils/utils';
import { settingsListBuilder } from '../utils/builders';
import { LOGCOLLECTOR_SOCKET_PROP } from './types';
import { webDocumentationLink } from '../../../../../../../common/services/web_documentation';

const helpLinks = [
  {
    text: 'Sử dụng nhiều đầu ra',
    href: webDocumentationLink(
      'user-manual/capabilities/log-data-collection/log-data-configuration.html#using-multiple-outputs'
    ),
  },
  {
    text: 'Tham khảo socket',
    href: webDocumentationLink('user-manual/reference/ossec-conf/socket.html'),
  },
];

const mainSettings = [
  { field: 'name', label: 'Tên socket', render: renderValueOrNoValue },
  { field: 'location', label: 'Vị trí socket', render: renderValueOrNoValue },
  {
    field: 'mode',
    label: 'Giao thức UNIX socket',
    render: renderValueOrDefault('udp'),
  },
  {
    field: 'prefix',
    label: 'Tiền tố đặt trước tin nhắn',
    render: renderValueOrNoValue,
  },
];

class WzConfigurationLogCollectionSockets extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentConfig } = this.props;
    const items = isArray(currentConfig?.[LOGCOLLECTOR_SOCKET_PROP]?.target)
      ? settingsListBuilder(currentConfig[LOGCOLLECTOR_SOCKET_PROP].target, 'name')
      : [];
    return (
      <Fragment>
        {isString(currentConfig?.[LOGCOLLECTOR_SOCKET_PROP]) && (
          <WzNoConfig error={currentConfig[LOGCOLLECTOR_SOCKET_PROP]} help={helpLinks} />
        )}
        {!isString(currentConfig?.[LOGCOLLECTOR_SOCKET_PROP]) &&
        !currentConfig?.[LOGCOLLECTOR_SOCKET_PROP]?.target?.length ? (
          <WzNoConfig error="not-present" help={helpLinks} />
        ) : null}
        {!isString(currentConfig?.[LOGCOLLECTOR_SOCKET_PROP]) &&
        currentConfig?.[LOGCOLLECTOR_SOCKET_PROP]?.target?.length ? (
          <WzConfigurationSettingsTabSelector
            title="Sockets đầu ra"
            description="Định nghĩa đầu ra tùy chỉnh để gửi dữ liệu log"
            currentConfig={currentConfig}
            minusHeight={this.props.agent.id === '000' ? 320 : 415}
            helpLinks={helpLinks}
          >
            <WzConfigurationListSelector items={items} settings={mainSettings} />
          </WzConfigurationSettingsTabSelector>
        ) : null}
      </Fragment>
    );
  }
}

export default WzConfigurationLogCollectionSockets;
