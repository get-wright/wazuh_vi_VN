/*
* Wazuh app - Vulnerabilites extension guide
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
  id: 'vuls',
  xml_tag: 'vulnerabilities-detector',
  name: 'Vulnerabilities',
  description: 'Tùy chọn cấu hình cho các lỗ hổng',
  category: 'Phát hiện và ứng phó mối đe dọa',
  documentation_link: webDocumentationLink('user-manual/reference/ossec-conf/vuln-detector.html'),
  icon: 'securityApp',
  avaliable_for_manager: true,
  steps: [
    {
      title: 'Cài đặt',
      description: '',
      elements: [
        {
          name: 'enabled',
          description: 'Bật module',
          type: 'switch',
          required: true
        },
        {
          name: 'interval',
          description: 'Khoảng cách giữa các lần quét lỗ hổng.',
          type: 'input',
          required: true,
          default_value: '5m',
          placeholder: 'Time in format <number><time unit suffix>',
          validate_error_message: 'A positive number that should contain a suffix character indicating a time unit: s (seconds), m (minutes), h (hours) or d (days).',
          validate_regex: /^[1-9]\d*[s|m|h|d]$/
        },
        {
          name: 'run_on_start',
          description: 'Chạy cập nhật và quét lỗ hổng ngay khi dịch vụ khởi động.',
          type: 'switch',
          required: true,
          default_value: true
        },
        {
          name: 'ignore_time',
          description: 'Thời gian mà các lỗ hổng đã được cảnh báo sẽ bị bỏ qua',
          type: 'input',
          default_value: '6h',
          placeholder: 'Time in format <number><time unit suffix>',
          validate_error_message: 'A positive number that should contain a suffix character indicating a time unit: s (seconds), m (minutes), h (hours) or d (days).',
          validate_regex: /^[1-9]\d*[s|m|h|d]$/
        }
      ]
    },
    {
      title: 'Nhà cung cấp',
      description: 'Xác định nguồn cung cấp cập nhật lỗ hổng.',
      elements: [
        {
          name: 'provider',
          description: 'Khối cấu hình để chỉ định cập nhật lỗ hổng',
          repeatable: true,
          required: true,
          removable: true,
          repeatable_insert_first: true,
          repeatable_insert_first_properties: {
            removable: false
          },
          attributes: [
            {
              name: 'name',
              description: 'Xác định nguồn cung cấp thông tin lỗ hổng',
              type: 'select',
              required: true,
              values: [
                {value: 'canonical', text: 'canonical'},
                {value: 'debian', text: 'debian'},
                {value: 'redhat', text: 'redhat'},
                {value: 'nvd', text: 'nvd'}
              ],
              default_value: 'canonical'
            },
            
          ],
          show_options: true,
          options: [
            {
              name: 'enabled',
              description: 'Cho phép cập nhật từ nhà cung cấp lỗ hổng',
              type: 'switch',
              required: true
            },
            {
              name: 'os',
              description: 'Nguồn cấp dữ liệu để cập nhật.',
              type: 'select',
              info: `For canonical: ()`,

              repeatable: true,
              removable: true,
              required: true,
              values: [
                {value: 'precise', text: 'precise'},
                {value: 'trusty', text: 'trusty'},
                {value: 'xenial', text: 'xenial'},
                {value: 'bionic', text: 'bionic'},
                {value: 'wheezy', text: 'wheez'},
                {value: 'jessie', text: 'jessie'},
                {value: 'stretch', text: 'stretch'},
                {value: 'buster', text: 'buster'}
              ],
              default_value: 'precise',
              attributes: [
                {
                  name: 'update_interval',
                  description: 'Tần suất cập nhật cơ sở dữ liệu lỗ hổng. Ưu tiên hơn tùy chọn update_interval của khối nhà cung cấp.',
                  type: 'input',
                  validate_error_message: 'A positive number that should contain a suffix character indicating a time unit: s (seconds), m (minutes), h (hours) or d (days).',
                  validate_regex: /^[1-9]\d*[s|m|h|d]$/
                },
                {
                  name: 'url',
                  description: 'Xác định liên kết đến tệp OVAL thay thế.',
                  type: 'input',
                  placeholder: 'Link to download the OVAL file obtained from Canonical or Debian.'
                },
                {
                  name: 'path',
                  description: 'Xác định đường dẫn đến tệp OVAL thay thế.',
                  type: 'input',
                  placeholder: ''
                },
                {
                  name: 'port',
                  description: 'Xác định cổng kết nối khi sử dụng thuộc tính url.',
                  type: 'input-number',
                  values: { min: 0 },
                  default_value: '',
                  validate_error_message: 'A valid port.'
                },
                {
                  name: 'allow',
                  description: 'Xác định khả năng tương thích với các hệ thống không được hỗ trợ',
                  info: `You can find a guide on how to set it up ${webDocumentationLink('user-manual/capabilities/vulnerability-detection/allow_os.html')}`,
                  type: 'input',
                  validate_error_message: 'A valid operating system not supported by default.'
                }
              ]
            },
            {
              name: 'update_interval',
              description: 'Tần suất cập nhật lỗ hổng từ nhà cung cấp. Có thể bị ghi đè bởi thuộc tính cùng tên của <os>.',
              type: 'input',
              default_value: '1h',
              placeholder: 'A positive number that should contain a suffix character indicating a time unit: s (seconds), m (minutes), h (hours) or d (days).',
              validate_error_message: 'A positive number that should contain a suffix character indicating a time unit: s (seconds), m (minutes), h (hours) or d (days).',
              validate_regex: /^[1-9]\d*[s|m|h|d]$/
            },
            {
              name: 'update_from_year',
              description: 'Năm mà nhà cung cấp sẽ được cập nhật.',
              default_value: '2010',
              type: 'input',
              placeholder: 'Year from which the provider will be updated.',
              validate_regex: /^([1-9]\d{3})$/,
              validate_error_message: 'Year from which the provider will be updated.',
            },
            {
              name: 'allow',
              description: 'Xác định khả năng tương thích với các hệ thống không được hỗ trợ',
              attributes: [
                {
                  name: 'replaced_os',
                  description: 'Xác định phiên bản Red Hat sẽ thay thế hệ thống không được hỗ trợ.',
                  type: 'input',
                  placeholder: 'A numeric value that in substitution with the tag forms a valid link.',
                  validate_error_message: 'A numeric value that in substitution with the tag forms a valid link.'
                }
              ]
            },
            {
              name: 'url',
              description: 'Xác định liên kết đến tệp nguồn cấp thay thế.',
              type: 'input',
              placeholder:'Defines the link to an alternative feed files.',
              attributes: [
                {
                  name: 'start',
                  description: 'Xác định giá trị đầu tiên mà tag sẽ được thay thế.',
                  type: 'input-number',
                  values: { min: 0 },
                  default_value: '',
                  placeholder: 'A numeric value that in substitution with the tag forms a valid link.',
                  validate_error_message: 'A numeric value that in substitution with the tag forms a valid link.',
                },
                {
                  name: 'end',
                  description: 'Xác định giá trị cuối cùng mà tag sẽ được thay thế.',
                  type: 'input-number',
                  values: { min: 0 },
                  default_value: '',
                  placeholder: 'A numeric value that in substitution with the tag forms a valid link.',
                  validate_error_message: 'A numeric value that in substitution with the tag forms a valid link.',
                },
                {
                  name: 'port',
                  description: 'Xác định cổng kết nối.',
                  type: 'input-number',
                  values: { min: 0 },
                  placeholder: 'A valid port.',
                  validate_error_message: 'A valid port.',
                }
              ]
            },
            {
              name: 'path',
              description: 'Xác định đường dẫn đến tệp nguồn cấp thay thế.',
              type: 'input',
              placeholder: 'A valid path'
            }
          ]
        }
      ]
    }
  ]
}
