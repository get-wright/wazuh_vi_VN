import React from 'react';
import { Inventory } from './index';
import '../../common/modules/module.scss';
import { connect } from 'react-redux';
import { PromptNoActiveAgent, PromptNoSelectedAgent } from '../prompts';
import { compose } from 'redux';
import { withAgentSupportModule, withGuard, withUserAuthorizationPrompt } from '../../common/hocs';
import { API_NAME_AGENT_STATUS } from '../../../../common/constants';

const mapStateToProps = (state) => ({
  currentAgentData: state.appStateReducers.currentAgentData,
});

export const MainFim = compose(
  withAgentSupportModule,
  connect(mapStateToProps),
  withGuard(
    (props) => !(props.currentAgentData && props.currentAgentData.id && props.agent),
    () => (
      <PromptNoSelectedAgent body="Bạn cần chọn một trạm để xem bản kiểm kê đánh giá cấu hình bảo mật." />
    )
  ),
  withGuard(
    (props) => {
      const agentData =
        props.currentAgentData && props.currentAgentData.id ? props.currentAgentData : props.agent;
      return agentData.status !== API_NAME_AGENT_STATUS.ACTIVE;
    },
    () => <PromptNoActiveAgent />
  ),
  withUserAuthorizationPrompt((props) => {
    const agentData =
      props.currentAgentData && props.currentAgentData.id ? props.currentAgentData : props.agent;
    return [
      [
        { action: 'agent:read', resource: `agent:id:${agentData.id}` },
        ...(agentData.group || []).map((group) => ({
          action: 'agent:read',
          resource: `agent:group:${group}`,
        })),
      ],
      [
        { action: 'syscheck:read', resource: `agent:id:${agentData.id}` },
        ...(agentData.group || []).map((group) => ({
          action: 'syscheck:read',
          resource: `agent:group:${group}`,
        })),
      ],
    ];
  })
)(function MainFim({ currentAgentData, agent, ...rest }) {
  const agentData = currentAgentData && currentAgentData.id ? currentAgentData : agent;
  return (
    <div>
      <Inventory {...rest} agent={agentData} />
    </div>
  );
});
