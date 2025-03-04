/*
 * Wazuh app - React View OfficeStats.
 *
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import React from 'react';
import { EuiDescriptionList, EuiPanel } from '@elastic/eui';
import { PanelModuleConfiguration } from '../../../common/modules/panel';
import { LogoOffice365 } from '../../../common/logos';
import { renderValueYesThenEnabled } from '../../../../controllers/management/components/management/configuration/utils/utils';

const settings = [
  { field: 'enabled', label: 'Trạng thái dịch vụ', render: renderValueYesThenEnabled },
  { field: 'only_future_events', label: 'Thu thập các sự kiện tạo ra từ khi trình quản lý Wazuh được khởi động'},
  { field: 'curl_max_size', label: 'Kích thước tối đa cho phép cho phản hồi API Office 365'},
  { field: 'interval', label: 'Khoảng thời gian giữa các lần thực hiện Office 365 wodle (tính bằng giây)'},
  { field: 'api_auth', label: 'Thông tin xác thực', render: (value) => value.map(v => 
    <EuiPanel paddingSize='s' key={`module_configuration_api_auth_${v.tenant_id}_${v.client_id}`}>
      <EuiDescriptionList listItems={[
        {title: 'ID người thuê', description: v.tenant_id},
        {title: 'ID máy khách', description: v.client_id},
        {title: 'Secret máy khách', description: v.client_secret},
        {title: 'Đường dẫn tệp client secret', description: v.client_secret_path},
      ].filter(item => typeof item.description !== 'undefined')}/>
    </EuiPanel>
  ).reduce((prev, cur) => [prev, <div key={`padding-len-${prev.length}`} style={{marginTop: '8px'}} /> , cur], [])},
  { field: 'subscriptions', label: 'Đăng ký', render: (value) => value
    .map(v => <EuiDescriptionList key={`module_configuration_subscriptions_${v}`}>{v}</EuiDescriptionList>)
  }
];

const mapWModuleConfigurationToRenderProperties = (wmodules: {[key: string]: any}[], wmoduleID: string, entity: string, name: string = '') => {
  const configuration = wmodules.find(wmodule => Object.keys(wmodule)[0] === wmoduleID);
  return configuration 
    ? {entity, name, configuration: configuration[Object.keys(configuration)[0]]}
    : null;
};

export const ModuleConfiguration = props => <PanelModuleConfiguration 
  moduleTitle='Office 365'
  moduleIconType={() => <LogoOffice365 className="euiIcon--primary"/>}
  settings={settings}
  configurationAPIPartialPath='/wmodules/wmodules'
  mapResponseConfiguration={(response, type, params) => {
    return type === 'agent'
      ? mapWModuleConfigurationToRenderProperties(response.data.data.wmodules, 'office365', 'Agent', params.name)
      : (type === 'cluster_node'
      ? mapWModuleConfigurationToRenderProperties(response.data.data.affected_items[0].wmodules, 'office365', 'Manager', params.name)
      : mapWModuleConfigurationToRenderProperties(response.data.data.affected_items[0].wmodules, 'office365', 'Manager')
    );
  }}
/>
