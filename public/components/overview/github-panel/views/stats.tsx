/*
 * Wazuh app - GitHub Panel tab - Stats
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
import { renderValueNoThenEnabled } from '../../../../controllers/management/components/management/configuration/utils/utils';
import { LogoGitHub } from '../../../common/logos';

const settings = [
  { field: 'enabled', label: 'Trạng thái dịch vụ', render: renderValueNoThenEnabled },
  { field: 'only_future_events', label: 'Thu thập các sự kiện tạo ra từ khi trạm Wazuh được khởi động'},
  { field: 'time_delay', label: 'Thời gian (tính bằng giây) mà mỗi lần quét sẽ theo dõi cho đến khi khoảng trễ được đảo ngược'},
  { field: 'curl_max_size', label: 'Kích thước tối đa cho phép cho phản hồi API GitHub'},
  { field: 'interval', label: 'Khoảng thời gian giữa các lần thực hiện Github wodle (tính bằng giây)'},
  { field: 'event_type', label: 'Loại sự kiện'},
  { field: 'api_auth', label: 'Thông tin xác thực', render: (value) => value.map(v => 
    <EuiPanel paddingSize='s' key={`module_configuration_api_auth_${v.org_name}_${v.client_id}`}>
      <EuiDescriptionList listItems={[
        {title: 'Tổ chức', description: v.org_name},
        {title: 'Token', description: v.api_token}
      ].filter(item => typeof item.description !== 'undefined')}/>
    </EuiPanel>
  ).reduce((prev, cur) => [prev, <div key={`padding-len-${prev.length}`} style={{marginTop: '8px'}} /> , cur], [])}
];

const mapWModuleConfigurationToRenderProperties = (wmodules: {[key: string]: any}[], wmoduleID: string, entity: string, name: string = '') => {
  const configuration = wmodules.find(wmodule => Object.keys(wmodule)[0] === wmoduleID);
  return configuration 
    ? {entity, name, configuration: configuration[Object.keys(configuration)[0]]}
    : null;
};

export const ModuleConfiguration = props => <PanelModuleConfiguration 
  moduleTitle='GitHub'
  moduleIconType={LogoGitHub}
  settings={settings}
  configurationAPIPartialPath='/wmodules/wmodules'
  mapResponseConfiguration={(response, type, params) => {
    return type === 'agent'
      ? mapWModuleConfigurationToRenderProperties(response.data.data.wmodules, 'github', 'Agent', params.name)
      : (type === 'cluster_node'
      ? mapWModuleConfigurationToRenderProperties(response.data.data.affected_items[0].wmodules, 'github', 'Manager', params.name)
      : mapWModuleConfigurationToRenderProperties(response.data.data.affected_items[0].wmodules, 'github', 'Manager')
    );
  }}
/>
