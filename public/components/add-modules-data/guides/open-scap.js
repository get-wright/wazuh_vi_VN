/*
* Wazuh app - OpenSCAP interactive extension guide
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
  id: 'oscap',
  name: 'OpenSCAP',
  wodle_name: 'open-scap',
  description: 'Tùy chọn cấu hình của OpenSCAP wodle',
  category: 'Kiểm thử và giám sát chính sách',
  documentation_link: webDocumentationLink('user-manual/reference/ossec-conf/wodle-openscap.html'),
  icon: 'securityApp',
  avaliable_for_manager: true,
  avaliable_for_agent: true,
  steps: [
    {
      title: 'Cài đặt',
      description: '',
      elements: [
        {
          name: 'disabled',
          description: `Disables the OpenSCAP wodle.`,
          type: 'switch',
          required: true
        },
        {
          name: 'timeout',
          description: 'Thời gian chờ cho mỗi đánh giá (giây)',
          type: 'input-number',
          required: true,
          placeholder: 'Time in seconds',
          values: { min: 1 },
          default_value: 1800,
          validate_error_message: 'A positive number (seconds)'
        },
        {
          name: 'interval',
          description: 'Khoảng cách giữa các lần chạy OpenSCAP',
          type: 'input',
          required: true,
          placeholder: 'Time in format <number><time unit suffix>, e.g.: 1d',
          default_value: '1d',
          validate_error_message: 'A positive number that should contain a suffix character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days).',
          validate_regex: /^[1-9]\d*[s|m|h|d]$/
        },
        {
          name: 'scan-on-start',
          description: 'Chạy đánh giá ngay khi dịch vụ khởi động.',
          type: 'switch',
          required: true,
          default_value: true
        }
      ]
    },
    {
      title: 'Nội dung',
      description: 'Định nghĩa các đánh giá.',
      elements: [
        {
          name: 'content',
          description: `Define an evaluation.`,
          removable: true,
          required: true,
          repeatable: true,
          repeatable_insert_first: true,
          repeatable_insert_first_properties: {
            removable: false
          },
          validate_error_message: 'Any directory or file name.',
          show_attributes: true,
          attributes: [
            {
              name: 'type',
              description: 'Chọn loại nội dung: xccdf hoặc oval.',
              type: 'select',
              required: true,
              values: [
                {value: 'xccdf ', text: 'xccdf '},
                {value: 'oval', text: 'oval'}
              ],
              default_value: 'xccdf'
            },
            {
              name: 'path',
              description: `Use the specified policy file (DataStream, XCCDF or OVAL).
              Default path: /var/ossec/wodles/oscap/content`,
              type: 'input',
              required: true,
              placeholder: 'Policy file',
              default_value: '/var/ossec/wodles/oscap/content',
              validate_error_message: 'Use the specified policy file'
            },
            {
              name: 'timeout',
              description: `Timeout for the evaluation (in seconds).
              Use of this attribute overwrites the generic timeout.`,
              type: 'input-number',
              placeholder: 'Time in seconds',
              values: { min: 1 },
              default_value: 1800,
              validate_error_message: 'A positive number'
            },
            {
              name: 'xccdf-id',
              description: 'XCCDF id.',
              type: 'input',
              placeholder: 'XCCDF id'
            },
            {
              name: 'oval-id',
              description: 'OVAL id.',
              type: 'input',
              placeholder: 'OVAL id'
            },
            {
              name: 'datastream-id',
              description: 'Datastream id.',
              type: 'input',
              placeholder: 'Datastream id'
            },
            {
              name: 'cpe',
              description: `CPE dictionary file.
              Default path: /var/ossec/wodles/oscap/content`,
              type: 'input',
              placeholder: '/var/ossec/wodles/oscap/content',
              default_value: '/var/ossec/wodles/oscap/content',
              validate_error_message: 'CPE dictionary file.'
            }
          ],
          show_options: true,
          options: [
            {
              name: 'profile',
              description: 'Chọn hồ sơ.',
              type: 'input',
              placeholder: 'Profile',
              repeatable: true,
              removable: true,
              required: true,
              repeatable_insert_first: true,
              repeatable_insert_first_properties: {
                removable: false
              }
            }
          ]
        }
      ]
    }
  ]
}
