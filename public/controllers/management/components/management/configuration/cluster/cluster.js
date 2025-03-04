/*
 * Wazuh app - React component for show configuration of cluster.
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

import withWzConfig from '../util-hocs/wz-config';
import { isString } from '../utils/utils';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { webDocumentationLink } from '../../../../../../../common/services/web_documentation';

const mainSettings = [
  { field: 'disabled', label: 'Trạng thái cụm' },
  { field: 'name', label: 'Tên cụm' },
  { field: 'node_name', label: 'Tên nút' },
  { field: 'node_type', label: 'Loại nút' },
  { field: 'nodes', label: 'Địa chỉ IP của nút chủ' },
  { field: 'port', label: 'Cổng để nghe liên lạc cụm' },
  {
    field: 'bind_addr',
    label: 'Địa chỉ IP để lắng nghe liên lạc cụm'
  },
  { field: 'hidden', label: 'Ẩn thông tin cụm trong cảnh báo' }
];

const helpLinks = [
  {
    text: 'Cấu hình cụm Wazuh',
    href: webDocumentationLink('user-manual/configuring-cluster/index.html')
  },
  {
    text: 'Tham khảo cụm Wazuh',
    href: webDocumentationLink('user-manual/reference/ossec-conf/cluster.html')
  }
];

class WzCluster extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentConfig, wazuhNotReadyYet } = this.props;
    let mainSettingsConfig = {
      ...currentConfig['com-cluster'],
      disabled:
        currentConfig['com-cluster'].disabled === 'yes' ? 'disabled' : 'enabled'
    };
    return (
      <Fragment>
        {currentConfig['com-cluster'] &&
          isString(currentConfig['com-cluster']) && (
            <WzNoConfig error={currentConfig['com-cluster']} help={helpLinks} />
          )}
        {wazuhNotReadyYet &&
          (!currentConfig || !currentConfig['com-cluster']) && (
            <WzNoConfig error="Wazuh not ready yet" help={helpLinks} />
          )}
        {currentConfig['com-cluster'] &&
          !isString(currentConfig['com-cluster']) && (
            <WzConfigurationSettingsTabSelector
              title="Cài đặt chính"
              currentConfig={currentConfig}
              minusHeight={260}
              helpLinks={helpLinks}
            >
              <WzConfigurationSettingsGroup
                config={mainSettingsConfig}
                items={mainSettings}
              />
            </WzConfigurationSettingsTabSelector>
          )}
      </Fragment>
    );
  }
}

const sections = [{ component: 'com', configuration: 'cluster' }];

const mapStateToProps = state => ({
  wazuhNotReadyYet: state.appStateReducers.wazuhNotReadyYet
});

WzCluster.propTypes = {
  // currentConfig: PropTypes.object.isRequired
  wazuhNotReadyYet: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

export default compose(
  withWzConfig(sections),
  connect(mapStateToProps)
)(WzCluster);
