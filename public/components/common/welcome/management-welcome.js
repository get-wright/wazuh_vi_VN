/*
 * Wazuh app - React component for building the management welcome screen.
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
import React, { Component } from 'react';
import {
  EuiCard,
  EuiIcon,
  EuiPanel,
  EuiFlexItem,
  EuiFlexGroup,
  EuiSpacer,
  EuiPage
} from '@elastic/eui';
import { updateGlobalBreadcrumb } from '../../../redux/actions/globalBreadcrumbActions';
import store from '../../../redux/store';

import { updateManagementSection } from '../../../redux/actions/managementActions';
import WzReduxProvider from '../../../redux/wz-redux-provider';
import { connect } from 'react-redux';

class ManagementWelcome extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  setGlobalBreadcrumb() {
    const breadcrumb = [{ text: '' }, { text: 'Trình quản lý' }];
    store.dispatch(updateGlobalBreadcrumb(breadcrumb));
  }

  async componentDidMount() {
    this.setGlobalBreadcrumb();
  }

  switchSection(section) {
    this.props.switchTab(section, true);
    this.props.updateManagementSection(section);
  }

  render() {
    return (
      <WzReduxProvider>
        <EuiPage className="wz-welcome-page">
          <EuiFlexGroup>
            <EuiFlexItem>
              <EuiCard title description betaBadgeLabel="Administration">
                <EuiSpacer size="m" />
                <EuiFlexGroup>
                  <EuiFlexItem>
                    <EuiCard
                      layout="horizontal"
                      className="homSynopsis__card"
                      icon={
                        <EuiIcon
                          size="xl"
                          type="indexRollupApp"
                          color="primary"
                        />
                      }
                      title="Rules"
                      onClick={() => this.switchSection('rules')}
                      description="Quản lý rule của cụm Wazuh của bạn."
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                    <EuiCard
                      layout="horizontal"
                      className="homSynopsis__card"
                      icon={
                        <EuiIcon
                          size="xl"
                          type="indexRollupApp"
                          color="primary"
                        />
                      }
                      title="Decoders"
                      onClick={() => this.switchSection('decoders')}
                      description="Quản lý bộ giải mã của cụm Wazuh."
                    />
                  </EuiFlexItem>
                </EuiFlexGroup>
                <EuiFlexGroup>
                  <EuiFlexItem>
                    <EuiCard
                      layout="horizontal"
                      className="homSynopsis__card"
                      icon={
                        <EuiIcon
                          size="xl"
                          type="indexRollupApp"
                          color="primary"
                        />
                      }
                      title="Danh sách CDB"
                      onClick={() => this.switchSection('lists')}
                      description="Quản lý danh sách CDB của cụm Wazuh."
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                    <EuiCard
                      layout="horizontal"
                      className="homSynopsis__card"
                      icon={
                        <EuiIcon
                          size="xl"
                          type="usersRolesApp"
                          color="primary"
                        />
                      }
                      title="Các nhóm"
                      onClick={() => this.switchSection('groups')}
                      description="Quản lý nhóm trạm của bạn."
                    />
                  </EuiFlexItem>
                </EuiFlexGroup>
                <EuiFlexGroup>
                  <EuiFlexItem>
                    <EuiCard
                      layout="horizontal"
                      className="homSynopsis__card"
                      icon={
                        <EuiIcon size="xl" type="devToolsApp" color="primary" />
                      }
                      title="Cấu hình"
                      onClick={() => this.switchSection('configuration')}
                      description="Quản lý cấu hình cụm Wazuh của bạn."
                    />
                  </EuiFlexItem>
                  <EuiFlexItem />
                </EuiFlexGroup>
              </EuiCard>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiCard title description betaBadgeLabel="Status and reports">
                <EuiSpacer size="m" />
                <EuiFlexGroup>
                  <EuiFlexItem>
                    <EuiCard
                      layout="horizontal"
                      className="homSynopsis__card"
                      icon={
                        <EuiIcon size="xl" type="uptimeApp" color="primary" />
                      }
                      title="Trạng thái"
                      onClick={() => this.switchSection('status')}
                      description="Quản lý trạng thái cụm Wazuh của bạn."
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                    <EuiCard
                      layout="horizontal"
                      className="homSynopsis__card"
                      icon={
                        <EuiIcon
                          size="xl"
                          type="indexPatternApp"
                          color="primary"
                        />
                      }
                      title="Cụm"
                      onClick={() => this.switchSection('monitoring')}
                      description="Trực quan hóa cụm Wazuh của bạn."
                    />
                  </EuiFlexItem>
                </EuiFlexGroup>
                <EuiFlexGroup>
                  <EuiFlexItem>
                    <EuiCard
                      layout="horizontal"
                      className="homSynopsis__card"
                      icon={
                        <EuiIcon size="xl" type="filebeatApp" color="primary"/>
                      }
                      title="logs"
                      onClick={() => this.switchSection('logs')}
                      description="logs từ cụm Wazuh của bạn"
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                    <EuiCard
                      layout="horizontal"
                      className="homSynopsis__card"
                      icon={
                        <EuiIcon
                          size="xl"
                          type="reportingApp"
                          color="primary"
                        />
                      }
                      title="Báo cáo"
                      onClick={() => this.switchSection('reporting')}
                      description="Kiểm tra các báo cáo Wazuh đã lưu của bạn."
                    />
                  </EuiFlexItem>
                </EuiFlexGroup>
                <EuiFlexGroup>
                  <EuiFlexItem>
                    <EuiCard
                      layout="horizontal"
                      className="homSynopsis__card"
                      icon={
                        <EuiIcon size="xl" type="visualizeApp" color="primary" />
                      }
                      title="Thống kê"
                      onClick={() => this.switchSection('statistics')}
                      description="Thông tin về môi trường Wazuh"
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiCard>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPage>
      </WzReduxProvider>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    updateManagementSection: section =>
      dispatch(updateManagementSection(section))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ManagementWelcome);
