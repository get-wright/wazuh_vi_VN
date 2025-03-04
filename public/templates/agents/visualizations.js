/*
 * Wazuh app - Tab name equivalence
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

export const visualizations = {
  general: {
    rows: [
      {
        height: 400,
        vis: [
          {
            title: 'Chuyển hóa trong các nhóm cảnh báo',
            id: 'Wazuh-App-Agents-General-Alert-groups-evolution',
            width: 50
          },
          { title: 'Cảnh báo', id: 'Wazuh-App-Agents-General-Alerts', width: 50 }
        ]
      },
      {
        height: 300,
        vis: [
          {
            title: 'Top 5 trạm hàng đầu',
            id: 'Wazuh-App-Agents-General-Top-5-alerts',
            width: 33
          },
          {
            title: 'Top 5 nhóm rule',
            id: 'Wazuh-App-Agents-General-Top-10-groups',
            width: 33
          },
          {
            title: 'Top 5 yêu cầu PCI DSS',
            id: 'Wazuh-App-Agents-General-Top-5-PCI-DSS-Requirements',
            width: 33
          }
        ]
      },
    ]
  },
  fim: {
    rows: [
      {
        height: 300,
        vis: [
          {
            title: 'Các người dùng hoạt động tích cực nhất',
            id: 'Wazuh-App-Agents-FIM-Users',
            width: 30
          },
          {
            title: 'Hành động',
            id: 'Wazuh-App-Agents-FIM-Actions',
            width: 30
          },
          {
            title: 'Sự kiện',
            id: 'Wazuh-App-Agents-FIM-Events',
            width: 40
          }
        ]
      },
      {
        height: 230,
        vis: [
          {
            title: 'Các tệp đã thêm',
            id: 'Wazuh-App-Agents-FIM-Files-added',
            width: 33
          },
          {
            title: 'Các tệp đã được sửa đổi',
            id: 'Wazuh-App-Agents-FIM-Files-modified',
            width: 33
          },
          {
            title: 'Các tệp đã bị xóa',
            id: 'Wazuh-App-Agents-FIM-Files-deleted',
            width: 33
          }
        ]
      },
    ]
  },
  pci: {
    rows: [
      {
        height: 300,
        vis: [
          {
            title: 'Top 5 nhóm rule',
            id: 'Wazuh-App-Agents-PCI-Groups',
            width: 33
          },
          {
            title: 'Top 5 rule',
            id: 'Wazuh-App-Agents-PCI-Rule',
            width: 33
          },
          {
            title: 'Top 5 yêu cầu PCI DSS',
            id: 'Wazuh-App-Agents-PCI-Requirement',
            width: 33
          }
        ]
      },
      {
        height: 300,
        vis: [
          {
            title: 'Yêu cầu PCI',
            id: 'Wazuh-App-Agents-PCI-Requirements',
            width: 70
          },
          {
            title: 'Phân phối mức rule',
            id: 'Wazuh-App-Agents-PCI-Rule-level-distribution',
            width: 30
          }
        ]
      },
    ]
  },
  gdpr: {
    rows: [
      {
        height: 300,
        vis: [
          {
            title: 'Top 5 nhóm rule',
            id: 'Wazuh-App-Agents-GDPR-Groups',
            width: 33
          },
          {
            title: 'Top 5 rule',
            id: 'Wazuh-App-Agents-GDPR-Rule',
            width: 33
          },
          {
            title: 'Top 5 yêu cầu GDPR hàng đầu',
            id: 'Wazuh-App-Agents-GDPR-Requirement',
            width: 33
          }
        ]
      },
      {
        height: 300,
        vis: [
          {
            title: 'Yêu cầu GDPR',
            id: 'Wazuh-App-Agents-GDPR-Requirements',
            width: 70
          },
          {
            title: 'Phân phối mức rule',
            id: 'Wazuh-App-Agents-GDPR-Rule-level-distribution',
            width: 30
          }
        ]
      },
    ]
  },
  nist: {
    rows: [
      {
        height: 300,
        vis: [
          {
            title: 'Số liệu thống kê',
            id: 'Wazuh-App-Agents-NIST-Stats',
            width: 25
          },
          {
            title: 'Top 10 yêu cầu',
            id: 'Wazuh-App-Agents-NIST-top-10-requirements',
            width: 25
          },
          {
            title: 'Yêu cầu phân phối theo cấp độ',
            id: 'Wazuh-App-Agents-NIST-Requirement-by-level',
            width: 50
          }
        ]
      },
      {
        height: 300,
        vis: [
          {
            title: 'Yêu cầu theo thời gian',
            id: 'Wazuh-App-Agents-NIST-Requirements-stacked-overtime'
          }
        ]
      },
    ]
  },
  tsc: {
    rows: [
      {
        height: 400,
        vis: [
          {
            title: 'Yêu cầu TSC',
            id: 'Wazuh-App-Overview-TSC-requirements',
            width: 50
          },
          {
            title: 'Top 10 trạm theo số lượng cảnh báo',
            id: 'Wazuh-App-Overview-TSC-Agents',
            width: 50
          }
        ]
      },
      {
        height: 300,
        vis: [
          {
            title: 'Top yêu cầu theo thời gian',
            id: 'Wazuh-App-Overview-TSC-Requirements-over-time'
          }
        ]
      },
      {
        height: 530,
        vis: [
          {
            title: 'Cảnh báo cuối',
            id: 'Wazuh-App-Overview-TSC-Requirements-Agents-heatmap'
          }
        ]
      },
      {
        height: 255,
        vis: [
          {
            title: 'Yêu cầu của trạm',
            id: 'Wazuh-App-Overview-TSC-Requirements-by-agent'
          }
        ]
      },
    ]
  },
  hipaa: {
    rows: [
      {
        height: 300,
        vis: [
          {
            title: 'Yêu cầu theo thời gian',
            id: 'Wazuh-App-Agents-HIPAA-Requirements-Stacked-Overtime',
            width: 50
          },
          {
            title: 'Top 10 yêu cầu',
            id: 'Wazuh-App-Agents-HIPAA-top-10',
            width: 50
          }
        ]
      },
      {
        height: 300,
        vis: [
          {
            title: 'Yêu cầu HIPAA',
            id: 'Wazuh-App-Agents-HIPAA-Burbles',
            width: 45
          },
          {
            title: 'Yêu cầu phân phối theo cấp độ',
            id: 'Wazuh-App-Agents-HIPAA-Distributed-By-Level',
            width: 30
          },
          {
            title: 'Các cảnh báo phổ biến nhất',
            id: 'Wazuh-App-Agents-HIPAA-Most-Common',
            width: 25
          }
        ]
      },
    ]
  },
  virustotal: {
    rows: [
      {
        height: 250,
        vis: [
          {
            title: 'Các tệp quét cuối',
            id: 'Wazuh-App-Agents-Virustotal-Last-Files-Pie',
            width: 33
          },
          {
            title: 'Chuyển hóa cảnh báo các tệp độc hại',
            id: 'Wazuh-App-Agents-Virustotal-Malicious-Evolution',
            width: 67
          }
        ]
      },
      {
        height: 570,
        vis: [
          {
            title: 'Tệp cuối',
            id: 'Wazuh-App-Agents-Virustotal-Files-Table'
          }
        ]
      },
    ]
  },
  osquery: {
    rows: [
      {
        height: 300,
        vis: [
          {
            title: 'Các hành động Osquery phổ biến nhất',
            id: 'Wazuh-App-Agents-Osquery-most-common-osquery-actions',
            width: 30
          },
          {
            title: 'Sự chuyển hóa của các sự kiện Osquery theo từng gói theo thời gian',
            id: 'Wazuh-App-Agents-Osquery-Evolution',
            width: 70
          }
        ]
      },
      {
        height: 300,
        vis: [
          {
            title: 'Các gói Osquery phổ biến nhất đang được sử dụng',
            id: 'Wazuh-App-Agents-Osquery-top-5-packs-being-used',
            width: 30
          },
          {
            title: 'Các rule phổ biến nhất',
            id: 'Wazuh-App-Agents-Osquery-monst-common-rules-being-fired',
            width: 70
          }
        ]
      },
    ]
  },
  docker: {
    rows: [
      {
        height: 300,
        vis: [
          {
            title: 'Top 5 images',
            id: 'Wazuh-App-Agents-Docker-top-5-images',
            width: 25
          },
          {
            title: 'Top 5 sự kiện hàng đầu',
            id: 'Wazuh-App-Agents-Docker-top-5-actions',
            width: 25
          },
          {
            title: 'Sử dụng tài nguyên theo thời gian',
            id: 'Wazuh-App-Agents-Docker-Types-over-time',
            width: 50
          }
        ]
      },
      {
        height: 300,
        vis: [
          {
            title: 'Chuyển hóa giữa các sự kiện',
            id: 'Wazuh-App-Agents-Docker-Actions-over-time'
          }
        ]
      },
    ]
  },
  oscap: {
    rows: [
      {
        height: 230,
        vis: [
          {
            title: 'Top 5 lần quét',
            id: 'Wazuh-App-Agents-OSCAP-Scans',
            width: 25
          },
          {
            title: 'Top 5 hồ sơ',
            id: 'Wazuh-App-Agents-OSCAP-Profiles',
            width: 25
          },
          {
            title: 'Top 5 nội dung',
            id: 'Wazuh-App-Agents-OSCAP-Content',
            width: 25
          },
          {
            title: 'Top 5 mức độ nghiêm trọng',
            id: 'Wazuh-App-Agents-OSCAP-Severity',
            width: 25
          }
        ]
      },
      {
        height: 230,
        vis: [
          {
            title: 'Chuyển hóa các lần quét hàng ngày',
            id: 'Wazuh-App-Agents-OSCAP-Daily-scans-evolution'
          }
        ]
      },
      {
        height: 250,
        vis: [
          {
            title: 'Top 5 - Cảnh báo',
            id: 'Wazuh-App-Agents-OSCAP-Top-5-Alerts',
            width: 50
          },
          {
            title: 'Top 5 - Cảnh báo rủi ro cao',
            id: 'Wazuh-App-Agents-OSCAP-Top-5-High-risk-alerts',
            width: 50
          }
        ]
      },
    ]
  },
  ciscat: {
    rows: [
      {
        height: 320,
        vis: [
          {
            title: 'Top 5 nhóm CIS-CAT',
            id: 'Wazuh-app-Agents-CISCAT-top-5-groups',
            width: 60
          },
          {
            title: 'Chuyển hóa kết quả quét',
            id: 'Wazuh-app-Agents-CISCAT-scan-result-evolution',
            width: 40
          }
        ]
      },
    ]
  },
  pm: {
    rows: [
      {
        height: 290,
        vis: [
          {
            title: 'Cảnh báo theo thời gian',
            id: 'Wazuh-App-Agents-PM-Events-over-time',
            width: 50
          },
          {
            title: 'Phân phối rule',
            id: 'Wazuh-App-Agents-PM-Top-5-rules',
            width: 50
          }
        ]
      },
      {
        height: 240,
        vis: [
          {
            title: 'Chuyển hóa sự kiện theo loại kiểm soát',
            id: 'Wazuh-App-Agents-PM-Events-per-agent-evolution'
          }
        ]
      },
    ]
  },
  audit: {
    rows: [
      {
        height: 250,
        vis: [
          {
            title: 'Các nhóm',
            id: 'Wazuh-App-Agents-Audit-Groups',
            width: 33
          },
          {
            title: 'Các lệnh',
            id: 'Wazuh-App-Agents-Audit-Commands',
            width: 33
          },
          {
            title: 'Các tệp',
            id: 'Wazuh-App-Agents-Audit-Files',
            width: 33
          }
        ]
      },
      {
        height: 310,
        vis: [
          {
            title: 'Cảnh báo theo thời gian',
            id: 'Wazuh-App-Agents-Audit-Alerts-over-time'
          }
        ]
      },
    ]
  }
};
