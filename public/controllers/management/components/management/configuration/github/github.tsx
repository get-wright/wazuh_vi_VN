/*
 * Wazuh app - React component for show configuration of GitHub.
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import React, { useEffect, useMemo } from 'react';
import { EuiBasicTable } from '@elastic/eui';
import { compose } from 'redux';
import WzConfigurationSettingsTabSelector from '../util-components/configuration-settings-tab-selector';
import WzConfigurationSettingsGroup from '../util-components/configuration-settings-group';
import WzConfigurationSettingsListSelector from '../util-components/configuration-settings-list-selector';
import WzTabSelector, {
  WzTabSelectorTab,
} from '../util-components/tab-selector';
import WzNoConfig from '../util-components/no-config';
import { isString, renderValueYesThenEnabled } from '../utils/utils';
import { wodleBuilder, settingsListBuilder } from '../utils/builders';
import { withGuard } from '../../../../../../components/common/hocs';
import withWzConfig from '../util-hocs/wz-config';
import { webDocumentationLink } from '../../../../../../../common/services/web_documentation';

const sections = [{ component: 'wmodules', configuration: 'wmodules' }];

const mainSettings = [
  {
    field: 'enabled',
    label: 'Trạng thái dịch vụ',
    render: renderValueYesThenEnabled,
  },
  {
    field: 'only_future_events',
    label: 'Thu thập các sự kiện tạo ra từ khi trạm Wazuh được khởi động',
  },
  {
    field: 'time_delay',
    label:
      'Time in seconds that each scan will monitor until that delay backwards',
  },
  {
    field: 'curl_max_size',
    label: 'Kích thước tối đa cho phép cho phản hồi API GitHub',
  },
  {
    field: 'interval',
    label: 'Khoảng thời gian giữa các lần thực hiện Github wodle (tính bằng giây)',
  },
  { field: 'event_type', label: 'Loại sự kiện' },
];

const columns = [
  { field: 'org_name', label: 'Tổ chức' },
  { field: 'api_token', label: 'Token' },
];

const helpLinks = [
  {
    text: 'Sử dụng Wazuh để giám sát GitHub',
    href: webDocumentationLink('cloud-security/github/index.html'),
  },
  {
    text: 'Tham khảo module Github',
    href: webDocumentationLink(
      'user-manual/reference/ossec-conf/github-module.html',
    ),
  },
];

export const WzConfigurationGitHub = withWzConfig(sections)(
  ({ currentConfig, updateBadge, ...rest }) => {
    const wodleConfiguration = useMemo(
      () => wodleBuilder(currentConfig, 'github'),
      [currentConfig],
    );

    useEffect(() => {
      updateBadge(
        currentConfig &&
          wodleConfiguration &&
          wodleConfiguration['github'] &&
          wodleConfiguration['github'].enabled === 'yes',
      );
    }, [currentConfig]);

    return (
      <WzTabSelector>
        <WzTabSelectorTab label='Tổng quan'>
          <GeneralTab
            wodleConfiguration={wodleConfiguration}
            currentConfig={currentConfig}
            {...rest}
          />
        </WzTabSelectorTab>
        <WzTabSelectorTab label='Thông tin xác thực'>
          <CredentialsTab
            wodleConfiguration={wodleConfiguration}
            currentConfig={currentConfig}
            {...rest}
          />
        </WzTabSelectorTab>
      </WzTabSelector>
    );
  },
);

const tabWrapper = compose(
  withGuard(
    ({ currentConfig }) =>
      currentConfig['wmodules-wmodules'] &&
      isString(currentConfig['wmodules-wmodules']),
    ({ currentConfig }) => (
      <WzNoConfig error={currentConfig['wmodules-wmodules']} help={helpLinks} />
    ),
  ),
  withGuard(
    ({ wodleConfiguration }) => !wodleConfiguration['github'],
    props => <WzNoConfig error='not-present' help={helpLinks} />,
  ),
);

const GeneralTab = tabWrapper(({ agent, wodleConfiguration }) => (
  <WzConfigurationSettingsTabSelector
    title='Cài đặt chính'
    description='Cấu hình cho module Github'
    currentConfig={wodleConfiguration}
    minusHeight={agent.id === '000' ? 370 : 420} //TODO: Review the minusHeight for the agent case
    helpLinks={helpLinks}
  >
    <WzConfigurationSettingsGroup
      config={wodleConfiguration['github']}
      items={mainSettings}
    />
  </WzConfigurationSettingsTabSelector>
));

const CredentialsTab = tabWrapper(({ agent, wodleConfiguration }) => {
  const credentials = useMemo(
    () =>
      settingsListBuilder(wodleConfiguration['github'].api_auth, 'org_name'),
    [wodleConfiguration],
  );
  return (
    <WzConfigurationSettingsTabSelector
      title='Danh sách các tổ chức để kiểm định'
      currentConfig={wodleConfiguration}
      minusHeight={agent.id === '000' ? 370 : 420} //TODO: Review the minusHeight for the agent case
      helpLinks={helpLinks}
    >
      <WzConfigurationSettingsListSelector
        items={credentials}
        settings={columns}
      />
    </WzConfigurationSettingsTabSelector>
  );
});
