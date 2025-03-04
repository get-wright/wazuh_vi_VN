/*
 * Wazuh app - Definitions of configuration sections.
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import { hasAgentSupportModule } from '../../../../../react-services/wz-agents';
import { WAZUH_MODULES_ID } from '../../../../../../common/constants'

export default [
  {
    title: 'Cấu hình chính',
    description: '',
    settings: [
      {
        name: 'Global Configuration',
        description: 'Cài đặt toàn cục và từ xa',
        goto: 'global-configuration',
        when: 'manager'
      },
      {
        name: 'Cluster',
        description: 'Cấu hình nút chủ',
        goto: 'cluster',
        when: 'manager'
      },
      {
        name: 'Registration Service',
        description: 'Dịch vụ đăng ký trạm tự động',
        goto: 'registration-service',
        when: 'manager'
      },
      {
        name: 'Global Configuration',
        description: 'Cài đặt logging áp dụng cho trạm',
        goto: 'global-configuration-agent',
        when: 'agent'
      },
      {
        name: 'Communication',
        description: 'Cài đặt liên quan đến kết nối với trình quản lý',
        goto: 'client',
        when: 'agent'
      },
      {
        name: 'Anti-flooding settings',
        description: 'Tham số cho trạm bucket để tránh tràn event',
        goto: 'client-buffer',
        when: 'agent'
      },
      {
        name: 'Labels',
        description:
          'User-defined information about the agent included in alerts',
        goto: 'alerts-agent',
        when: 'agent'
      }
      // ,
      // { //TODO: Uncomment this to activate Log Settings
      //   name: 'Log settings',
      //   description: 'Cảnh báo, lưu trữ và cài đặt nội bộ',
      //   goto: 'log-settings'
      // }
    ]
  },
  {
    title: 'Cảnh báo và quản lý đầu ra',
    description: '',
    settings: [
      {
        name: 'Alerts',
        description: 'Cài đặt liên quan đến cảnh báo và định dạng của chúng',
        goto: 'alerts',
        when: 'manager'
      },
      {
        name: 'Integrations',
        description:
          'Slack, VirusTotal and PagerDuty integrations with external APIs',
        goto: 'integrations',
        when: 'manager'
      }
    ]
  },
  {
    title: 'Kiểm thử và giám sát chính sách',
    description: '',
    settings: [
      {
        name: 'Policy monitoring',
        description:
          'Configuration to ensure compliance with security policies, standards and hardening guides',
        goto: 'policy-monitoring'
      },
      {
        name: 'OpenSCAP',
        description:
          'Configuration assessment and automation of compliance monitoring using SCAP checks',
        goto: 'open-scap',
        when: agent => hasAgentSupportModule(agent, WAZUH_MODULES_ID.OPEN_SCAP)
      },
      {
        name: 'CIS-CAT',
        description:
          'Configuration assessment using CIS scanner and SCAP checks',
        goto: 'cis-cat'
      }
    ]
  },
  {
    title: 'Các mối đe dọa hệ thống và ứng phó sự cố',
    description: '',
    settings: [
      {
        name: 'Vulnerabilities',
        description:
          'Discover what applications are affected by well-known vulnerabilities',
        goto: 'vulnerabilities',
        when: 'manager'
      },
      {
        name: 'Osquery',
        description:
          'Expose an operating system as a high-performance relational database',
        goto: 'osquery'
      },
      {
        name: 'Inventory data',
        description:
          'Gather relevant information about system operating system, hardware, networking and packages',
        goto: 'inventory'
      },
      {
        name: 'Active Response',
        description: 'Ứng phó mối đe dọa bằng phản ứng tức thì',
        goto: 'active-response',
        when: 'manager'
      },
      {
        name: 'Active response',
        description: 'Ứng phó mối đe dọa bằng phản ứng tức thì',
        goto: 'active-response-agent',
        when: 'agent'
      },
      {
        name: 'Commands',
        description: 'Tùy chọn cấu hình của lệnh Wodle',
        goto: 'commands'
      },
      {
        name: 'Docker listener',
        description:
          'Monitor and collect the activity from Docker containers such as creation, running, starting, stopping or pausing events',
        goto: 'docker-listener',
        when: agent => hasAgentSupportModule(agent, WAZUH_MODULES_ID.DOCKER)
      }
    ]
  },
  {
    title: 'Phân tích dữ liệu log',
    description: '',
    settings: [
      {
        name: 'Log collection',
        description:
          'Log analysis from text files, Windows events or syslog outputs',
        goto: 'log-collection'
      },
      {
        name: 'Integrity monitoring',
        description:
          'Identify changes in content, permissions, ownership, and attributes of files',
        goto: 'integrity-monitoring'
      },
      {
        name: 'Agentless',
        description:
          'Run integrity checks on devices such as routers, firewalls and switches',
        goto: 'agentless',
        when: 'manager'
      }
    ]
  },
  {
    title: 'Giám sát bảo mật đám mây',
    description: '',
    settings: [
      {
        name: 'Amazon S3',
        description:
          'Security events related to Amazon AWS services, collected directly via AWS API',
        goto: 'aws-s3'
      },
      {
        name: 'Azure Logs',
        description: 'Tùy chọn cấu hình của Azure Logs wodle',
        goto: 'azure-logs',
        when: 'manager'
      },
      {
        name: 'Google Cloud Pub/Sub',
        description: 'Tùy chọn cấu hình của module Google Cloud Pub/Sub',
        goto: 'gcp-pubsub'
      },
      {
        name: 'GitHub',
        description:
          'Detect threats targeting GitHub organizations',
        goto: 'github'
      },
      {
        name: 'Office 365',
        description:
          'Configuration options of the Office 365 module',
        goto: 'office365',
        when: 'manager'
      }
    ]
  }
];
