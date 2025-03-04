/*
 * Wazuh app - React component for Visualize.
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
import { useFilterManager, useQuery, useRefreshAngularDiscover } from '../../common/hooks';
import { Discover } from '../../common/modules/discover';
import { useAllowedAgents } from '../../common/hooks/useAllowedAgents';

export const SecurityAlerts = ({
  initialColumns = [
    { field: 'icon' },
    { field: 'timestamp' },
    { field: 'agent.id', label: 'Agent' },
    { field: 'agent.name', label: 'Tên trạm' },
    { field: 'rule.mitre.id', label: 'Kỹ thuật' },
    { field: 'rule.mitre.tactic', label: 'Chiến thuật' },
    { field: 'rule.description', label: 'Mô tả' },
    { field: 'rule.level', label: 'Mức' },
    { field: 'rule.id', label: 'ID rule' },
  ],
  initialAgentColumns = [
    { field: 'icon' },
    { field: 'timestamp' },
    { field: 'rule.mitre.id', label: 'Kỹ thuật' },
    { field: 'rule.mitre.tactic', label: 'Chiến thuật' },
    { field: 'rule.description', label: 'Mô tả' },
    { field: 'rule.level', label: 'Mức' },
    { field: 'rule.id', label: 'ID rule' },
  ],
  useAgentColumns = true,
}) => {
  const [query] = useQuery();
  const { filterManager } = useFilterManager();
  const refreshAngularDiscover = useRefreshAngularDiscover();

  const customFilterWithAllowedAgents = [];
  const { filterAllowedAgents } = useAllowedAgents();
  filterAllowedAgents && customFilterWithAllowedAgents.push(filterAllowedAgents);

  return (
    <Discover
      shareFilterManager={filterManager}
      shareFilterManagerWithUserAuthorized={customFilterWithAllowedAgents}
      query={query}
      initialColumns={initialColumns}
      initialAgentColumns={useAgentColumns ? initialAgentColumns : undefined}
      implicitFilters={[]}
      initialFilters={[]}
      updateTotalHits={(total) => {}}
      refreshAngularDiscover={refreshAngularDiscover}
    />
  );
};
