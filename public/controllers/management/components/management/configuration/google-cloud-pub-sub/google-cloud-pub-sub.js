import React, { Component, Fragment } from 'react';

import WzConfigurationSettingsTabSelector from '../util-components/configuration-settings-tab-selector';
import WzConfigurationSettingsGroup from '../util-components/configuration-settings-group';
import WzNoConfig from '../util-components/no-config';

import withWzConfig from '../util-hocs/wz-config';

import { wodleBuilder } from '../utils/builders';

import { renderValueYesThenEnabled, isString } from '../utils/utils';
import { webDocumentationLink } from '../../../../../../../common/services/web_documentation';

const helpLinks = [
  {
    text: 'Sử dụng Wazuh để giám sát dịch vụ GCP',
    href: webDocumentationLink('cloud-security/gcp/index.html'),
  },
  {
    text: 'Tham khảo module Google Cloud Pub/Sub',
    href: webDocumentationLink(
      'user-manual/reference/ossec-conf/gcp-pubsub.html',
    ),
  },
];

const mainSettings = [
  {
    field: 'enabled',
    label: 'Trạng thái tích hợp Google Cloud Pub/Sub',
    render: renderValueYesThenEnabled,
  },
  { field: 'project_id', label: 'ID dự án' },
  { field: 'subscription_name', label: 'Đăng ký để đọc từ' },
  {
    field: 'credentials_file',
    label: 'Đường dẫn tệp thông tin xác thực',
  },
  { field: 'logging', label: 'Mức ghi log' },
  { field: 'max_messages', label: 'Số tin nhắn tối đa được lấy mỗi lần lặp' },
  { field: 'interval', label: 'Khoảng thời gian giữa các lần thực thi module (tính bằng giây)' },
  { field: 'pull_on_start', label: 'Kéo khi bắt đầu' },
  { field: 'day', label: 'Ngày trong tháng để nạp logs' },
  { field: 'wday', label: 'Ngày trong tuần để nạp logs' },
  { field: 'time', label: 'Thời gian trong ngày để nạp logs' },
];

class WzConfigurationGoogleCloudPubSub extends Component {
  constructor(props) {
    super(props);
    this.wodleConfig = wodleBuilder(this.props.currentConfig, 'gcp-pubsub');
  }
  componentDidMount() {
    this.props.updateBadge(this.badgeEnabled());
  }
  badgeEnabled() {
    return (
      this.wodleConfig &&
      this.wodleConfig['gcp-pubsub'] &&
      this.wodleConfig['gcp-pubsub'].enabled === 'yes'
    );
  }
  render() {
    const { currentConfig } = this.props;
    return (
      <Fragment>
        {currentConfig['wmodules-wmodules'] &&
          isString(currentConfig['wmodules-wmodules']) && (
            <WzNoConfig
              error={currentConfig['wmodules-wmodules']}
              help={helpLinks}
            />
          )}
        {currentConfig &&
          !this.wodleConfig['gcp-pubsub'] &&
          !isString(currentConfig['wmodules-wmodules']) && (
            <WzNoConfig error='not-present' help={helpLinks} />
          )}
        {currentConfig && this.wodleConfig['gcp-pubsub'] && (
          <WzConfigurationSettingsTabSelector
            title='Cài đặt chính'
            description='Cấu hình cho module Google Cloud Pub/Sub'
            currentConfig={this.wodleConfig}
            minusHeight={320}
            helpLinks={helpLinks}
          >
            <WzConfigurationSettingsGroup
              config={this.wodleConfig['gcp-pubsub']}
              items={mainSettings}
            />
          </WzConfigurationSettingsTabSelector>
        )}
      </Fragment>
    );
  }
}

const sections = [{ component: 'wmodules', configuration: 'wmodules' }];

export default withWzConfig(sections)(WzConfigurationGoogleCloudPubSub);
