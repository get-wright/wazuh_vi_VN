/*
 * Wazuh app - React component for show configuration of active response - command tab.
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

import WzNoConfig from '../util-components/no-config';
import WzConfigurationSettingsTabSelector from '../util-components/configuration-settings-tab-selector';
import WzConfigurationSettingsListSelector from '../util-components/configuration-settings-list-selector';
import { isString, renderValueNoThenEnabled } from '../utils/utils';
import { settingsListBuilder } from '../utils/builders';

import { connect } from 'react-redux';
import { webDocumentationLink } from '../../../../../../../common/services/web_documentation';

const helpLinks = [
  {
    text: 'Tài liệu ứng phó chủ động',
    href: webDocumentationLink('user-manual/capabilities/active-response/index.html')
  },
  {
    text: 'Tham chiếu lệnh',
    href: webDocumentationLink('user-manual/reference/ossec-conf/commands.html')
  }
];

const mainSettings = [
  { field: 'name', label: 'Tên lệnh' },
  { field: 'executable', label: 'Tên tệp thực thi' },
  { field: 'expect', label: 'Danh sách các trường dự kiến' },
  { field: 'extra_args', label: 'Đối số bổ sung' },
  {
    field: 'timeout_allowed',
    label: 'Cho phép lệnh này được hoàn tác',
    render: renderValueNoThenEnabled
  }
];

class WzConfigurationActiveResponseCommands extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentConfig, wazuhNotReadyYet } = this.props;
    const items =
      currentConfig &&
      currentConfig['analysis-command'] &&
      currentConfig['analysis-command'].command
        ? settingsListBuilder(currentConfig['analysis-command'].command, 'name')
        : [];
    return (
      <Fragment>
        {currentConfig['analysis-command'] &&
          isString(currentConfig['analysis-command']) && (
            <WzNoConfig
              error={currentConfig['analysis-command']}
              help={helpLinks}
            />
          )}
        {currentConfig['analysis-command'] &&
          !isString(currentConfig['analysis-command']) &&
          currentConfig['analysis-command'].command &&
          !currentConfig['analysis-command'].command.length && (
            <WzNoConfig error="not-present" help={helpLinks} />
          )}
        {wazuhNotReadyYet &&
          (!currentConfig || !currentConfig['analysis-command']) && (
            <WzNoConfig error="Wazuh not ready yet" help={helpLinks} />
          )}
        {currentConfig['analysis-command'] &&
        !isString(currentConfig['analysis-command']) &&
        currentConfig['analysis-command'].command &&
        currentConfig['analysis-command'].command.length ? (
          <WzConfigurationSettingsTabSelector
            title="Định nghĩa lệnh"
            description="Tìm ở đây tất cả các lệnh đang được sử dụng cho ứng phó chủ động"
            currentConfig={currentConfig['analysis-command']}
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

WzConfigurationActiveResponseCommands.propTypes = {
  // currentConfig: PropTypes.object.isRequired,
  wazuhNotReadyYet: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

export default connect(mapStateToProps)(WzConfigurationActiveResponseCommands);
