/*
 * Wazuh app - React component for show configuration of integrations.
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

import { WzConfigurationSettingsHeaderViewer } from '../util-components/configuration-settings-header';
import WzNoConfig from '../util-components/no-config';
import { WzSettingsViewer } from '../util-components/code-viewer';
import WzViewSelector, {
  WzViewSelectorSwitch,
} from '../util-components/view-selector';
import WzConfigurationSettingsGroup from '../util-components/configuration-settings-group';
import withWzConfig from '../util-hocs/wz-config';
import { capitalize, isString } from '../utils/utils';
import { webDocumentationLink } from '../../../../../../../common/services/web_documentation';

const helpLinks = [
  {
    text: 'Tích hợp với API bên ngoài',
    href: webDocumentationLink('user-manual/manager/manual-integration.html'),
  },
  {
    text: 'Tích hợp VirusTotal',
    href: webDocumentationLink(
      'user-manual/capabilities/malware-detection/virus-total-integration.html',
    ),
  },
  {
    text: 'Tham khảo tích hợp',
    href: webDocumentationLink(
      'user-manual/reference/ossec-conf/integration.html',
    ),
  },
];

const defaultIntegrations = [
  { title: 'Slack', description: 'Nhận cảnh báo trực tiếp qua Slack' },
  {
    title: 'VirusTotal',
    description: 'Nhận thông báo khi phát hiện phần mềm độc hại',
  },
  {
    title: 'PagerDuty',
    description: 'Nhận cảnh báo qua phần mềm xử lý sự cố này',
  },
];

const integrationsSettings = [
  { field: 'hook_url', label: 'Hook URL' },
  { field: 'level', label: 'Lọc cảnh báo ở mức này hoặc cao hơn' },
  { field: 'rule_id', label: 'Lọc cảnh báo theo rule IDs' },
  { field: 'group', label: 'Lọc cảnh báo theo nhóm rule' },
  {
    field: 'event_location',
    label: 'Lọc cảnh báo theo vị trí (trạm, IP hoặc tệp)',
  },
  { field: 'alert_format', label: 'Định dạng được sử dụng để ghi cảnh báo' },
];

class WzConfigurationIntegrations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: '',
    };
  }
  changeView(view) {
    this.setState({ view });
  }
  buildIntegration(integration) {
    return (
      defaultIntegrations.find(
        i => i.title && i.title.toLocaleLowerCase() === integration,
      ) || { title: capitalize(integration), description: 'Tích hợp tùy chỉnh' }
    );
  }
  render() {
    const { view } = this.state;
    const { currentConfig } = this.props;
    const integrations =
      currentConfig['integrator-integration'] &&
      currentConfig['integrator-integration'].integration
        ? currentConfig['integrator-integration'].integration
        : false;
    return (
      <Fragment>
        {currentConfig['integrator-integration'] &&
          isString(currentConfig['integrator-integration']) && (
            <WzNoConfig
              error={currentConfig['integrator-integration']}
              help={helpLinks}
            />
          )}
        {currentConfig['integrator-integration'] &&
          !isString(currentConfig['integrator-integration']) && (
            //   <WzConfigurationSettingsTabSelector
            //     title='Cài đặt chính'
            //     description='Cài đặt cảnh báo và logging cơ bản'
            //     currentConfig={currentConfig}
            //     helpLinks={helpLinks}>
            // </WzConfigurationSettingsTabSelector>
            <WzViewSelector view={view}>
              <WzViewSelectorSwitch default>
                {integrations &&
                  integrations.map((integrationInfo, key) => {
                    const integration = Object.assign(
                      this.buildIntegration(integrationInfo.name),
                      integrationInfo,
                    );
                    return (
                      <Fragment key={`integration-${integration.title}`}>
                        <WzConfigurationSettingsGroup
                          title={integration.title}
                          description={integration.description}
                          items={integrationsSettings}
                          config={integration}
                          viewSelected={view}
                          settings={
                            key === 0 ? () => this.changeView('') : undefined
                          }
                          json={
                            key === 0
                              ? () => this.changeView('json')
                              : undefined
                          }
                          xml={
                            key === 0 ? () => this.changeView('xml') : undefined
                          }
                          help={key === 0 ? helpLinks : undefined}
                        />
                      </Fragment>
                    );
                  })}
              </WzViewSelectorSwitch>
              <WzViewSelectorSwitch view='json'>
                <WzConfigurationSettingsHeaderViewer
                  mode='json'
                  viewSelected={view}
                  settings={() => this.changeView('')}
                  json={() => this.changeView('json')}
                  xml={() => this.changeView('xml')}
                  help={helpLinks}
                />
                <WzSettingsViewer
                  mode='json'
                  value={currentConfig}
                  minusHeight={260}
                />
              </WzViewSelectorSwitch>
              <WzViewSelectorSwitch view='xml'>
                <WzConfigurationSettingsHeaderViewer
                  mode='xml'
                  viewSelected={view}
                  settings={() => this.changeView('')}
                  json={() => this.changeView('json')}
                  xml={() => this.changeView('xml')}
                  help={helpLinks}
                />
                <WzSettingsViewer
                  mode='xml'
                  value={currentConfig}
                  minusHeight={260}
                />
              </WzViewSelectorSwitch>
            </WzViewSelector>
          )}
      </Fragment>
    );
  }
}

const sections = [{ component: 'integrator', configuration: 'integration' }];

// WzConfigurationIntegrations.propTypes = {
//   currentConfig: PropTypes.object.isRequired
// };

export default withWzConfig(sections)(WzConfigurationIntegrations);
