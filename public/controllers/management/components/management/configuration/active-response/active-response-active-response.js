/*
 * Wazuh app - React component for show configuration of active response - active response tab.
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
import { compose } from 'redux';
import withWzConfig from '../util-hocs/wz-config';
import { webDocumentationLink } from '../../../../../../../common/services/web_documentation';

const mainSettings = [
  {
    field: 'disabled',
    label: 'Trạng thái của ứng phó chủ động này',
    render: renderValueNoThenEnabled
  },
  { field: 'command', label: 'Lệnh để thực thi' },
  { field: 'location', label: 'Thực thi lệnh tại vị trí này' },
  { field: 'agent_id', label: 'ID của trạm để thực thi lệnh' },
  { field: 'level', label: 'Khớp với mức độ nghiêm trọng này trở lên' },
  { field: 'rules_group', label: 'Khớp với một trong các nhóm này' },
  { field: 'rules_id', label: 'Khớp với một trong các rule IDs này' },
  { field: 'timeout', label: 'Thời gian chờ (tính bằng giây) trước khi quay lại' }
];

const helpLinks = [
  {
    text: 'Tài liệu ứng phó chủ động',
    href: webDocumentationLink('user-manual/capabilities/active-response/index.html')
  },
  {
    text: 'Tham khảo ứng phó chủ động',
    href: webDocumentationLink('user-manual/reference/ossec-conf/active-response.html')
  }
];

class WzConfigurationActiveResponseActiveResponse extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentConfig, wazuhNotReadyYet } = this.props;
    const items =
      !isString(currentConfig['analysis-active_response']) &&
      currentConfig['analysis-active_response']['active-response'] &&
      currentConfig['analysis-active_response']['active-response'].length
        ? settingsListBuilder(
            currentConfig['analysis-active_response']['active-response'],
            'command'
          )
        : [];
    return (
      <Fragment>
        {currentConfig['analysis-active_response'] &&
          isString(currentConfig['analysis-active_response']) && (
            <WzNoConfig
              error={currentConfig['analysis-active_response']}
              help={helpLinks}
            />
          )}
        {currentConfig['analysis-active_response'] &&
          !isString(currentConfig['analysis-active_response']) &&
          currentConfig['analysis-active_response']['active-response'] &&
          !currentConfig['analysis-active_response']['active-response']
            .length && <WzNoConfig error="not-present" help={helpLinks} />}
        {wazuhNotReadyYet &&
          (!currentConfig || !currentConfig['analysis-active_response']) && (
            <WzNoConfig error="Wazuh not ready yet" help={helpLinks} />
          )}
        {currentConfig['analysis-active_response'] &&
        !isString(currentConfig['analysis-active_response']) &&
        currentConfig['analysis-active_response']['active-response'].length ? (
          <WzConfigurationSettingsTabSelector
            title="Định nghĩa ứng phó chủ động"
            description="Tìm ở đây tất cả các ứng phó chủ động đã được định nghĩa"
            currentConfig={currentConfig['analysis-active_response']}
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

WzConfigurationActiveResponseActiveResponse.propTypes = {
  // currentConfig: PropTypes.object.isRequired,
  wazuhNotReadyYet: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

const mapStateToProps = state => ({
  wazuhNotReadyYet: state.appStateReducers.wazuhNotReadyYet
});

export default connect(mapStateToProps)(
  WzConfigurationActiveResponseActiveResponse
);

const sectionsAgent = [{ component: 'com', configuration: 'active-response' }];

export const WzConfigurationActiveResponseActiveResponseAgent = compose(
  connect(mapStateToProps),
  withWzConfig(sectionsAgent)
)(WzConfigurationActiveResponseActiveResponse);

WzConfigurationActiveResponseActiveResponseAgent.propTypes = {
  // currentConfig: PropTypes.object.isRequired,
  wazuhNotReadyYet: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};
