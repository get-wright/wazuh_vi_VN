/*
* Wazuh app - CIS-CAT interactive interactive extension guide
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
  id: 'ciscat',
  name: 'CIS-CAT',
  wodle_name: 'cis-cat',
  description: 'Tùy chọn cấu hình của CIS-CAT wodle',
  category: 'Kiểm thử và giám sát chính sách',
  documentation_link: webDocumentationLink('user-manual/reference/ossec-conf/wodle-ciscat.html'),
  icon: 'securityApp',
  callout_warning: `CIS-CAT is not installed by default. It is a proprietary software that you have to obtain for using this module.`,
  avaliable_for_manager: true,
  avaliable_for_agent: true,
  steps: [
    {
      title: 'Cài đặt',
      description: '',
      elements: [
        {
          name: 'disabled',
          description: 'Vô hiệu hóa CIS-CAT wodle',
          type: 'switch',
          required: true
        },
        {
          name: 'timeout',
          description: 'Thời gian chờ cho mỗi đánh giá. Nếu thực thi vượt quá thời gian chờ đã định, sẽ dừng lại.',
          type: 'input-number',
          required: true,
          placeholder: 'Time in seconds',
          values: { min: 1 },
          default_value: 1800,
          validate_error_message: 'A positive number (seconds)'
        },
        {
          name: 'java_path',
          description: 'Xác định vị trí của Java. Nếu không được thiết lập, wodle sẽ tìm vị trí Java qua biến môi trường $PATH.',
          warning: 'For this field, it can be set a full path or a relative path. Whether you specify a relative path, it concatenates to the Wazuh installation path. ciscat_path has the same behavior.',
          type: 'input',
          placeholder: 'Java location'
        },
        {
          name: 'ciscat_path',
          description: 'Xác định vị trí của CIS-CAT.',
          type: 'input',
          required: true,
          placeholder: 'CIS-CAT location',
          validate_error_message: 'Any valid path.'
        },
        {
          name: 'scan-on-start',
          description: 'Chạy đánh giá ngay khi dịch vụ khởi động.',
          type: 'switch'
        },
        {
          name: 'interval',
          description: `Interval between CIS-CAT executions.
          The interval option is conditioned by the following described options day, wday and time. If none of these options are set, the interval can take any allowed value.`,
          type: 'input',
          default_value: '1d',
          placeholder: 'Time in format <number><time unit suffix>, e.g.: 1d',
          validate_error_message: 'A positive number that should contain a suffix character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days), w (weeks), M (months). e.g: 1d',
          validate_regex: /^[1-9]\d*[s|m|h|d|w|M]$/
        },
        {
          name: 'day',
          description: 'Ngày trong tháng để chạy quét CIS-CAT.',
          info: 'When the day option is set, the interval value must be a multiple of months. By default, the interval is set to a month.',
          type: 'select',
          values: [
            { value: '1', text: '1' },
            { value: '2', text: '2' },
            { value: '3', text: '3' },
            { value: '4', text: '4' },
            { value: '5', text: '5' },
            { value: '6', text: '6' },
            { value: '7', text: '7' },
            { value: '8', text: '8' },
            { value: '9', text: '9' },
            { value: '10', text: '10' },
            { value: '11', text: '11' },
            { value: '12', text: '12' },
            { value: '13', text: '13' },
            { value: '14', text: '14' },
            { value: '15', text: '15' },
            { value: '16', text: '16' },
            { value: '17', text: '17' },
            { value: '18', text: '18' },
            { value: '19', text: '19' },
            { value: '20', text: '20' },
            { value: '21', text: '21' },
            { value: '22', text: '22' },
            { value: '23', text: '23' },
            { value: '24', text: '24' },
            { value: '25', text: '25' },
            { value: '26', text: '26' },
            { value: '27', text: '27' },
            { value: '28', text: '28' },
            { value: '29', text: '29' },
            { value: '30', text: '30' },
            { value: '31', text: '31' }
          ],
          default_value: '1'
        },
        {
          name: 'wday',
          description: 'Ngày trong tuần để chạy quét CIS-CAT. Tùy chọn này không tương thích với lựa chọn ngày.',
          info: 'When the wday option is set, the interval value must be a multiple of weeks. By default, the interval is set to a week.',
          type: 'select',
          values: [
            { value: 'sunday', text: 'sunday' },
            { value: 'monday', text: 'monday' },
            { value: 'tuesday', text: 'tuesday' },
            { value: 'wednesday', text: 'wednesday' },
            { value: 'thursday', text: 'thursday' },
            { value: 'friday', text: 'friday' },
            { value: 'saturday', text: 'saturday' }
          ],
          default_value: 'sunday',
          placeholder: 'Day of the month [1..31]',
          validate_error_message: 'Day of the month [1..31]'
        },
        {
          name: 'time',
          description: 'Thời gian trong ngày để chạy quét. Phải được biểu diễn theo định dạng hh:mm.',
          type: 'input',
          placeholder: 'Time of day',
          validate_error_message: 'Time of day in hh:mm format',
          validate_regex: /^(((0[0-9])|(1[0-9])|(2[0-4])):[0-5][0-9])$/
        }
      ]
    },
    {
      title: 'Nội dung',
      description: 'Xác định một tiêu chí đánh giá.',
      elements: [
        {
          name: 'content',
          description: `Define an evaluation. At present, you can only run assessments for XCCDF policy files.`,
          removable: false,
          required: true,
          validate_error_message: 'Any directory or file name.',
          show_attributes: true,
          show_options: true,
          attributes: [
            {
              name: 'type',
              description: 'Chọn loại nội dung.',
              type: 'input',
              required: true,
              default_value: 'xccdf',
              field_read_only: true
            },
            {
              name: 'path',
              description: 'Sử dụng tập tin policy đã chỉ định.',
              info: 'The path attribute can be filled in with the whole path where the benchmark files are located, or with a relative path to the CIS-CAT tool location.',
              type: 'input',
              required: true,
              placeholder: 'Path where the benchmark files are located',
              validate_error_message: 'Path where the benchmark files are located'
            },
            {
              name: 'timeout',
              description: `Timeout for the evaluation (in seconds).
              Use of this attribute overwrites the generic timeout.`,
              type: 'input-number',
              values: { min: 1 },
              default_value: 1800,
              validate_error_message: 'A positive number (seconds)'
            }
          ],
          options: [
            {
              name: 'profile',
              description: 'Chọn hồ sơ.',
              type: 'input',
              required: true,
              placeholder: 'Profile',
              validate_error_message: 'A valid profile.'
            }
          ]
        }
      ]
    }
  ]
}
