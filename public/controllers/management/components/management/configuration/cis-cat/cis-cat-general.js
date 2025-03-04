/*
 * Wazuh app - React component for show configuration of CIS-CAT - general tab.
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

import WzConfigurationSettingsTabSelector from '../util-components/configuration-settings-tab-selector';
import WzConfigurationSettingsGroup from '../util-components/configuration-settings-group';
import WzNoConfig from '../util-components/no-config';
import helpLinks from './help-links';
import { isString, renderValueNoThenEnabled } from '../utils/utils';

const mainSettings = [
  {
    field: 'disabled',
    label: 'Trạng thái tích hợp CIS-CAT',
    render: renderValueNoThenEnabled
  },
  { field: 'timeout', label: 'Thời gian chờ (tính bằng giây) cho lần quét' },
  { field: 'java_path', label: 'Đường dẫn đến thư mục thực thi Java' },
  { field: 'ciscat_path', label: 'Đường dẫn đến thư mục thực thi CIS-CAT' }
];

const schedulingSettings = [
  { field: 'interval', label: 'Khoảng thời gian giữa các lần quét' },
  { field: 'scan-on-start', label: 'Quét khi khởi động' },
  { field: 'day', label: 'Ngày trong tháng để chạy quét' },
  { field: 'wday', label: 'Ngày trong tuần để chạy quét' },
  { field: 'time', label: 'Thời gian trong ngày để chạy quét' }
];

class WzConfigurationCisCatGeneral extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentConfig, wodleConfig } = this.props;
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
          !wodleConfig['cis-cat'] &&
          !isString(currentConfig['wmodules-wmodules']) && (
            <WzNoConfig error="not-present" help={helpLinks} />
          )}
        {wodleConfig['cis-cat'] && (
          <WzConfigurationSettingsTabSelector
            title="Cài đặt chính"
            description="Cài đặt chung áp dụng cho tất cả các điểm chuẩn"
            currentConfig={wodleConfig}
            minusHeight={this.props.agent.id === '000' ? 320 : 415}
            helpLinks={helpLinks}
          >
            <WzConfigurationSettingsGroup
              config={wodleConfig['cis-cat']}
              items={mainSettings}
            />
            <WzConfigurationSettingsGroup
              title="Cài đặt lịch"
              description="Thiết lập lịch quét CIS-CAT"
              config={wodleConfig['cis-cat']}
              items={schedulingSettings}
            />
          </WzConfigurationSettingsTabSelector>
        )}
      </Fragment>
    );
  }
}

WzConfigurationCisCatGeneral.propTypes = {
  // currentConfig: PropTypes.object.isRequired,
};

export default WzConfigurationCisCatGeneral;
