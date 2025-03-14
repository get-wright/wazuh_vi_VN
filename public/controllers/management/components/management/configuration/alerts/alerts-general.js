/*
 * Wazuh app - React component for show configuration of alerts - General tab.
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

import WzConfigurationSettingsGroup from '../util-components/configuration-settings-group';
import WzConfigurationSettingsTabSelector from '../util-components/configuration-settings-tab-selector';
import WzNoConfig from '../util-components/no-config';
import { isString, renderValueOrNo } from '../utils/utils';
import { webDocumentationLink } from '../../../../../../../common/services/web_documentation';

const mainSettings = [
  {
    field: 'log_alert_level',
    label: 'Mức độ nghiêm trọng tối thiểu để lưu trữ cảnh báo'
  },
  {
    field: 'email_alert_level',
    label: 'Mức độ nghiêm trọng tối thiểu để gửi cảnh báo qua email'
  },
  { field: 'use_geoip', label: 'Kích hoạt tra cứu địa lý', render: renderValueOrNo }
];
const helpLinks = [
  {
    text: 'Các trường hợp sử dụng liên quan đến tạo cảnh báo',
    href: webDocumentationLink('getting-started/use-cases/index.html')
  },
  {
    text: 'Tham khảo cảnh báo',
    href: webDocumentationLink('user-manual/reference/ossec-conf/alerts.html')
  }
];

class WzConfigurationAlertsGeneral extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentConfig, wazuhNotReadyYet } = this.props;
    return (
      <Fragment>
        {currentConfig['analysis-alerts'] &&
          isString(currentConfig['analysis-alerts']) && (
            <WzNoConfig
              error={currentConfig['analysis-alerts']}
              help={helpLinks}
            />
          )}
        {currentConfig['analysis-alerts'] &&
          !isString(currentConfig['analysis-alerts']) &&
          !currentConfig['analysis-alerts'].alerts && (
            <WzNoConfig error="not-present" help={helpLinks} />
          )}
        {wazuhNotReadyYet &&
          (!currentConfig || !currentConfig['analysis-alerts']) && (
            <WzNoConfig error="Wazuh not ready yet" help={helpLinks} />
          )}
        {currentConfig['analysis-alerts'] &&
          !isString(currentConfig['analysis-alerts']) &&
          currentConfig['analysis-alerts'].alerts && (
            <WzConfigurationSettingsTabSelector
              title="Cài đặt chính"
              description="Cài đặt cảnh báo chung"
              currentConfig={currentConfig}
              minusHeight={320}
              helpLinks={helpLinks}
            >
              <WzConfigurationSettingsGroup
                config={currentConfig['analysis-alerts'].alerts}
                items={mainSettings}
              />
            </WzConfigurationSettingsTabSelector>
          )}
      </Fragment>
    );
  }
}

WzConfigurationAlertsGeneral.propTypes = {
  // currentConfig: PropTypes.object.isRequired,
  wazuhNotReadyYet: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

export default WzConfigurationAlertsGeneral;
