/*
 * Wazuh app - React component GeneralTab
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
import { renderValueYesThenEnabled } from '../../../utils/utils';
import WzConfigurationSettingsTabSelector from '../../../util-components/configuration-settings-tab-selector';
import WzConfigurationSettingsGroup from '../../../util-components/configuration-settings-group';
import { HELP_LINKS, OFFICE_365 } from '../../constants';

export type GeneralTableProps = {
  agent: { id: string };
  wodleConfiguration: any;
};

const mainSettings = [
  { field: 'enabled', label: 'Trạng thái dịch vụ', render: renderValueYesThenEnabled },
  {
    field: 'only_future_events',
    label: 'Thu thập các sự kiện tạo ra từ khi trình quản lý Wazuh được khởi tạo',
  },
  {
    field: 'interval',
    label:
      'Interval between Office 365 wodle executions in seconds',
  },
  { field: 'curl_max_size', label: 'Kích thước tối đa cho phép cho phản hồi API Office 365' },
];

export const GeneralTab = ({ agent, wodleConfiguration }: GeneralTableProps) => {

  return (
    <WzConfigurationSettingsTabSelector
      title="Cài đặt chính"
      description="Cấu hình cho module Office 365"
      currentConfig={wodleConfiguration}
      minusHeight={agent.id === '000' ? 370 : 320}
      helpLinks={HELP_LINKS}
    >
      <WzConfigurationSettingsGroup config={wodleConfiguration[OFFICE_365]} items={mainSettings} />
    </WzConfigurationSettingsTabSelector>
  );
};
