/*
* Wazuh app - Amazon Web Services interactive extension guide
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
  id: 'aws',
  name: 'Amazon AWS services',
  wodle_name: 'aws-s3',
  description: 'Tùy chọn cấu hình của AWS-S3 wodle',
  category: 'Quản lý thông tin an ninh',
  documentation_link: webDocumentationLink('user-manual/reference/ossec-conf/wodle-s3.html'),
  icon: 'logoAWSMono',
  avaliable_for_manager: true,
  avaliable_for_agent: true,
  steps: [
    {
      title: 'Cài đặt bắt buộc',
      description: '',
      elements: [
        {
          name: 'disabled',
          description: `Disables the AWS-S3 wodle.`,
          type: 'switch',
          required: true
        },
        {
          name: 'interval',
          description: 'Tần số đọc từ S3 bucket',
          type: 'input',
          required: true,
          placeholder: 'Positive number with suffix character indicating a time unit',
          default_value: '10m',
          validate_error_message: 'A positive number that should contain a suffix character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days). e.g. 10m',
          validate_regex: /^[1-9]\d*[s|m|h|d]$/
        },
        {
          name: 'run_on_start',
          description: 'Chạy đánh giá ngay khi dịch vụ khởi động.',
          type: 'switch',
          required: true,
          default_value: true
        },
        
      ]
    },
    {
      title: 'Cài đặt tùy chọn',
      description: '',
      elements: [
        {
          name: 'remove_from_bucket',
          description: 'Xác định nếu bạn muốn xóa logs khỏi S3 bucket sau khi chúng được đọc bởi wodle.',
          type: 'switch',
          default_value: true
        },
        {
          name: 'skip_on_error',
          description: 'Khi không thể xử lý và phân tích một bản ghi CloudTrail, bỏ qua log đó và tiếp tục xử lý.',
          type: 'switch',
          default_value: true
        }
      ]
    },
    {
      title: 'Buckets',
      description: 'Xác định một hoặc nhiều bucket để xử lý',
      elements: [
        {
          name: 'bucket',
          description: 'Xác định bucket để xử lý',
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
              description: 'Chỉ định loại bucket',
              info: 'Different configurations as macie has custom type.',
              type: 'select',
              required: true,
              values: [
                {value: 'cloudtrail', text: 'cloudtrail'},
                {value: 'guardduty', text: 'guardduty'},
                {value: 'vpcflow', text: 'vpcflow'},
                {value: 'config', text: 'config'},
                {value: 'custom', text: 'custom'}
              ],
              default_value: 'cloudtrail'
            }
          ],
          show_options: true,
          options: [
            {
              name: 'name',
              description: 'Tên của S3 bucket nơi đọc logs.',
              type: 'input',
              required: true,
              placeholder: 'Name of the S3 bucket'
            },
            {
              name: 'aws_account_id',
              description: 'ID tài khoản AWS cho logs của bucket. Chỉ áp dụng với CloudTrail buckets.',
              type: 'input',
              placeholder: 'Comma list of 12 digit AWS Account ID'
            },
            {
              name: 'aws_account_alias',
              description: 'Tên thân thiện dành cho tài khoản AWS',
              type: 'input',
              placeholder: 'AWS account user-friendly name'
            },
            {
              name: 'access_key',
              description: 'ID khóa truy cập cho người dùng IAM có quyền đọc logs từ bucket.',
              type: 'input',
              placeholder: 'Any alphanumerical key.'
            },
            {
              name: 'secret_key',
              description: 'The secret key created for the IAM user with the permission to read logs from the bucket.',
              type: 'input',
              placeholder: 'Any alphanumerical key.'
            },
            {
              name: 'aws_profile',
              description: 'Tên profile hợp lệ từ Shared Credential File hoặc AWS Config File với quyền đọc logs từ bucket.',
              type: 'input',
              placeholder: 'Valid profile name'
            },
            {
              name: 'iam_role_arn',
              description: 'Role arn hợp lệ với quyền đọc logs từ bucket. Valid role arn',
              type: 'input',
              placeholder: 'Valid role arn'
            },
            {
              name: 'path',
              description: 'Nếu được định nghĩa, đường dẫn hoặc tiền tố cho bucket.',
              type: 'input',
              placeholder: 'Path or prefix for the bucket.'
            },
            {
              name: 'only_logs_after',
              description: 'Ngày hợp lệ theo định dạng YYYY-MMM-DD, chỉ các logs sau ngày này mới được phân tích; tất cả logs trước đó sẽ bị bỏ qua.',
              type: 'input',
              placeholder: 'Date, e.g.: 2020-APR-02',
              validate_regex: /^[1-9]\d{3}-((JAN)|(FEB)|(MAR)|(APR)|(MAY)|(JUN)|(JUL)|(AUG)|(SEP)|(OCT)|(NOV)|(DEC))-\d{2}$/,
              validate_error_message: 'A valid date, in YYYY-MMM-DD format'
            },
            {
              name: 'regions',
              description: 'Một danh sách các vùng, phân cách bằng dấu phẩy, để hạn chế việc phân tích logs. Chỉ áp dụng với CloudTrail buckets.',
              type: 'input',
              default_value: 'All regions',
              placeholder: 'Comma-delimited list of valid regions'
            },
            {
              name: 'aws_organization_id',
              description: 'Tên tổ chức AWS. Chỉ áp dụng với CloudTrail buckets.',
              type: 'input',
              placeholder: 'Valid AWS organization name'
            }
          ]
        }
      ]
    }
  ]
}