/*
* Wazuh app - Osquery interactive extension guide
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
  id: 'osquery',
  name: 'Osquery',
  wodle_name: 'osquery',
  description: 'Tùy chọn cấu hình của osquery wodle',
  category: 'Threat detection and response',
  documentation_link: webDocumentationLink('user-manual/reference/ossec-conf/wodle-osquery.html'),
  icon: 'securityApp',
  callout_warning: 'Osquery is not installed by default. It is an open source software that you have to obtain for using this module.',
  avaliable_for_manager: true,
  avaliable_for_agent: true,
  steps: [
    {
      title: 'Cài đặt',
      description: '',
      elements: [
        {
          name: 'disabled',
          description: 'Vô hiệu hóa osquery wodle',
          type: 'switch',
          required: true
        },
        {
          name: 'run_daemon',
          description: 'Cho phép module chạy osqueryd dưới dạng tiến trình con hoặc giám sát tập kết quả log mà không cần chạy Osquery.',
          type: 'switch',
          required: true,
          default_value: true
        },
        {
          name: 'bin_path',
          description: 'Đường dẫn đầy đủ đến thư mục chứa tệp osqueryd có thể thực thi',
          type: 'input',
          required: true,
          placeholder: 'Any valid path.',
          default_value_linux: '',
          default_value_windows: 'C:\\Program Files\\osquery\\osqueryd'
        },
        {
          name: 'log_path',
          description: 'Đường dẫn đầy đủ đến tập tin log kết quả do Osquery ghi',
          type: 'input',
          required: true,
          placeholder: 'Any valid path.',
          default_value_linux: '/var/log/osquery/osqueryd.results.log',
          default_value_windows: 'C:\\Program Files\\osquery\\log\\osqueryd.results.log',
          validate_error_message: 'Any valid path.'
        },
        {
          name: 'config_path',
          description: 'Đường dẫn đến tập tin cấu hình Osquery. Đường dẫn này có thể là tương đối với thư mục nơi trạm Wazuh đang chạy.',
          type: 'input',
          required: true,
          placeholder: 'Path to the Osquery configuration file',
          default_value_linux: '/etc/osquery/osquery.conf',
          default_value_windows: 'C:\\Program Files\\osquery\\osquery.conf'
        },
        {
          name: 'add_labels',
          description: 'Thêm các nhãn trạm được định nghĩa làm decorator.',
          type: 'switch',
          required: true,
          default_value: true
        }
      ]
    },
    {
      title: 'Các gói',
      description: 'Thêm gói truy vấn vào cấu hình. Tùy chọn này có thể được định nghĩa nhiều lần.',
      elements: [
        {
          name: 'pack',
          description: 'Thêm một gói truy vấn vào cấu hình.',
          type: 'input',
          placeholder: 'Path to pack configuration file',
          default_value: '',
          removable: true,
          repeatable: true,
          required: true,
          validate_error_message: 'Path to pack configuration file',
          show_attributes: true,
          attributes: [
            {
              name: 'name',
              description: 'Tên cho gói này',
              type: 'input',
              required: true,
              placeholder: 'Name for this pack',
              default_value: '',
              validate_error_message: 'Name for this pack'
            }
          ]
        }
      ]
    }
  ]
}