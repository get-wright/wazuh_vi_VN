/*
 * Wazuh app - React component for show configuration of global configuration - global tab.
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

import { isString } from '../utils/utils';
import { webDocumentationLink } from '../../../../../../../common/services/web_documentation';

const helpLinks = [
  {
    text: 'Tham khảo toàn cục',
    href: webDocumentationLink('user-manual/reference/ossec-conf/global.html')
  },
  {
    text: 'Tham khảo logging',
    href: webDocumentationLink('user-manual/reference/ossec-conf/logging.html')
  }
];

const mainSettings = [
  { field: 'alerts_log', label: 'Ghi cảnh báo vào tệp alerts.log' },
  {
    field: 'jsonout_output',
    label: 'Ghi cảnh báo định dạng JSON vào tệp alerts.json'
  },
  { field: 'logall', label: 'Lưu trữ tất cả các cảnh báo ở định dạng văn bản đơn giản' },
  { field: 'logall_json', label: 'Lưu trữ tất cả các cảnh báo ở định dạng JSON' },
  {
    field: 'custom_alert_output',
    label: 'Định dạng cảnh báo tùy chỉnh cho tệp alerts.log'
  },
  { field: 'plain', label: 'Ghi logs nội bộ dưới dạng văn bản' },
  { field: 'json', label: 'Ghi logs nội bộ theo định dạng JSON' },
  { field: 'max_output_size', label: 'Giới hạn kích thước tệp cảnh báo' },
  { field: 'rotate_interval', label: 'Khoảng thời gian xoay tệp' }
];

const emailSettings = [
  { field: 'email_notification', label: 'Bật cảnh báo gửi qua email' },
  { field: 'email_from', label: 'Địa chỉ người gửi cảnh báo email' },
  { field: 'email_to', label: 'Địa chỉ người nhận cảnh báo email' },
  { field: 'email_reply_to', label: 'Địa chỉ trả lời cho cảnh báo email' },
  { field: 'smtp_server', label: 'Địa chỉ máy chủ thư SMTP' },
  {
    field: 'email_maxperhour',
    label: 'Số cảnh báo email tối đa gửi mỗi giờ'
  },
  { field: 'email_log_source', label: 'Tệp để đọc dữ liệu' },
  { field: 'email_idsname', label: 'Tên được sử dụng cho tiêu đề cảnh báo email' }
];

const otherSettings = [
  {
    field: 'stats',
    label: 'Mức cảnh báo cho các cảnh báo tạo bởi phân tích thống kê'
  },
  {
    field: 'host_information',
    label: 'Mức cảnh báo cho các cảnh báo tạo bởi trình giám sát thay đổi máy chủ'
  },
  {
    field: 'memory_size',
    label: 'Kích thước bộ nhớ cho công cụ kết hợp cảnh báo'
  },
  { field: 'white_list', label: 'Địa chỉ IP được cho phép' },
  {
    field: 'geoip_db_path',
    label: 'Đường dẫn đầy đủ đến tệp cơ sở dữ liệu IPv4 của MaxMind GeoIP'
  }
];

const preludeZeroMQOutputSettings = [
  { field: 'prelude_output', label: 'Kích hoạt đầu ra Prelude' },
  { field: 'zeromq_output', label: 'Kích hoạt đầu ra ZeroMQ' },
  { field: 'zeromq_uri', label: 'ZeroMQ URI để liên kết socket publisher' }
];

const buildHelpLinks = agent =>
  agent.id === '000' ? helpLinks : [helpLinks[1]];

class WzConfigurationGlobalConfigurationGlobal extends Component {
  constructor(props) {
    super(props);
    this.helpLinks = buildHelpLinks(this.props.agent);
  }
  render() {
    const { currentConfig, agent, wazuhNotReadyYet } = this.props;
    const mainSettingsConfig =
      agent.id === '000' &&
      currentConfig['analysis-global'] &&
      currentConfig['analysis-global'].global &&
      currentConfig['com-logging'] &&
      currentConfig['com-logging'].logging
        ? {
            ...currentConfig['analysis-global'].global,
            plain: currentConfig['com-logging'].logging.plain,
            json: currentConfig['com-logging'].logging.json
          }
        : currentConfig['com-logging'] && currentConfig['com-logging'].logging
        ? {
            plain: currentConfig['com-logging'].logging.plain,
            json: currentConfig['com-logging'].logging.json
          }
        : {};
    const globalSettingsConfig =
      agent.id === '000' &&
      currentConfig['analysis-global'] &&
      currentConfig['analysis-global'].global
        ? {
            ...currentConfig['analysis-global'].global
          }
        : {};
    return (
      <Fragment>
        {currentConfig['analysis-global'] &&
          isString(currentConfig['analysis-global']) && (
            <WzNoConfig
              error={currentConfig['analysis-global']}
              help={this.helpLinks}
            />
          )}
        {agent &&
          agent.id !== '000' &&
          currentConfig['com-logging'] &&
          isString(currentConfig['com-logging']) && (
            <WzNoConfig
              error={currentConfig['com-global']}
              help={this.helpLinks}
            />
          )}
        {currentConfig['analysis-global'] &&
          !isString(currentConfig['analysis-global']) &&
          !currentConfig['analysis-global'].global && (
            <WzNoConfig error="not-present" help={this.helpLinks} />
          )}
        {wazuhNotReadyYet &&
          (!currentConfig || !currentConfig['analysis-global']) && (
            <WzNoConfig error="Wazuh not ready yet" help={this.helpLinks} />
          )}
        {((currentConfig['analysis-global'] &&
          currentConfig['analysis-global'].global) ||
          (currentConfig['com-logging'] &&
            currentConfig['com-logging'].logging)) && (
          <WzConfigurationSettingsTabSelector
            title="Cài đặt chính"
            description="Cài đặt cảnh báo và logging cơ bản"
            currentConfig={currentConfig}
            minusHeight={agent.id === '000' ? 320 : 355}
            helpLinks={this.helpLinks}
          >
            <WzConfigurationSettingsGroup
              config={mainSettingsConfig}
              items={mainSettings}
            />
            {agent.id === '000' && (
              <Fragment>
                <WzConfigurationSettingsGroup
                  title="Cài đặt email"
                  description="Cài đặt email cơ bản (cần cho cài đặt email chi tiết)"
                  config={globalSettingsConfig}
                  items={emailSettings}
                />
                <WzConfigurationSettingsGroup
                  title="Các cài đặt khác"
                  description="Cài đặt không liên quan trực tiếp đến thành phần cụ thể nào"
                  config={globalSettingsConfig}
                  items={otherSettings}
                />
                <WzConfigurationSettingsGroup
                  title="Đầu ra Prelude và ZeroMQ"
                  config={globalSettingsConfig}
                  items={preludeZeroMQOutputSettings}
                />
              </Fragment>
            )}
          </WzConfigurationSettingsTabSelector>
        )}
      </Fragment>
    );
  }
}

WzConfigurationGlobalConfigurationGlobal.propTypes = {
  // currentConfig: PropTypes.object.isRequired,
  agent: PropTypes.object,
  wazuhNotReadyYet: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

export default WzConfigurationGlobalConfigurationGlobal;
