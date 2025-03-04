import { WzRequest } from '../../../../../../react-services/wz-request';

const rulesItems = [
  {
    type: 'params',
    label: 'status',
    description: 'Lọc rule theo trạng thái',
    values: ['enabled', 'disabled']
  },
  {
    type: 'params',
    label: 'group',
    description: 'Lọc rule theo nhóm',
    values: async value => {
      const filter = { limit: 30 };
      if (value) {
        filter['search'] = value;
      }
      const result = await WzRequest.apiReq('GET', '/rules/groups', filter);
      return result?.data?.data?.affected_items;
    },
  },
  {
    type: 'params',
    label: 'level',
    description: 'Lọc rule theo mức độ',
    values: [...Array(16).keys()]
  },
  {
    type: 'params',
    label: 'filename',
    description: 'Lọc rule theo tên tệp',
    values: async value => {
      const filter = { limit: 30 };
      if (value) {
        filter['search'] = value;
      }
      const result = await WzRequest.apiReq('GET', '/rules/files', filter);
      return result?.data?.data?.affected_items?.map((item) => { return item.filename });
    },
  },
  {
    type: 'params',
    label: 'relative_dirname',
    description: 'Đường dẫn các tệp rule',
    values: async () => {
      const result = await WzRequest.apiReq('GET', '/manager/configuration', {
        params: {
          section: 'ruleset',
          field: 'rule_dir'
        }
      });
      return result?.data?.data?.affected_items?.[0].ruleset.rule_dir;
    }
  },
  {
    type: 'params',
    label: 'hipaa',
    description: 'Lọc rule theo yêu cầu HIPAA',
    values: async () => {
      const result = await WzRequest.apiReq('GET', '/rules/requirement/hipaa', {});
      return result?.data?.data?.affected_items;
    }
  },
  {
    type: 'params',
    label: 'gdpr',
    description: 'Lọc rule theo yêu cầu GDPR',
    values: async () => {
      const result = await WzRequest.apiReq('GET', '/rules/requirement/gdpr', {});
      return result?.data?.data?.affected_items;
    }
  },
  {
    type: 'params',
    label: 'nist-800-53',
    description: 'Lọc rule theo yêu cầu NIST',
    values: async () => {
      const result = await WzRequest.apiReq('GET', '/rules/requirement/nist-800-53', {});
      return result?.data?.data?.affected_items;
    }
  },
  {
    type: 'params',
    label: 'gpg13',
    description: 'Lọc rule theo yêu cầu GPG',
    values: async () => {
      const result = await WzRequest.apiReq('GET', '/rules/requirement/gpg13', {});
      return result?.data?.data?.affected_items;
    }
  },
  {
    type: 'params',
    label: 'pci_dss',
    description: 'Lọc rule theo yêu cầu PCI DSS',
    values: async () => {
      const result = await WzRequest.apiReq('GET', '/rules/requirement/pci_dss', {});
      return result?.data?.data?.affected_items;
    }
  },
  {
    type: 'params',
    label: 'tsc',
    description: 'Lọc rule theo yêu cầu TSC',
    values: async () => {
      const result = await WzRequest.apiReq('GET', '/rules/requirement/tsc', {});
      return result?.data?.data?.affected_items;
    }
  },
  {
    type: 'params',
    label: 'mitre',
    description: 'Lọc rule theo yêu cầu MITRE',
    values: async () => {
      const result = await WzRequest.apiReq('GET', '/rules/requirement/mitre', {});
      return result?.data?.data?.affected_items;
    }
  }
];
const rulesFiles = [
  {
    type: 'params',
    label: 'filename',
    description: 'Lọc rule theo tên tệp',
    values: async value => {
      const filter = { limit: 30 };
      if (value) {
        filter['search'] = value;
      }
      const result = await WzRequest.apiReq('GET', '/rules/files', filter);
      return result?.data?.data?.affected_items?.map((item) => { return item.filename });
    },
  },
];

const apiSuggestsItems = {
  items: rulesItems,
  files: rulesFiles,
};

export default apiSuggestsItems;
