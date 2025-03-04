/*
* Wazuh app - Vulnerabilities interactive extension guide
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
  id: 'fim',
  xml_tag: 'syscheck',
  name: 'Integrity monitoring',
  description: 'Tùy chọn cấu hình cho giám sát toàn vẹn tệp',
  category: 'Quản lý thông tin an ninh',
  documentation_link: webDocumentationLink('user-manual/reference/ossec-conf/syscheck.html'),
  icon: 'filebeatApp',
  avaliable_for_manager: true,
  avaliable_for_agent: true,
  steps: [
    {
      title: 'Thư mục/tập tin cần giám sát',
      description: 'Thêm hoặc loại bỏ các thư mục cần theo dõi. Bạn có thể thêm nhiều thư mục với cấu hình giám sát khác nhau.',
      elements: [
        {
          name: 'directories',
          description: `Use this option to add or remove directories to be monitored. The directories must be comma separated.
          All files and subdirectories within the noted directories will also be monitored.              
          Drive letters without directories are not valid. At a minimum the ‘.’ should be included (D:\\.).
          This is to be set on the system to be monitored (or in the agent.conf, if appropriate).`,
          type: 'input',
          required: true,
          removable: true,
          repeatable: true,
          repeatable_insert_first: true,
          repeatable_insert_first_properties: {
            removable: false
          },
          placeholder: 'Any directory comma separated',
          default_value: '/etc,/usr/bin,/usr/sbin,/bin,/sbin',
          attributes: [
            {
              name: 'realtime',
              description: `This will enable real-time/continuous monitoring on Linux (using the inotify system calls) and Windows systems.
              Real time only works with directories, not individual files.`,
              type: 'switch',
              default_value: false
            },
            {
              name: 'who-data',
              description: 'Điều này sẽ kích hoạt giám sát who-data trên hệ thống Linux và Windows.',
              type: 'switch',
              default_value: false
            },
            {
              name: 'report_changes',
              description: 'Báo cáo thay đổi tập tin. Hiện chỉ áp dụng cho các tập tin văn bản.',
              type: 'switch',
              default_value: false
            },
            {
              name: 'check_all',
              description: 'Tất cả thuộc tính có tiền tố check_ sẽ được kích hoạt',
              type: 'switch',
              default_value: true
            },
            {
              name: 'check_sum',
              description: `Check the MD5, SHA-1 and SHA-256 hashes of the files.
              Same as using check_md5sum="yes", check_sha1sum="yes" and check_sha256sum="yes" at the same time.`,
              type: 'switch',
              default_value: false
            },
            {
              name: 'check_sha1sum',
              description: 'Chỉ kiểm tra hàm băm SHA-1 của các tập tin.',
              type: 'switch',
              default_value: false
            },
            {
              name: 'check_md5sum',
              description: 'Chỉ kiểm tra hàm băm MD5 của các tập tin.',
              type: 'switch',
              default_value: false
            },
            {
              name: 'check_sha256sum',
              description: 'Chỉ kiểm tra hàm băm SHA-256 của các tập tin.',
              type: 'switch',
              default_value: false
            },
            {
              name: 'check_size',
              description: 'Kiểm tra kích thước của các tập tin.',
              type: 'switch',
              default_value: false
            },
            {
              name: 'check_owner',
              description: `Check the owner of the files.
              On Windows, uid will always be 0.`,
              type: 'switch',
              default_value: false
            },
            {
              name: 'check_group',
              description: `Check the group owner of the files/directories.
              Available for UNIX. On Windows, gid will always be 0 and the group name will be blank.`,
              type: 'switch',
              default_value: false
            },
            {
              name: 'check_perm',
              description: `Check the permission of the files/directories.
              On Windows, a list of denied and allowed permissions will be given for each user or group since version 3.8.0.
              Only works on NTFS partitions on Windows systems.`,
              type: 'switch',
              default_value: false,
              agent_os: 'windows'
            },
            {
              name: 'check_attrs',
              description: `Check the attributes of the files.
              Available for Windows.`,
              type: 'switch',
              default_value: false,
              agent_os: 'windows'
            },
            {
              name: 'check_mtime',
              description: 'Kiểm tra thời gian chỉnh sửa của tập tin.',
              type: 'switch',
              default_value: false
            },
            {
              name: 'check_inode',
              description: `Check the file inode.
              Available for UNIX. On Windows, inode will always be 0.`,
              type: 'switch',
              default_value: false,
              agent_os: 'linux'
            },
            {
              name: 'restrict',
              description: `Limit checks to files containing the entered string in the file name.
              Any directory or file name (but not a path) is allowed`,
              type: 'input',
              placeholder: 'sregex',
              default_value: 'sregex',
              field_read_only: true,
              validate_error_message: 'Any directory or file name (but not a path) is allowed'
            },
            {
              name: 'tags',
              description: 'Thêm các tag cho cảnh báo của các thư mục được giám sát.',
              type: 'input',
              placeholder: 'Tags list separated by commas'
            },
            {
              name: 'recursion_level',
              description: 'Giới hạn mức đệ quy tối đa cho phép.',
              type: 'input-number',
              default_value: '',
              values: { min: 0, max: 320 },
              placeholder: 'Any integer between 0 and 320',
              validate_error_message: 'Any integer between 0 and 320'
            },
            {
              name: 'follow_symbolic_link',
              description: `Follow symbolic links (directories or files). The default value is “no”. The setting is available for UNIX systems.
              If set, realtime works as usual (with symbolic links to directories, not files).`,
              type: 'switch',
              default_value: false,
              agent_os: 'linux'
            }
          ]
        }
      ]
    },
    {
      title: 'Bỏ qua các thư mục và/hoặc tập tin',
      description: 'Danh sách các tập tin hoặc thư mục sẽ bị bỏ qua. Bạn có thể thêm tùy chọn này nhiều lần. Các tập tin và thư mục này vẫn được kiểm tra, nhưng kết quả sẽ bị bỏ qua.',
      elements: [
        {
          name: 'ignore',
          description: 'Tập tin hoặc thư mục sẽ bị bỏ qua.',
          type: 'input',
          removable: true,
          required: true,
          repeatable: true,
          placeholder: 'File/directory path',
          attributes: [
            {
              name: 'type',
              description: 'Đây là mẫu regex đơn giản để loại trừ các tập tin nhằm không tạo cảnh báo.',
              type: 'input',
              placeholder: 'sregex',
              default_value: 'sregex',
              field_read_only: true
            }
          ]
        }
      ]
    },
    {
      title: 'Không tính diff',
      description: 'Danh sách các tập tin không tính diff. Bạn có thể thêm tùy chọn này nhiều lần. Nó có thể dùng cho các tập tin nhạy cảm như khóa riêng, thông tin đăng nhập trong tập tin hoặc cấu hình cơ sở dữ liệu, nhằm tránh rò rỉ dữ liệu qua cảnh báo khi nội dung tập tin thay đổi.',
      elements: [
        {
          name: 'nodiff',
          description: 'Tập tin để không tính diff',
          type: 'input',
          placeholder: 'File path',
          required: true,
          removable: true,
          repeatable: true,
          validate_error_message: 'Any file name. e.g. /etc/ssl/private.key',
          attributes: [
            {
              name: 'type',
              description: 'Đây là mẫu regex đơn giản để loại trừ các tập tin nhằm không tạo cảnh báo.',
              type: 'input',
              placeholder: 'sregex',
              default_value: 'sregex',
              field_read_only: true
            }
          ]
        }
      ]
    },
    {
      title: 'Ngày quét',
      description: 'Ngày trong tuần để chạy quét. Bạn có thể thêm tùy chọn này nhiều lần.',
      elements: [
        {
          name: 'scan_day',
          description: 'Ngày trong tuần để chạy quét.',
          type: 'select',
          removable: true,
          required: true,
          repeatable: true,
          values: [
            {value: 'sunday', text: 'sunday'},
            {value: 'monday', text: 'monday'},
            {value: 'tuesday', text: 'tuesday'},
            {value: 'wednesday', text: 'wednesday'},
            {value: 'thursday', text: 'thursday'},
            {value: 'friday', text: 'friday'},
            {value: 'saturday', text: 'saturday'}
          ],
          default_value: 'sunday',
          validate_error_message: `Day of the week.`
        }
      ]
    },
    {
      title: 'Windows registry',
      description: 'Sử dụng tùy chọn này để giám sát các mục nhập Windows registry được chỉ định. Bạn có thể thêm tùy chọn này nhiều lần.',
      elements: [
        {
          name: 'windows_registry',
          description: 'Sử dụng tùy chọn này để giám sát các mục nhập Windows registry được chỉ định',
          info: 'New entries will not trigger alerts, only changes to existing entries.',
          type: 'input',
          placeholder: 'Windows registry entry',
          default_value: 'HKEY_LOCAL_MACHINE\\Software',
          required: true,
          repeatable: true,
          removable: true,
          agent_os: 'windows',
          attributes: [
            {
              name: 'arch',
              description: 'Chọn chế độ xem Registry tùy thuộc vào kiến trúc.',
              type: 'select',
              values: [{value: '32bit', text: '32bit'}, {value: '64bit', text: '64bit'}, {value: 'both', text: 'both'}],
              default_value: '32bit'
            },
            {
              name: 'tags',
              description: 'Thêm các tag cho cảnh báo của các registry được giám sát',
              type: 'input',
              placeholder: 'Tags list separated by commas'
            }
          ]
        }
      ]
    },
    {
      title: 'Bỏ qua registry',
      description: 'Danh sách các registry sẽ bị bỏ qua.',
      elements: [
        {
          name: 'registry_ignore',
          description: 'Danh sách các mục registry cần bỏ qua. (mỗi dòng một mục). Có thể nhập nhiều dòng để bao gồm nhiều mục registry.',
          type: 'input',
          placeholder: 'Any registry entry.',
          validate_error_message: 'Any registry entry.',
          toggeable: true,
          attributes: [
            {
              name: 'arch',
              description: 'Chọn Registry để bỏ qua tùy thuộc vào kiến trúc.',
              type: 'select',
              values: [{value: '32bit', text: '32bit'}, {value: '64bit', text: '64bit'}, {value: 'both', text: 'both'}],
              default_value: '32bit'
            },
            {
              name: 'tags',
              description: 'Đây là mẫu regex đơn giản để loại trừ các tập tin nhằm không tạo cảnh báo.',
              type: 'input',
              placeholder: 'sregex'
            }
          ]
        }
      ]
    },
    {
      title: 'Các cài đặt khác',
      description: '',
      elements: [
        {
          name: 'frequency',
          description: 'Tần số chạy syscheck (giây).',
          type: 'input-number',
          required: true,
          default_value: 43200,
          values: { min: 1 },
          placeholder: 'Time in seconds.',
          validate_error_message: `A positive number, time in seconds.`
        },
        {
          name: 'scan_time',
          description: 'Thời gian để chạy quét. Có thể biểu diễn dạng 9pm hoặc 8:30.',
          info: 'This may delay the initialization of real-time scans.',
          type: 'input',
          placeholder: 'Time of day',
          validate_error_message: 'Time of day represented as 9pm or 8:30',
          validate_regex: /^(((0?[1-9]|1[012])(:[0-5][0-9])?am)|(((0?[0-9])|(1[0-9])|(2[0-4]))(:[0-5][0-9])?pm))|(((0?[0-9])|(1[012])|(2[0-4])):([0-5][0-9]))$/,
          warning: 'This may delay the initialization of real-time scans.'
        },
        {
          name: 'auto_ignore',
          description: 'Chỉ định nếu syscheck sẽ bỏ qua các tập tin thay đổi quá nhiều lần (chỉ áp dụng cho trình quản lý).',
          info: 'It is valid on: server and local.',
          type: 'switch',
          agent_type: 'manager',
          show_attributes: true,
          attributes: [
            {
              name: 'frequency',
              description: 'Number of times the alert can be repeated in the \'timeframe\' time interval.',
              type: 'input-number',
              required: true,
              values: { min: 1, max: 99 },
              default_value: 10,
              validate_error_message: 'Any number between 1 and 99.'
            },
            {
              name: 'timeframe',
              description: 'Khoảng thời gian để tích lũy số cảnh báo được tạo ra bởi một tập tin.',
              type: 'input-number',
              required: true,
              placeholder: 'Time in seconds',
              values: { min: 1, max: 43200 },
              default_value: 3600,
              validate_error_message: 'Any number between 1 and 43200.'
            }
          ]
        },
        {
          name: 'alert_new_files',
          description: 'Chỉ định nếu syscheck nên cảnh báo khi tạo tập tin mới.',
          info: 'It is valid on: server and local.',
          type: 'switch',
          default_value: true
        },
        {
          name: 'scan_on_start',
          description: 'Chỉ định xem syscheck có quét ngay khi khởi động hay không.',
          type: 'switch',
          default_value: true
        },
        {
          name: 'allow_remote_prefilter_cmd',
          description: 'Cho phép áp dụng tùy chọn prefilter_cmd trong cấu hình từ xa (agent.conf).',
          info: 'This option only can be activate from the agent side, in its own ossec.conf.',
          type: 'switch',
          default_value: false
        },
        {
          name: 'prefilter_cmd',
          description: 'Chạy để ngăn prelinking tạo ra dương tính giả.',
          info: `This option may negatively impact performance as the configured command will be run for each file checked.
          This option is ignored when defined at agent.conf if allow_remote_prefilter_cmd is set to no at ossec.conf.`,
          type: 'input',
          placeholder: 'Command to prevent prelinking.'
        },
        {
          name: 'skip_nfs',
          description: 'Chỉ định nếu syscheck nên quét hệ thống tập tin gắn mạng (áp dụng cho Linux và FreeBSD). Hiện tại, skip_nfs sẽ loại trừ các tập tin trên ổ CIFS hoặc NFS.',
          type: 'switch',
          default_value: true
        },
        {
          name: 'skip_dev',
          description: 'Chỉ định nếu syscheck nên quét thư mục /dev (áp dụng cho Linux và FreeBSD).',
          type: 'switch',
          default_value: true
        },
        {
          name: 'skip_sys',
          description: 'Specifies if syscheck should scan the /sys directory. (Works on Linux).',
          type: 'switch',
          default_value: true
        },
        {
          name: 'skip_proc',
          description: 'Specifies if syscheck should scan the /proc directory. (Works on Linux and FreeBSD).',
          type: 'switch',
          default_value: true
        },
        {
          name: 'windows_audit_interval',
          description: 'Tùy chọn này thiết lập tần số (giây) để trạm Windows kiểm tra SACL của các thư mục được giám sát ở chế độ whodata có đúng không.',
          type: 'input-number',
          values: { min: 1, max: 9999 },
          default_value: 300,
          placeholer: 'Time in seconds',
          validate_error_message: 'Any number from 1 to 9999',
          agent_os: 'windows'
        },
        {
          name: 'process_priority',
          description: 'Thiết lập giá trị ưu tiên cho tiến trình Syscheck.',
          info: 'The "niceness" scale in Linux goes from -20 to 19, whereas -20 is the highest priority and 19 the lowest priority.',
          type: 'input-number',
          placholder: 'Process priority',
          default_value: 10,
          values: { min: -20, max: 19 },
          validate_error_message: 'Integer number between -20 and 19.'
        },
        {
          name: 'max_eps',
          description: 'Thiết lập thông lượng báo cáo sự kiện tối đa. Sự kiện là thông báo tạo ra cảnh báo.',
          info: '0 means disabled.',
          type: 'input-number',
          placholder: 'Process priority',
          default_value: 100,
          values: { min: 0, max: 1000000 },
          validate_error_message: 'Integer number between 0 and 1000000.'
        },
        {
          name: 'database',
          description: 'Chỉ định nơi lưu trữ cơ sở dữ liệu.',
          type: 'select',
          default_value: 'disk',
          values: [
            { value: 'disk', text: 'disk'},
            { value: 'memory', text: 'memory'}
          ]
        },
        {
          name: 'synchronization',
          description: 'Cài đặt đồng bộ hóa cơ sở dữ liệu sẽ được cấu hình bên trong thẻ này.',
          show_options: true,
          options: [
            {
              name: 'enabled',
              description: 'Chỉ định liệu có đồng bộ inventory định kỳ hay không.',
              type: 'switch',
              default_value: true,
              required: true
            },
            {
              name: 'interval',
              description: 'Chỉ định số giây ban đầu giữa các lần đồng bộ inventory. Nếu đồng bộ không thành công, giá trị sẽ được nhân đôi cho đến khi đạt max_interval.',
              type: 'input',
              default_value: '300s',
              required: true,
              validate_error_message: 'Any number greater than or equal to 0. Allowed sufixes (s, m, h, d).',
              validate_regex: /^[1-9]\d*[s|m|h|d]$/
            },
            {
              name: 'max_interval',
              description: 'Chỉ định số giây tối đa giữa các lần đồng bộ inventory.',
              type: 'input',
              default_value: '1h',
              required: true,
              validate_error_message: 'Any number greater than or equal to 0. Allowed sufixes (s, m, h, d).',
              validate_regex: /^[1-9]\d*[s|m|h|d]$/
            },
            {
              name: 'response_timeout',
              description: 'Chỉ định khoảng thời gian (giây) kể từ khi trạm gửi tin nhắn đến trình quản lý và nhận được phản hồi. Nếu không nhận được phản hồi trong khoảng này, tin nhắn được đánh dấu là chưa trả lời (hết thời gian) và trạm có thể bắt đầu phiên đồng bộ mới theo khoảng đã định.',
              type: 'input-number',
              default_value: 30,
              required: true,
              values: { min: 0 },
              validate_error_message: 'Any number greater than or equal to 0.'
            },
            {
              name: 'queue_size',
              description: 'Chỉ định kích thước hàng đợi của phản hồi đồng bộ từ trình quản lý.',
              type: 'input-number',
              default_value: 16384,
              required: true,
              values: { min: 0, max: 1000000 },
              validate_error_message: 'Integer number between 2 and 1000000.'
            },
            {
              name: 'max_eps',
              description: 'Thiết lập thông lượng tin nhắn đồng bộ hóa tối đa.',
              info: '0 means disabled.',
              type: 'input-number',
              default_value: 10,
              required: true,
              values: { min: 0, max: 1000000 },
              validate_error_message: 'Integer number between 0 and 1000000. 0 means disabled.'
            }
          ]
        },
        {
            name: 'whodata',
            description: 'Các tùy chọn whodata sẽ được cấu hình bên trong thẻ này.',
            options: [
              {
                name: 'restart_audit',
                description: 'Cho phép hệ thống khởi động lại Auditd sau khi cài đặt plugin. Lưu ý rằng nếu thiết lập giá trị này là no thì các quy tắc whodata mới sẽ không được tự động áp dụng.',
                type: 'switch',
                default_value: true
              },
              {
                name: 'audit_key',
                description: 'Thiết lập công cụ FIM để thu thập các sự kiện Audit sử dụng khóa có audit_key. Wazuh sẽ đưa các sự kiện được Audit giám sát bằng audit_key vào baseline FIM. Đối với các hệ thống đã cài đặt Audit để giám sát thư mục cho mục đích khác, Wazuh có thể thu thập các sự kiện được tạo ra dưới dạng khóa từ audit_key. Tùy chọn này chỉ áp dụng cho hệ thống Linux có Audit.',
                info: 'Audit allow inserting spaces inside the keys, so the spaces inserted inside the field <audit_key> will be part of the key.',
                type: 'input',
                placeholder: 'Any string separated by commas',
                validate_error_message: 'Any string separated by commas',
                agent_os: 'linux'
              },
              {
                name: 'startup_healthcheck',
                description: 'Tùy chọn này cho phép vô hiệu hóa kiểm tra sức khỏe Audit khi khởi động Whodata. Chỉ áp dụng cho hệ thống Linux có Audit.',
                warning: 'The health check ensures that the rules required by Whodata can be set in Audit correctly and also that the generated events can be obtained. Disabling the health check may cause functioning problems in Whodata and loss of FIM events.',
                type: 'switch',
                default_value: true,
                agent_os: 'linux'
              }
            ]
          }
      ]
    },
  ]
}
