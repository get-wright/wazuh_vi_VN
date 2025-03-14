/*
 * Wazuh app - Office 365 Drilldown Rules field Config.
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
import { VisCard } from '../../../common/modules/panel';
import { EuiFlexItem, EuiPanel } from '@elastic/eui';
import { SecurityAlerts } from '../../../visualize/components';

export const drilldownRulesConfig = {
  rows: [
    {
      height: 400,
      columns: [
        {
          width: 30,
          component: (props) => (
            <VisCard id="Wazuh-App-Overview-Office-Top-Operations" tab="office" {...props} />
          ),
        },
        {
          width: 30,
          component: (props) => (
            <VisCard id="Wazuh-App-Overview-Office-Top-Users" tab="office" {...props} />
          ),
        },
        {
          width: 40,
          component: (props) => (
            <VisCard id="Wazuh-App-Overview-Office-Country-Tag-Cloud" tab="office" {...props} />
          ),
        },
      ],
    },
    {
      height: 300,
      columns: [
        {
          width: 100,
          component: (props) => (
            <VisCard
              id="Wazuh-App-Overview-Office-Alerts-Evolution-By-UserID"
              tab="office"
              {...props}
            />
          ),
        },
      ],
    },
    {
      columns: [
        {
          width: 100,
          component: () => (
            <EuiFlexItem>
              <EuiPanel paddingSize={'s'}>
                <SecurityAlerts
                  initialColumns={[
                    { field: 'icon' },
                    { field: 'timestamp' },
                    { field: 'rule.description', label: 'Mô tả' },
                    { field: 'data.office365.UserId', label: 'ID người dùng' },
                    { field: 'data.office365.ClientIP', label: 'Địa chỉ IP của máy khách' },
                    { field: 'data.office365.Operation', label: 'Hoạt động' },
                    { field: 'rule.level', label: 'Mức' },
                    { field: 'rule.id', label: 'ID rule' },
                  ]}
                  useAgentColumns={false}
                />
              </EuiPanel>
            </EuiFlexItem>
          ),
        },
      ],
    },
  ],
};
