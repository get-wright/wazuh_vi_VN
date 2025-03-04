/*
 * Wazuh app - Overview visualizations
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
        height: 360,
        vis: [
          {
            title: 'Chuyển hóa trong mức độ cảnh báo',
            id: 'Wazuh-App-Overview-General-Alert-level-evolution',
            width: 60
          },
          {
            title: 'MITRE ATT&CKS phổ biến',
            id: 'Wazuh-App-Overview-General-Alerts-Top-Mitre',
            width: 40
          }
        ]
      },
      {
        height: 360,
        vis: [
          {
            title: 'Top 5 trạm hàng đầu',
            id: 'Wazuh-App-Overview-General-Top-5-agents',
            width: 30
          },
          {
            title: 'Chuyển hóa cảnh báo - Top 5 trạm',
            id: 'Wazuh-App-Overview-General-Alerts-evolution-Top-5-agents',
            width: 70
          },
        ]
      },
    ]
  },
  fim: {
    rows: [
      {
        height: 400,
        vis: [
          {
            title: 'Cảnh báo theo hành động theo thời gian',
            id: 'Wazuh-App-Agents-FIM-Alerts-by-action-over-time'
          }
        ]
      },
      {
        height: 300,
        vis: [
          {
            title: 'Top 5 trạm hàng đầu',
            id: 'Wazuh-App-Overview-FIM-Top-5-agents-pie',
            width: 30
          },
          {
            title: 'Tóm tắt sự kiện',
            id: 'Wazuh-App-Overview-FIM-Events-summary',
            width: 70
          }
        ]
      },
      {
        height: 300,
        vis: [
          {
            title: 'Phân phối rule',
            id: 'Wazuh-App-Overview-FIM-Top-5-rules',
            width: 33
          },
          {
            title: 'Hành động',
            id: 'Wazuh-App-Overview-FIM-Common-actions',
            width: 33
          },
          {
            title: 'Top 5 người dùng',
            id: 'Wazuh-App-Overview-FIM-top-agents-user',
            width: 34
          }
        ]
      },
    ]
  },
  office: {
    rows: [
      {
        height: 320,
        vis: [
          {
            title: 'Các sự kiện theo mức độ nghiêm trọng theo thời gian',
            id: 'Wazuh-App-Overview-Office-Rule-Level-Histogram',
            width: 40
          },
          {
            title: 'Địa chỉ IP theo người dùng',
            id: 'Wazuh-App-Overview-Office-IPs-By-User-Barchart',
            width: 30
          },
          {
            title: 'Top người dùng theo đăng ký',
            id: 'Wazuh-App-Overview-Office-Top-Users-By-Subscription-Barchart',
            width: 30
          },
        ]
      },
      {
        height: 350,
        vis: [
          {
            title: 'Người dùng theo kết quả hoạt động',
            id: 'Wazuh-App-Overview-Office-User-By-Operation-Result',
            width: 35
          },
          {
            title: 'Mức độ nghiêm trọng theo người dùng',
            id: 'Wazuh-App-Overview-Office-Severity-By-User-Barchart',
            width: 30
          },
          {
            title: 'Mô tả rule theo cấp độ',
            id: 'Wazuh-App-Overview-Office-Rule-Description-Level-Table',
            width: 35
          },
        ]
      },
      {
        height: 570,
        vis: [
          {
            title: 'Bản đồ định vị',
            id: 'Wazuh-App-Overview-Office-Location'
          }
        ]
      },
    ]
  },
  aws: {
    rows: [
      {
        height: 250,
        vis: [
          {
            title: 'Nguồn',
            id: 'Wazuh-App-Overview-AWS-Top-sources',
            width: 25
          },
          {
            title: 'Tài khoản',
            id: 'Wazuh-App-Overview-AWS-Top-accounts',
            width: 25
          },
          {
            title: 'S3 buckets',
            id: 'Wazuh-App-Overview-AWS-Top-buckets',
            width: 25
          },
          {
            title: 'Vùng',
            id: 'Wazuh-App-Overview-AWS-Top-regions',
            width: 25
          }
        ]
      },
      {
        height: 300,
        vis: [
          {
            title: 'Các sự kiện theo nguồn theo thời gian',
            id: 'Wazuh-App-Overview-AWS-Events-by-source',
            width: 50
          },
          {
            title: 'Các sự kiện của Amazon buckets theo thời gian',
            id: 'Wazuh-App-Overview-AWS-Events-by-s3-bucket',
            width: 50
          }
        ]
      },
      {
        height: 570,
        vis: [
          {
            title: 'Bản đồ định vị',
            id: 'Wazuh-App-Overview-AWS-geo'
          }
        ]
      },
    ]
  },
  gcp: {
    rows: [
      {
        height: 250,
        vis: [
          {
            title: 'Sự kiện theo thời gian dựa trên auth',
            id: 'Wazuh-App-Overview-GCP-Alerts-Evolution-By-AuthAnswer',
            width: 100
          }
        ]
      },
      {
        height: 250,
        vis: [
          {
            title: 'Top phiên theo mã phản hồi',
            id: 'Wazuh-App-Overview-GCP-Top-vmInstances-By-ResponseCode',
            width: 25
          },
          {
            title: 'Loại tài nguyên theo ID dự án',
            id: 'Wazuh-App-Overview-GCP-Top-ResourceType-By-Project-Id',
            width: 50
          },
          {
            title: 'ID dự án hàng đầu theo sourcetype',
            id: 'Wazuh-App-Overview-GCP-Top-ProjectId-By-SourceType',
            width: 25
          },
        ]
      },
      {
        height: 450,
        vis: [
          {
            title: 'Top 5 bản đồ theo địa chỉ IP nguồn',
            id: 'Wazuh-App-Overview-GCP-Map-By-SourceIp',
            width: 100
          },
        ]
      },
    ]
  },
  pci: {
    rows: [
      {
        height: 400,
        vis: [
          {
            title: 'Yêu cầu PCI DSS',
            id: 'Wazuh-App-Overview-PCI-DSS-requirements',
            width: 50
          },
          {
            title: 'Top 10 trạm theo số lượng cảnh báo',
            id: 'Wazuh-App-Overview-PCI-DSS-Agents',
            width: 50
          }
        ]
      },
      {
        height: 300,
        vis: [
          {
            title: 'Top yêu cầu theo thời gian',
            id: 'Wazuh-App-Overview-PCI-DSS-Requirements-over-time'
          }
        ]
      },
      {
        height: 530,
        vis: [
          {
            title: 'Cảnh báo cuối',
            id: 'Wazuh-App-Overview-PCI-DSS-Requirements-Agents-heatmap'
          }
        ]
      },
      {
        height: 255,
        vis: [
          {
            title: 'Yêu cầu của trạm',
            id: 'Wazuh-App-Overview-PCI-DSS-Requirements-by-agent'
          }
        ]
      },
    ]
  },
  gdpr: {
    rows: [
      {
        height: 400,
        vis: [
          {
            title: 'Top 10 trạm theo số lượng cảnh báo',
            id: 'Wazuh-App-Overview-GDPR-Agents',
            width: 30
          },
          {
            title: 'Yêu cầu GDPR',
            id: 'Wazuh-App-Overview-GDPR-requirements',
            width: 70
          }
        ]
      },
      {
        height: 300,
        vis: [
          {
            title: 'Top yêu cầu theo thời gian',
            id: 'Wazuh-App-Overview-GDPR-Requirements-heatmap'
          }
        ]
      },
      {
        height: 530,
        vis: [
          {
            title: 'Cảnh báo cuối',
            id: 'Wazuh-App-Overview-GDPR-Requirements-Agents-heatmap'
          }
        ]
      },
      {
        height: 255,
        vis: [
          {
            title: 'Yêu cầu của trạm',
            id: 'Wazuh-App-Overview-GDPR-Requirements-by-agent'
          }
        ]
      },
    ]
  },
  nist: {
    rows: [
      {
        height: 400,
        vis: [
          {
            title: 'Các trạm hoạt động tích cực nhất',
            id: 'Wazuh-App-Overview-NIST-Agents',
            width: 20
          },
          {
            title: 'Top yêu cầu theo thời gian',
            id: 'Wazuh-App-Overview-NIST-Requirements-over-time',
            width: 50
          },
          {
            title: 'Yêu cầu phân phối theo trạm',
            id: 'Wazuh-App-Overview-NIST-requirements-by-agents',
            width: 30
          }
        ]
      },
      {
        height: 350,
        vis: [
          {
            title: 'Khối lượng cảnh báo theo trạm',
            id: 'Wazuh-App-Overview-NIST-Requirements-Agents-heatmap',
            width: 50
          },
          {
            title: 'Số liệu thống kê',
            id: 'Wazuh-App-Overview-NIST-Metrics',
            width: 20
          },
          {
            title: 'Top 10 yêu cầu',
            id: 'Wazuh-App-Overview-NIST-Top-10-requirements',
            width: 30
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
        height: 570,
        vis: [
          {
            title: 'Khối lượng cảnh báo theo trạm',
            id: 'Wazuh-App-Overview-HIPAA-Heatmap',
            width: 50
          },
          {
            hasRows: true,
            width: 50,
            rows: [
              {
                height: 285,
                vis: [
                  {
                    title: 'Các cảnh báo phổ biến nhất',
                    id: 'Wazuh-App-Overview-HIPAA-Tag-cloud',
                    width: 50
                  },
                  {
                    title: 'Top 10 yêu cầu',
                    id: 'Wazuh-App-Overview-HIPAA-Top-10-requirements',
                    width: 50
                  }
                ]
              },
              {
                height: 285,
                noMargin: true,
                vis: [
                  {
                    title: 'Các trạm hoạt động tích cực nhất',
                    id: 'Wazuh-App-Overview-HIPAA-Top-10-agents',
                    width: 50
                  },
                  {
                    title: 'Số liệu thống kê',
                    id: 'Wazuh-App-Overview-HIPAA-Metrics',
                    width: 50
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        height: 400,
        vis: [
          {
            title: 'Chuyển hóa yêu cầu theo thời gian',
            id: 'Wazuh-App-Overview-HIPAA-Top-requirements-over-time',
            width: 50
          },
          {
            title: 'Yêu cầu phân phối theo trạm',
            id:
              'Wazuh-App-Overview-HIPAA-Top-10-requirements-over-time-by-agent',
            width: 50
          }
        ]
      },
    ]
  },
  vuls: {
    rows: [
      {
        height: 330,
        vis: [
          {
            title: 'Các trạm bị ảnh hưởng nhiều nhất',
            id: 'Wazuh-App-Overview-vuls-Most-affected-agents',
            width: 30
          },
          {
            title: 'Mức độ nghiêm trọng của cảnh báo',
            id: 'Wazuh-App-Overview-vuls-Alerts-severity',
            width: 70
          }
        ]
      },
      {
        height: 330,
        vis: [
          {
            title: 'Các CVE phổ biến nhất',
            id: 'Wazuh-App-Overview-vuls-Most-common-CVEs',
            width: 30
          },
          {
            title: 'Chuyển hóa cảnh báo các gói bị ảnh hưởng hàng đầu',
            id: 'Wazuh-App-Overview-vuls-Vulnerability-evolution-affected-packages',
            width: 40
          },
          {
            title: 'Các CWE phổ biến nhất',
            id: 'Wazuh-App-Overview-vuls-Most-common-CWEs',
            width: 30
          }
        ]
      },
      {
        height: 450,
        vis: [
          {
            title: 'Các gói bị ảnh hưởng hàng đầu bởi CVEs',
            id: 'Wazuh-App-Overview-vuls-packages-CVEs',
            width: 50
          },
          {
            title: 'Mức độ nghiêm trọng theo trạm',
            id: 'Wazuh-App-Overview-vuls-agents-severities',
            width: 50
          }
        ]
      },
    ]
  },
  virustotal: {
    rows: [
      {
        height: 360,
        vis: [
          {
            title: 'Các tệp độc hại riêng biệt trên mỗi trạm',
            id: 'Wazuh-App-Overview-Virustotal-Malicious-Per-Agent',
            width: 50
          },
          {
            title: 'Các tệp quét cuối',
            id: 'Wazuh-App-Overview-Virustotal-Last-Files-Pie',
            width: 50
          }
        ]
      },
      {
        height: 550,
        vis: [
          {
            title: 'Chuyển hóa cảnh báo theo trạm',
            id: 'Wazuh-App-Overview-Virustotal-Alerts-Evolution'
          }
        ]
      },
      {
        height: 250,
        vis: [
          {
            title: 'Chuyển hóa cảnh báo các tệp độc hại',
            id: 'Wazuh-App-Overview-Virustotal-Malicious-Evolution'
          }
        ]
      },
      {
        height: 570,
        vis: [
          {
            title: 'Tệp cuối',
            id: 'Wazuh-App-Overview-Virustotal-Files-Table'
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
            title: 'Top 5 sự kiện Osquery được thêm',
            id: 'Wazuh-App-Overview-Osquery-Top-5-added',
            width: 25
          },
          {
            title: 'Top 5 sự kiện Osquery bị xóa',
            id: 'Wazuh-App-Overview-Osquery-Top-5-removed',
            width: 25
          },
          {
            title: 'Sự chuyển hóa của các sự kiện Osquery theo từng gói theo thời gian',
            id: 'Wazuh-App-Agents-Osquery-Evolution',
            width: 50
          }
        ]
      },
      {
        height: 300,
        vis: [
          {
            title: 'Các gói phổ biến nhất',
            id: 'Wazuh-App-Overview-Osquery-Most-common-packs',
            width: 30
          },
          {
            title: 'Top 5 rules',
            id: 'Wazuh-App-Overview-Osquery-Top-5-rules',
            width: 70
          }
        ]
      },
    ]
  },
  mitre: {
    rows: [
      {
        height: 360,
        vis: [
          {
            title: 'Chuyển hóa cảnh báo theo thời gian',
            id: 'Wazuh-App-Overview-MITRE-Alerts-Evolution',
            width: 75
          },
          {
            title: 'Top chiến thuật',
            id: 'Wazuh-App-Overview-MITRE-Top-Tactics',
            width: 25
          }
        ]
      },
      {
        height: 360,
        vis: [
          {
            title: 'Tấn công theo kỹ thuật',
            id: 'Wazuh-App-Overview-MITRE-Attacks-By-Technique',
            width: 33
          },
          {
            title: 'Top chiến thuật theo trạm',
            id: 'Wazuh-App-Overview-MITRE-Top-Tactics-By-Agent',
            width: 34
          },
          {
            title: 'Kỹ thuật MITRE theo trạm',
            id: 'Wazuh-App-Overview-MITRE-Attacks-By-Agent',
            width: 33
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
            id: 'Wazuh-App-Overview-Docker-top-5-images',
            width: 25
          },
          {
            title: 'Top 5 sự kiện hàng đầu',
            id: 'Wazuh-App-Overview-Docker-top-5-actions',
            width: 25
          },
          {
            title: 'Sử dụng tài nguyên theo thời gian',
            id: 'Wazuh-App-Overview-Docker-Types-over-time',
            width: 50
          }
        ]
      },
      {
        height: 300,
        vis: [
          {
            title: 'Chuyển hóa giữa các sự kiện',
            id: 'Wazuh-App-Overview-Docker-Actions-over-time'
          }
        ]
      },
    ]
  },
  oscap: {
    rows: [
      {
        height: 215,
        vis: [
          {
            title: 'Top 5 trạm',
            id: 'Wazuh-App-Overview-OSCAP-Agents',
            width: 25
          },
          {
            title: 'Top 5 hồ sơ',
            id: 'Wazuh-App-Overview-OSCAP-Profiles',
            width: 25
          },
          {
            title: 'Top 5 nội dung',
            id: 'Wazuh-App-Overview-OSCAP-Content',
            width: 25
          },
          {
            title: 'Top 5 mức độ nghiêm trọng',
            id: 'Wazuh-App-Overview-OSCAP-Severity',
            width: 25
          }
        ]
      },
      {
        height: 240,
        vis: [
          {
            title: 'Top 5 trạm - mức độ nghiêm trọng cao',
            id: 'Wazuh-App-Overview-OSCAP-Top-5-agents-Severity-high'
          }
        ]
      },
      {
        height: 320,
        vis: [
          {
            title: 'Top 10 - Cảnh báo',
            id: 'Wazuh-App-Overview-OSCAP-Top-10-alerts',
            width: 50
          },
          {
            title: 'Top 10 - Cảnh báo rủi ro cao',
            id: 'Wazuh-App-Overview-OSCAP-Top-10-high-risk-alerts',
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
            id: 'Wazuh-app-Overview-CISCAT-top-5-groups',
            width: 60
          },
          {
            title: 'Chuyển hóa kết quả quét',
            id: 'Wazuh-app-Overview-CISCAT-scan-result-evolution',
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
            title: 'Sự kiện theo thời gian',
            id: 'Wazuh-App-Overview-PM-Events-over-time',
            width: 50
          },
          {
            title: 'Phân phối rule',
            id: 'Wazuh-App-Overview-PM-Top-5-rules',
            width: 25
          },
          {
            title: 'Top 5 trạm hàng đầu',
            id: 'Wazuh-App-Overview-PM-Top-5-agents-pie',
            width: 25
          }
        ]
      },
      {
        height: 240,
        vis: [
          {
            title: 'Chuyển hóa sự kiện theo loại kiểm soát',
            id: 'Wazuh-App-Overview-PM-Events-per-agent-evolution'
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
            id: 'Wazuh-App-Overview-Audit-Groups',
            width: 25
          },
          {
            title: 'Các trạm',
            id: 'Wazuh-App-Overview-Audit-Agents',
            width: 25
          },
          {
            title: 'Các lệnh',
            id: 'Wazuh-App-Overview-Audit-Commands',
            width: 25
          },
          {
            title: 'Các tệp',
            id: 'Wazuh-App-Overview-Audit-Files',
            width: 25
          }
        ]
      },
      {
        height: 310,
        vis: [
          {
            title: 'Cảnh báo theo thời gian',
            id: 'Wazuh-App-Overview-Audit-Alerts-over-time'
          }
        ]
      },
    ]
  },
  github: {
    rows: [
      {
        height: 360,
        vis: [
          {
            title: 'Chuyển hóa cảnh báo theo tổ chức',
            id: 'Wazuh-App-Overview-GitHub-Alerts-Evolution-By-Organization',
            width: 60
          },
          {
            title: 'Top 5 tổ chức theo cảnh báo',
            id: 'Wazuh-App-Overview-GitHub-Top-5-Organizations-By-Alerts',
            width: 40
          }
        ]
      },
      {
        height: 360,
        vis: [
          {
            title: 'Top cảnh báo theo loại hành động và tổ chức',
            id: 'Wazuh-App-Overview-GitHub-Alert-Action-Type-By-Organization',
            width: 40
          },
          {
            title: 'Người dùng có nhiều cảnh báo hơn',
            id: 'Wazuh-App-Overview-GitHub-Users-With-More-Alerts',
            width: 60
          }
        ]
      },
    ]
  },
};
