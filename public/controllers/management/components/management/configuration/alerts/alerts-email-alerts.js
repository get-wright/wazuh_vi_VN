/*
 * Wazuh app - React component for show configuration of alerts - email alerts tab.
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
import WzConfigurationSettingsListSelector from '../util-components/configuration-settings-list-selector';
import WzNoConfig from '../util-components/no-config';
import { isString, isArray } from '../utils/utils';
import { settingsListBuilder } from '../utils/builders';

import { connect } from 'react-redux';
import { webDocumentationLink } from '../../../../../../../common/services/web_documentation';

const mainSettings = [
  { field: 'email_to', label: 'Gửi cảnh báo đến địa chỉ email này' },
  {
    field: 'level',
    label: 'Mức độ nghiêm trọng tối thiểu để gửi cảnh báo qua email'
  },
  {
    field: 'group',
    label: 'Chỉ gửi cảnh báo thuộc một trong các nhóm này'
  },
  {
    field: 'event_location',
    label: 'Gửi cảnh báo khi chúng khớp với vị trí sự kiện này'
  },
  { field: 'format', label: 'Định dạng cảnh báo email' },
  {
    field: 'rule_id',
    label: 'Chỉ gửi cảnh báo thuộc một trong các rule IDs này'
  },
  { field: 'do_not_delay', label: 'Tắt gửi email trễ' },
  {
    field: 'do_not_group',
    label: 'Tắt nhóm cảnh báo trong cùng một email'
  }
];

const helpLinks = [
  {
    text: 'Cấu hình cảnh báo email',
    href: webDocumentationLink('user-manual/manager/manual-email-report/index.html')
  },
  {
    text: 'Máy chủ SMTP có xác thực',
    href: webDocumentationLink('user-manual/manager/manual-email-report/smtp-authentication.html')
  },
  {
    text: 'Tham khảo thông báo email',
    href: webDocumentationLink('user-manual/reference/ossec-conf/email-alerts.html')
  }
];

class WzConfigurationAlertsEmailAlerts extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentConfig, wazuhNotReadyYet } = this.props;
    const items =
      currentConfig &&
      currentConfig['mail-alerts'] &&
      isArray(currentConfig['mail-alerts'].email_alerts)
        ? settingsListBuilder(
            currentConfig['mail-alerts'].email_alerts,
            'email_to'
          )
        : [];
    return (
      <Fragment>
        {currentConfig['mail-alerts'] &&
          isString(currentConfig['mail-alerts']) && (
            <WzNoConfig error={currentConfig['mail-alerts']} help={helpLinks} />
          )}
        {currentConfig['mail-alerts'] &&
        !isString(currentConfig['mail-alerts']) &&
        (!currentConfig['mail-alerts'].email_alerts ||
          !currentConfig['mail-alerts'].email_alerts.length) ? (
          <WzNoConfig error="not-present" help={helpLinks} />
        ) : null}
        {wazuhNotReadyYet &&
          (!currentConfig || !currentConfig['mail-alerts']) && (
            <WzNoConfig error="Wazuh not ready yet" help={helpLinks} />
          )}
        {currentConfig['mail-alerts'] &&
        isArray(currentConfig['mail-alerts'].email_alerts) &&
        currentConfig['mail-alerts'].email_alerts.length ? (
          <WzConfigurationSettingsTabSelector
            title="Cài đặt chính"
            description="Tùy chọn cảnh báo email chi tiết"
            currentConfig={currentConfig}
            minusHeight={320}
            helpLinks={helpLinks}
          >
            <WzConfigurationSettingsListSelector
              items={items}
              settings={mainSettings}
            />
          </WzConfigurationSettingsTabSelector>
        ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  wazuhNotReadyYet: state.appStateReducers.wazuhNotReadyYet
});

WzConfigurationAlertsEmailAlerts.propTypes = {
  // currentConfig: PropTypes.object.isRequired,
  wazuhNotReadyYet: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

export default connect(mapStateToProps)(WzConfigurationAlertsEmailAlerts);
