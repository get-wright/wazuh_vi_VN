import { WAZUH_MODULES_ID } from '../../../../../common/constants';

export const getAgentSections = (menuAgent) => {
  return {
    securityInformation: {
      id: 'securityInformation',
      text: 'Quản lý thông tin bảo mật',
      isTitle: true,
    },
    auditing: {
      id: 'auditing',
      text: 'Kiểm toán và Giám sát Chính sách',
      isTitle: true,
    },
    threatDetection: {
      id: 'threatDetection',
      text: 'Phát hiện mối đe dọa và ứng phó',
      isTitle: true,
    },
    regulatoryCompliance: {
      id: 'regulatoryCompliance',
      text: 'Tuân thủ quy định',
      isTitle: true,
    },
    general: {
      id: WAZUH_MODULES_ID.SECURITY_EVENTS,
      text: 'Sự kiện bảo mật',
      isPin: menuAgent.general ? menuAgent.general : false,
    },
    fim: {
      id: WAZUH_MODULES_ID.INTEGRITY_MONITORING,
      text: 'Giám sát tính toàn vẹn',
      isPin: menuAgent.fim ? menuAgent.fim : false,
    },
    aws: {
      id: WAZUH_MODULES_ID.AMAZON_WEB_SERVICES,
      text: 'Amazon AWS',
      isPin: menuAgent.aws ? menuAgent.aws : false,
    },
    gcp: {
      id: WAZUH_MODULES_ID.GOOGLE_CLOUD_PLATFORM,
      text: 'Nền tảng đám mây Google (GCP)',
      isPin: menuAgent.gcp ? menuAgent.gcp : false,
    },
    github: {
      id: WAZUH_MODULES_ID.GITHUB,
      text: 'GitHub',
      isPin: menuAgent.github ? menuAgent.github : false
    },
    pm: {
      id: WAZUH_MODULES_ID.POLICY_MONITORING,
      text: 'Giám sát Chính sách',
      isPin: menuAgent.pm ? menuAgent.pm : false,
    },
    sca: {
      id: WAZUH_MODULES_ID.SECURITY_CONFIGURATION_ASSESSMENT,
      text: 'Đánh giá cấu hình bảo mật',
      isPin: menuAgent.sca ? menuAgent.sca : false,
    },
    audit: {
      id: WAZUH_MODULES_ID.AUDITING,
      text: 'Kiểm toán hệ thống',
      isPin: menuAgent.audit ? menuAgent.audit : false,
    },
    oscap: {
      id: WAZUH_MODULES_ID.OPEN_SCAP,
      text: 'OpenSCAP',
      isPin: menuAgent.oscap ? menuAgent.oscap : false,
    },
    ciscat: {
      id: WAZUH_MODULES_ID.CIS_CAT,
      text: 'CIS-CAT',
      isPin: menuAgent.oscap ? menuAgent.oscap : false,
    },
    vuls: {
      id: WAZUH_MODULES_ID.VULNERABILITIES,
      text: 'Lỗ hổng bảo mật',
      isPin: menuAgent.vuls ? menuAgent.vuls : false,
    },
    virustotal: {
      id: WAZUH_MODULES_ID.VIRUSTOTAL,
      text: 'VirusTotal',
      isPin: menuAgent.virustotal ? menuAgent.virustotal : false,
    },
    osquery: {
      id: WAZUH_MODULES_ID.OSQUERY,
      text: 'Osquery',
      isPin: menuAgent.osquery ? menuAgent.osquery : false,
    },
    docker: {
      id: WAZUH_MODULES_ID.DOCKER,
      text: 'Trình theo dõi Docker',
      isPin: menuAgent.docker ? menuAgent.docker : false,
    },
    mitre: {
      id: WAZUH_MODULES_ID.MITRE_ATTACK,
      text: 'MITRE ATT&CK',
      isPin: menuAgent.mitre ? menuAgent.mitre : false,
    },
    pci: {
      id: WAZUH_MODULES_ID.PCI_DSS,
      text: 'PCI DSS',
      isPin: menuAgent.pci ? menuAgent.pci : false,
    },
    gdpr: {
      id: WAZUH_MODULES_ID.GDPR,
      text: 'GDPR',
      isPin: menuAgent.gdpr ? menuAgent.gdpr : false,
    },
    hipaa: {
      id: WAZUH_MODULES_ID.HIPAA,
      text: 'HIPAA',
      isPin: menuAgent.hipaa ? menuAgent.hipaa : false,
    },
    nist: {
      id: WAZUH_MODULES_ID.NIST_800_53,
      text: 'NIST 800-53',
      isPin: menuAgent.nist ? menuAgent.nist : false,
    },
    tsc: {
      id: WAZUH_MODULES_ID.TSC,
      text: 'TSC',
      isPin: menuAgent.tsc ? menuAgent.tsc : false
    },
  };
};
