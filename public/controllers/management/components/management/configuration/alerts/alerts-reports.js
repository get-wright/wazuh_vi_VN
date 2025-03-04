/*
 * Wazuh app - React component for show configuration of alerts - Report tab.
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

import WzConfigurationSettingsTabSelector from '../util-components/configuration-settings-tab-selector';
import WzConfigurationListSelector from '../util-components/configuration-settings-list-selector';
import WzNoConfig from '../util-components/no-config';
import { isString } from '../utils/utils';
import { settingsListBuilder } from '../utils/builders';

import { connect } from 'react-redux';
import { webDocumentationLink } from '../../../../../../../common/services/web_documentation';

const helpLinks = [
  {
    text: 'Tạo báo cáo tự động',
    href: webDocumentationLink('user-manual/manager/automatic-reports.html')
  },
  {
    text: 'Tham khảo báo cáo',
    href: webDocumentationLink('user-manual/reference/ossec-conf/reports.html')
  }
];

const mainSettings = [
  { field: 'title', label: 'Tên báo cáo' },
  { field: 'mail_to', label: 'Gửi báo cáo đến địa chỉ email này' },
  { field: 'showlogs', label: 'Bao gồm logs khi tạo báo cáo' },
  { field: 'group', label: 'Lọc theo nhóm này' },
  { field: 'category', label: 'Lọc theo thể loại này' },
  { field: 'rule', label: 'Lọc theo rule ID này' },
  { field: 'level', label: 'Lọc theo mức cảnh báo này trở lên' },
  { field: 'location', label: 'Lọc theo vị trí log này' },
  { field: 'srcip', label: 'Lọc theo địa chỉ IP nguồn này' },
  { field: 'user', label: 'Lọc theo tên người dùng này' }
];

class WzConfigurationAlertsReports extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentConfig, wazuhNotReadyYet } = this.props;
    const items =
      currentConfig &&
      currentConfig['monitor-reports'] &&
      currentConfig['monitor-reports'].reports
        ? settingsListBuilder(currentConfig['monitor-reports'].reports, 'title')
        : {};
    return (
      <Fragment>
        {currentConfig['monitor-reports'] &&
          isString(currentConfig['monitor-reports']) && (
            <WzNoConfig
              error={currentConfig['monitor-reports']}
              help={helpLinks}
            />
          )}
        {currentConfig['monitor-reports'] &&
          !isString(currentConfig['monitor-reports']) &&
          (!currentConfig['monitor-reports'].reports ||
            !currentConfig['monitor-reports'].reports.length) && (
            <WzNoConfig error="not-present" help={helpLinks} />
          )}
        {wazuhNotReadyYet &&
          (!currentConfig || !currentConfig['monitor-reports']) && (
            <WzNoConfig error="Wazuh not ready yet" help={helpLinks} />
          )}
        {currentConfig['monitor-reports'] &&
          !isString(currentConfig['monitor-reports']) &&
          currentConfig['monitor-reports'].reports &&
          currentConfig['monitor-reports'].reports.length && (
            <WzConfigurationSettingsTabSelector
              title="Cài đặt chính"
              description="Báo cáo hàng ngày về cảnh báo"
              minusHeight={320}
              currentConfig={currentConfig}
              helpLinks={helpLinks}
            >
              <WzConfigurationListSelector
                items={items}
                settings={mainSettings}
              />
            </WzConfigurationSettingsTabSelector>
          )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  wazuhNotReadyYet: state.appStateReducers.wazuhNotReadyYet
});

WzConfigurationAlertsReports.propTypes = {
  // currentConfig: PropTypes.object.isRequired,
  wazuhNotReadyYet: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

export default connect(mapStateToProps)(WzConfigurationAlertsReports);
