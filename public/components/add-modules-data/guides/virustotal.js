/*
* Wazuh app - VirusTotal interactive extension guide
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
  id: 'virustotal',
  xml_tag: 'integration',
  name: 'VirusTotal',
  description: 'Tùy chọn cấu hình tích hợp VirusTotal',
  category: 'Phát hiện và ứng phó mối đe dọa',
  documentation_link: webDocumentationLink('user-manual/reference/ossec-conf/integration.html'),
  icon: 'securityApp',
  avaliable_for_manager: true,
  steps: [
    {
      title: 'Cài đặt bắt buộc',
      description: '',
      elements: [
        {
          name: 'name',
          description: 'Điều này chỉ ra dịch vụ cần tích hợp.',
          type: 'input',
          required: true,
          default_value: 'virustotal',
          field_read_only: true
        },
        {
          name: 'api_key',
          description: 'Đây là khóa bạn sẽ lấy từ API VirusTotal.',
          type: 'input',
          required: true,
          placeholder: 'VirusTotal Api key'
        }
      ]
    },
    {
      title: 'Cài đặt tùy chọn',
      description: '',
      elements: [
        {
          name: 'level',
          description: 'Bộ lọc này lọc cảnh báo theo mức quy tắc để chỉ đẩy các cảnh báo với mức được chỉ định trở lên.',
          type: 'input-number',
          values: { min: 0, max: 16 },
          default_value: 0,
          placeholder: 'Any alert level from 0 to 16',
          validate_error_message: 'Any alert level from 0 to 16'
        },
        {
          name: 'rule_id',
          description: 'Bộ lọc này lọc cảnh báo theo rule ID.',
          type: 'input',
          default_value: '',
          placeholder: 'Comma-separated rule IDs',
          validate_error_message: 'Comma-separated rule IDs'
        },
        {
          name: 'group',
          description: 'Bộ lọc này lọc cảnh báo theo nhóm rule. Đối với tích hợp VirusTotal, chỉ có các rule từ nhóm syscheck khả dụng.',
          type: 'input',
          placeholder: 'Any rule group or comma-separated rule groups.'
        },
        {
          name: 'event_location',
          description: 'Bộ lọc này lọc cảnh báo theo nguồn gốc sự kiện. Theo cú pháp OS_Regex.',
          type: 'input',
          placeholder: 'Any single log file.'
        },
        {
          name: 'alert_format',
          description: 'Hành động này ghi tập tin cảnh báo theo định dạng JSON. Integrator sử dụng tập tin này để lấy giá trị các trường.',
          type: 'input',
          placeholder: 'json',
          default_value: 'json',
          field_read_only: true,
          validate_error_message: 'json'
        },
        {
          name: 'max_log',
          description: 'Độ dài tối đa của đoạn cảnh báo gửi đến Integrator. Các chuỗi dài hơn sẽ bị cắt bớt bằng ...',
          type: 'input-number',
          values: { min: 165, max: 1024 },
          default_value: 165,
          placeholder: 'Any integer from 165 to 1024 inclusive.',
          validate_error_message: 'Any integer from 165 to 1024 inclusive.'
        }
      ]
    }
  ]
}
