/*
* Wazuh app - Docker listener interactive extension guide
* Copyright (C) 2015-2022 Wazuh, Inc.
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation; either version 2 of the License, or
* (at your option) any later version.
*
* Find more information about this on the LICENSE file.
*/
import { webDocumentationLink } from "../../../../common/services/web_documentation";

export default {
  id: 'docker',
  name: 'Docker Listener',
  wodle_name: 'docker-listener',
  description: 'Tùy chọn cấu hình của Docker wodle',
  category: 'Threat detection and response',
  documentation_link: webDocumentationLink('user-manual/reference/ossec-conf/wodle-docker.html'),
  icon: 'logoDocker',
  avaliable_for_manager: true,
  avaliable_for_agent: true,
  steps: [
    {
      title: 'Cài đặt',
      description: '',
      elements: [
        {
          name: 'disabled',
          description: 'Vô hiệu hóa Docker wodle',
          type: 'switch',
          required: true
        },
        {
          name: 'interval',
          description: 'Một số dương kèm ký tự hậu tố biểu thị đơn vị thời gian, ví dụ: s (giây), m (phút), h (giờ), d (ngày)',
          type: 'input',
          required: true,
          placeholder: 'Time in format <number><time unit suffix>',
          default_value: '1m',
          validate_error_message: 'A positive number that should contain a suffix character indicating a time unit. e.g.: 1m',
          validate_regex: /^[1-9]\d*[s|m|h|d]$/
        },
        {
          name: 'attempts',
          description: 'Số lần thử chạy wodle.',
          type: 'input-number',
          required: true,
          placeholder: 'Number of attempts',
          values: { min: 1 },
          default_value: 5,
          validate_error_message: 'Number of attempts to execute the wodle.'
        },
        {
          name: 'run_on_start',
          description: `Run command immediately when service is started.`,
          type: 'switch',
          required: true,
          default_value: true
        }
      ]
    }
  ]
}