/*
 * Wazuh app - React component for show configuration of commands.
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
import WzConfigurationSettingsListSelector from '../util-components/configuration-settings-list-selector';
import withWzConfig from '../util-hocs/wz-config';
import { isString, renderValueNoThenEnabled } from '../utils/utils';
import { settingsListBuilder } from '../utils/builders';
import { webDocumentationLink } from '../../../../../../../common/services/web_documentation';

const helpLinks = [
  {
    text: 'Tham chiếu module lệnh',
    href: webDocumentationLink('user-manual/reference/ossec-conf/wodle-command.html')
  }
];

const mainSettings = [
  { field: 'disabled', label: 'Trạng thái lệnh', renderValueNoThenEnabled },
  { field: 'tag', label: 'Tên lệnh' },
  { field: 'command', label: 'Lệnh để thực thi' },
  { field: 'interval', label: 'Khoảng thời gian giữa các lần thực thi' },
  { field: 'run_on_start', label: 'Chạy khi khởi động' },
  { field: 'ignore_output', label: 'Bỏ qua đầu ra lệnh' },
  { field: 'timeout', label: 'Thời gian chờ (tính bằng giây) để chờ thực thi' },
  { field: 'verify_md5', label: 'Xác minh tổng MD5' },
  { field: 'verify_sha1', label: 'Xác minh tổng SHA1' },
  { field: 'verify_sha256', label: 'Xác minh tổng SHA256' },
  { field: 'skip_verification', label: 'Bỏ qua xác minh checksum' }
];

class WzConfigurationCommands extends Component {
  constructor(props) {
    super(props);
    this.wodleConfig =
      this.props.currentConfig &&
      !isString(this.props.currentConfig['wmodules-wmodules'])
        ? this.props.currentConfig['wmodules-wmodules'].wmodules.filter(
            item => item['command']
          )
        : [];
  }
  render() {
    const { currentConfig } = this.props;
    const items =
      this.wodleConfig && this.wodleConfig.length
        ? settingsListBuilder(this.wodleConfig.map(item => item.command), ['tag','command'])
        : false;
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
          !items &&
          !isString(currentConfig['wmodules-wmodules']) && (
            <WzNoConfig error="not-present" help={helpLinks} />
          )}
        {currentConfig &&
        items &&
        !isString(currentConfig['wmodules-wmodules']) ? (
          <WzConfigurationSettingsTabSelector
            title="Định nghĩa lệnh"
            description="Tìm ở đây tất cả các lệnh hiện được định nghĩa"
            currentConfig={currentConfig}
            minusHeight={this.props.agent.id === '000' ? 260 : 355}
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

const sections = [{ component: 'wmodules', configuration: 'wmodules' }];

WzConfigurationCommands.propTypes = {
  // currentConfig: PropTypes.object.isRequired
};

export default withWzConfig(sections)(WzConfigurationCommands);
