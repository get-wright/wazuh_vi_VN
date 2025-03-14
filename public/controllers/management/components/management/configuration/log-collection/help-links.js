/*
 * Wazuh app - Help links of log collection configuration.
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import { webDocumentationLink } from "../../../../../../../common/services/web_documentation";

export default [
  {
    text: 'Tài liệu thu thập dữ liệu log',
    href: webDocumentationLink('user-manual/capabilities/log-data-collection/index.html')
  },
  {
    text: 'Tham khảo Localfile',
    href: webDocumentationLink('user-manual/reference/ossec-conf/localfile.html')
  }
];
