/*
 * Wazuh app - React component for show configuration of AWS S3 - buckets tab.
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

import WzNoConfig from "../util-components/no-config";
import WzConfigurationSettingsTabSelector from '../util-components/configuration-settings-tab-selector';
import WzConfigurationListSelector from '../util-components/configuration-settings-list-selector';
import { settingsListBuilder } from '../utils/builders';
import helpLinks from './help-links';

import { connect } from 'react-redux';

const mainSettings = [
  { field: 'name', label: 'Tên bucket' },
  { field: 'type', label: 'Loại bucket' },
  { field: 'aws_account_id', label: 'ID tài khoản AWS' },
  { field: 'aws_account_alias', label: 'Bí danh tài khoản AWS' },
  { field: 'aws_profile', label: 'Tên hồ sơ có quyền đọc' },
  { field: 'iam_role_arn', label: 'Vai trò IAM ARN để đọc logs từ bucket' },
  { field: 'path', label: 'Đường dẫn bucket' },
  { field: 'only_logs_after', label: 'Phân tích logs chỉ từ ngày này trở đi' },
  { field: 'remove_from_bucket', label: 'Xóa logs của bucket sau khi được đọc' },
  { field: 'regions', label: 'Giới hạn phân tích log chỉ trong các vùng này' }
];

class WzConfigurationAmazonS3Buckets extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentConfig, wodleConfig, wazuhNotReadyYet } = this.props;
    const items =
      wodleConfig && wodleConfig['aws-s3'] && wodleConfig['aws-s3'].buckets
        ? settingsListBuilder(wodleConfig['aws-s3'].buckets, 'name')
        : {};
    return (
      <Fragment>
        {currentConfig &&
        (!wodleConfig['aws-s3'] || (wodleConfig['aws-s3'] && !wodleConfig['aws-s3'].buckets)) && (
            <WzNoConfig error="not-present" help={helpLinks} />
          )}
        {wazuhNotReadyYet && (!currentConfig || !wodleConfig['aws-s3']) && (
          <WzNoConfig error="Wazuh not ready yet" help={helpLinks} />
        )}
        {currentConfig &&
          wodleConfig['aws-s3'] &&
          wodleConfig['aws-s3'].buckets && (
            <WzConfigurationSettingsTabSelector
              title="Cài đặt chính"
              description="Amazon buckets lưu trữ logs"
              currentConfig={wodleConfig}
              minusHeight={320}
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

WzConfigurationAmazonS3Buckets.propTypes = {
  // currentConfig: PropTypes.object.isRequired,
  wazuhNotReadyYet: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

export default connect(mapStateToProps)(WzConfigurationAmazonS3Buckets);
