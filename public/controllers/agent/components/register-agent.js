/*
 * Wazuh app - React component for registering agents.
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import React, { Component, Fragment } from 'react';
import { version } from '../../../../package.json';
import { WazuhConfig } from '../../../react-services/wazuh-config';
import {
  EuiSteps,
  EuiTabbedContent,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiComboBox,
  EuiFieldText,
  EuiText,
  EuiCodeBlock,
  EuiTitle,
  EuiButtonEmpty,
  EuiCopy,
  EuiPage,
  EuiPageBody,
  EuiCallOut,
  EuiSpacer,
  EuiProgress,
  EuiIcon,
  EuiSwitch,
  EuiLink,
  EuiFormRow,
  EuiForm,
} from '@elastic/eui';
import { WzRequest } from '../../../react-services/wz-request';
import { withErrorBoundary } from '../../../components/common/hocs';
import { UI_LOGGER_LEVELS } from '../../../../common/constants';
import { UI_ERROR_SEVERITIES } from '../../../react-services/error-orchestrator/types';
import { getErrorOrchestrator } from '../../../react-services/common-services';
import { webDocumentationLink } from '../../../../common/services/web_documentation';
import {
  architectureButtons,
  architectureButtonsi386,
  architecturei386Andx86_64,
  versionButtonsRaspbian,
  versionButtonsSuse,
  versionButtonsOracleLinux,
  versionButtonFedora,
  architectureButtonsSolaris,
  architectureButtonsWithPPC64LE,
  architectureButtonsAix,
  architectureButtonsHpUx,
  versionButtonAmazonLinux,
  versionButtonsRedHat,
  versionButtonsCentos,
  architectureButtonsMacos,
  osPrincipalButtons,
  versionButtonsDebian,
  versionButtonsUbuntu,
  versionButtonsWindows,
  versionButtonsMacOS,
  versionButtonsOpenSuse,
  versionButtonsSolaris,
  versionButtonsAix,
  versionButtonsHPUX,
  versionButtonAlpine,
  architectureButtonsWithPPC64LEAlpine,
} from '../wazuh-config';
import WzManagerAddressInput from '../register-agent/steps/wz-manager-address';
import { getMasterRemoteConfiguration } from './register-agent-service';
import './register-agent.scss';
import { PrincipalButtonGroup } from './wz-accordion';
import RegisterAgentButtonGroup from '../register-agent/register-agent-button-group';
import '../../../styles/common.scss';

export const RegisterAgent = withErrorBoundary(
  class RegisterAgent extends Component {
    constructor(props) {
      super(props);
      this.wazuhConfig = new WazuhConfig();
      this.configuration = this.wazuhConfig.getConfig();
      this.addToVersion = '-1';

      this.state = {
        status: 'incomplete',
        selectedOS: '',
        selectedSYS: '',
        neededSYS: false,
        selectedArchitecture: '',
        selectedVersion: '',
        version: '',
        wazuhVersion: '',
        serverAddress: '',
        agentName: '',
        wazuhPassword: '',
        groups: [],
        selectedGroup: [],
        agentNameError: false,
        badCharacters: [],
        defaultServerAddress: '',
        udpProtocol: false,
        showPassword: false,
        showProtocol: true,
        connectionSecure: true,
        isAccordionOpen: false,
      };
      this.restartAgentCommand = {
        rpm: this.systemSelector(),
        cent: this.systemSelector(),
        deb: this.systemSelector(),
        ubu: this.systemSelector(),
        oraclelinux: this.systemSelector(),
        macos: this.systemSelectorWazuhControlMacos(),
        win: this.systemSelectorNet(),
      };
    }

    async componentDidMount() {
      try {
        this.setState({ loading: true });
        const wazuhVersion = await this.props.getWazuhVersion();
        let wazuhPassword = '';
        let hidePasswordInput = false;
        this.getEnrollDNSConfig();
        await this.getRemoteConfig();
        let authInfo = await this.getAuthInfo();
        const needsPassword = (authInfo.auth || {}).use_password === 'yes';
        if (needsPassword) {
          wazuhPassword =
            this.configuration['enrollment.password'] ||
            authInfo['authd.pass'] ||
            '';
          if (wazuhPassword) {
            hidePasswordInput = true;
          }
        }
        const groups = await this.getGroups();
        this.setState({
          needsPassword,
          hidePasswordInput,
          versionButtonsRedHat,
          versionButtonsCentos,
          versionButtonsDebian,
          versionButtonsUbuntu,
          versionButtonsWindows,
          versionButtonsMacOS,
          versionButtonsOpenSuse,
          versionButtonsSolaris,
          versionButtonAmazonLinux,
          versionButtonsSuse,
          versionButtonsAix,
          versionButtonsHPUX,
          versionButtonsOracleLinux,
          versionButtonsRaspbian,
          versionButtonFedora,
          architectureButtons,
          architectureButtonsi386,
          architecturei386Andx86_64,
          architectureButtonsSolaris,
          architectureButtonsAix,
          architectureButtonsHpUx,
          architectureButtonsMacos,
          architectureButtonsWithPPC64LE,
          wazuhPassword,
          wazuhVersion,
          groups,
          loading: false,
        });
      } catch (error) {
        this.setState({
          wazuhVersion: version,
          loading: false,
        });
        const options = {
          context: `${RegisterAgent.name}.componentDidMount`,
          level: UI_LOGGER_LEVELS.ERROR,
          severity: UI_ERROR_SEVERITIES.BUSINESS,
          display: true,
          store: false,
          error: {
            error: error,
            message: error.message || error,
            title: error.name || error,
          },
        };
        getErrorOrchestrator().handleError(options);
      }
    }

    getEnrollDNSConfig = () => {
      const serverAddress = this.configuration['enrollment.dns'] || '';
      this.setState({ defaultServerAddress: serverAddress });
    };

    getRemoteConfig = async () => {
      const remoteConfig = await getMasterRemoteConfiguration();
      if (remoteConfig) {
        this.setState({
          haveUdpProtocol: remoteConfig.isUdp,
          haveConnectionSecure: remoteConfig.haveSecureConnection,
          udpProtocol: remoteConfig.isUdp,
          connectionSecure: remoteConfig.haveSecureConnection,
        });
      }
    };

    async getAuthInfo() {
      try {
        const result = await WzRequest.apiReq(
          'GET',
          '/agents/000/config/auth/auth',
          {},
        );
        return (result.data || {}).data || {};
      } catch (error) {
        this.setState({ gotErrorRegistrationServiceInfo: true });
        throw new Error(error);
      }
    }

    selectOS(os) {
      this.setState({
        selectedOS: os,
        selectedVersion: '',
        selectedArchitecture: '',
        selectedSYS: '',
      });
    }

    systemSelector() {
      if (
        this.state.selectedVersion === 'redhat7' ||
        this.state.selectedVersion === 'amazonlinux2022' ||
        this.state.selectedVersion === 'centos7' ||
        this.state.selectedVersion === 'suse11' ||
        this.state.selectedVersion === 'suse12' ||
        this.state.selectedVersion === 'oraclelinux5' ||
        this.state.selectedVersion === 'oraclelinux6' ||
        this.state.selectedVersion === '22' ||
        this.state.selectedVersion === 'amazonlinux2' ||
        this.state.selectedVersion === 'debian8' ||
        this.state.selectedVersion === 'debian9' ||
        this.state.selectedVersion === 'debian10' ||
        this.state.selectedVersion === 'busterorgreater' ||
        this.state.selectedVersion === 'ubuntu15' ||
        this.state.selectedVersion === 'leap15'
      ) {
        return 'sudo systemctl daemon-reload\nsudo systemctl enable wazuh-agent\nsudo systemctl start wazuh-agent';
      } else if (
        this.state.selectedVersion === 'redhat5' ||
        this.state.selectedVersion === 'redhat6' ||
        this.state.selectedVersion === 'centos5' ||
        this.state.selectedVersion === 'centos6' ||
        this.state.selectedVersion === 'amazonlinux1' ||
        this.state.selectedVersion === 'debian7' ||
        this.state.selectedVersion === 'ubuntu14'
      ) {
        return 'service wazuh-agent start';
      } else {
        return '';
      }
    }

    systemSelectorNet() {
      if (
        this.state.selectedVersion === 'windowsxp' ||
        this.state.selectedVersion === 'windowsserver2008' ||
        this.state.selectedVersion === 'windows7'
      ) {
        return 'NET START Wazuh';
      } else {
        return '';
      }
    }

    systemSelectorWazuhControlMacos() {
      if (this.state.selectedVersion == 'sierra') {
        return 'sudo /Library/Ossec/bin/wazuh-control start';
      } else {
        return '';
      }
    }

    systemSelectorWazuhControl() {
      if (
        this.state.selectedVersion === 'solaris10' ||
        this.state.selectedVersion === 'solaris11' ||
        this.state.selectedVersion === '6.1 TL9' ||
        this.state.selectedVersion === '3.12.12'
      ) {
        return '/var/ossec/bin/wazuh-control start';
      } else {
        return '';
      }
    }

    systemSelectorInitD() {
      if (this.state.selectedVersion === '11.31') {
        return '/sbin/init.d/wazuh-agent start';
      } else {
        return '';
      }
    }

    selectSYS(sys) {
      this.setState({ selectedSYS: sys });
    }

    setServerAddress(serverAddress) {
      this.setState({ serverAddress });
    }

    setAgentName(event) {
      const validation = /^[a-z0-9-_.]+$/i;
      if (
        (validation.test(event.target.value) &&
          event.target.value.length >= 2) ||
        event.target.value.length <= 0
      ) {
        this.setState({
          agentName: event.target.value,
          agentNameError: false,
          badCharacters: [],
        });
      } else {
        let badCharacters = event.target.value
          .split('')
          .map(char => char.replace(validation, ''))
          .join('');
        badCharacters = badCharacters
          .split('')
          .map(char => char.replace(/\s/, 'whitespace'));
        const characters = [...new Set(badCharacters)];
        this.setState({
          agentName: event.target.value,
          badCharacters: characters,
          agentNameError: true,
        });
      }
    }

    setGroupName(selectedGroup) {
      this.setState({ selectedGroup });
    }

    setArchitecture(selectedArchitecture) {
      this.setState({ selectedArchitecture });
    }

    setVersion(selectedVersion) {
      this.setState({ selectedVersion, selectedArchitecture: '' });
    }

    setWazuhPassword(event) {
      this.setState({ wazuhPassword: event.target.value });
    }

    setShowPassword(event) {
      this.setState({ showPassword: event.target.checked });
    }

    obfuscatePassword(text) {
      let obfuscate = '';
      const regex = /WAZUH_REGISTRATION_PASSWORD=?\040?\'(.*?)\'[\"| ]/gm;
      const match = regex.exec(text);
      const password = match[1];
      if (password) {
        [...password].forEach(() => (obfuscate += '*'));
        text = text.replace(password, obfuscate);
      }
      return text;
    }

    async getGroups() {
      try {
        const result = await WzRequest.apiReq('GET', '/groups', {});
        return result.data.data.affected_items.map(item => ({
          label: item.name,
          id: item.name,
        }));
      } catch (error) {
        throw new Error(error);
      }
    }

    optionalDeploymentVariables() {
      const escapeQuotes = value => value.replace(/'/g, "\\'");
      let deployment =
        this.state.serverAddress &&
        `WAZUH_MANAGER='${escapeQuotes(this.state.serverAddress)}' `;
      if (this.state.selectedOS == 'win') {
        deployment += `WAZUH_REGISTRATION_SERVER='${escapeQuotes(
          this.state.serverAddress,
        )}' `;
      }

      if (this.state.needsPassword) {
        deployment += `WAZUH_REGISTRATION_PASSWORD='${escapeQuotes(
          this.state.wazuhPassword,
        )}' `;
      }

      if (this.state.udpProtocol) {
        deployment += "WAZUH_PROTOCOL='UDP' ";
      }

      if (this.state.selectedGroup.length) {
        deployment += `WAZUH_AGENT_GROUP='${this.state.selectedGroup
          .map(item => item.label)
          .join(',')}' `;
      }

      return deployment;
    }

    agentNameVariable() {
      let agentName = `WAZUH_AGENT_NAME='${this.state.agentName}' `;
      if (this.state.selectedArchitecture && this.state.agentName !== '') {
        return agentName;
      } else {
        return '';
      }
    }

    resolveRPMPackage() {
      switch (
        `${this.state.selectedVersion}-${this.state.selectedArchitecture}`
      ) {
        case 'redhat5-i386':
          return `https://packages.wazuh.com/4.x/yum5/i386/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.el5.i386.rpm`;
        case 'redhat5-x86_64':
          return `https://packages.wazuh.com/4.x/yum5/x86_64/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.el5.x86_64.rpm`;
        case 'redhat6-i386':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.i386.rpm`;
        case 'redhat6-aarch64':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.aarch64.rpm`;
        case 'redhat6-x86_64':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.x86_64.rpm`;
        case 'redhat6-armhf':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.armv7hl.rpm`;
        case 'redhat7-i386':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.i386.rpm`;
        case 'redhat7-aarch64':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.aarch64.rpm`;
        case 'redhat7-x86_64':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.x86_64.rpm`;
        case 'redhat7-armhf':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.armv7hl.rpm`;
        case 'redhat7-powerpc':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.ppc64le.rpm`;
        default:
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.x86_64.rpm`;
      }
    }

    resolveAlpinePackage() {
      switch (
        `${this.state.selectedVersion}-${this.state.selectedArchitecture}`
      ) {
        case '3.12.12-i386':
          return 'https://packages.wazuh.com/key/alpine-devel%40wazuh.com-633d7457.rsa.pub && echo "https://packages.wazuh.com/4.x/alpine/v3.12/main"';
        case '3.12.12-aarch64':
          return 'https://packages.wazuh.com/key/alpine-devel%40wazuh.com-633d7457.rsa.pub && echo "https://packages.wazuh.com/4.x/alpine/v3.12/main"';
        case '3.12.12-x86_64':
          return 'https://packages.wazuh.com/key/alpine-devel%40wazuh.com-633d7457.rsa.pub && echo "https://packages.wazuh.com/4.x/alpine/v3.12/main"';
        case '3.12.12-x86':
          return 'https://packages.wazuh.com/key/alpine-devel%40wazuh.com-633d7457.rsa.pub && echo "https://packages.wazuh.com/4.x/alpine/v3.12/main"';
        case '3.12.12-armhf':
          return 'https://packages.wazuh.com/key/alpine-devel%40wazuh.com-633d7457.rsa.pub && echo "https://packages.wazuh.com/4.x/alpine/v3.12/main"';
        case '3.12.12-powerpc':
          return 'https://packages.wazuh.com/key/alpine-devel%40wazuh.com-633d7457.rsa.pub && echo "https://packages.wazuh.com/4.x/alpine/v3.12/main"';
        default:
          return 'https://packages.wazuh.com/key/alpine-devel%40wazuh.com-633d7457.rsa.pub && echo "https://packages.wazuh.com/4.x/alpine/v3.12/main"';
      }
    }

    resolveORACLELINUXPackage() {
      switch (
        `${this.state.selectedVersion}-${this.state.selectedArchitecture}`
      ) {
        case 'oraclelinux5-i386':
          return `https://packages.wazuh.com/4.x/yum5/i386/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.el5.i386.rpm`;
        case 'oraclelinux5-x86_64':
          return `https://packages.wazuh.com/4.x/yum5/x86_64/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.el5.x86_64.rpm`;
        case 'oraclelinux6-i386':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.i386.rpm`;
        case 'oraclelinux6-aarch64':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.aarch64.rpm`;
        case 'oraclelinux6-x86_64':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.x86_64.rpm`;
        case 'oraclelinux6-armhf':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.armv7hl.rpm`;
        default:
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.x86_64.rpm`;
      }
    }

    resolveCENTPackage() {
      switch (
        `${this.state.selectedVersion}-${this.state.selectedArchitecture}`
      ) {
        case 'centos5-i386':
          return `https://packages.wazuh.com/4.x/yum5/i386/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.el5.i386.rpm`;
        case 'centos5-x86_64':
          return `https://packages.wazuh.com/4.x/yum5/x86_64/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.el5.x86_64.rpm`;
        case 'centos6-i386':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.i386.rpm`;
        case 'centos6-aarch64':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.aarch64.rpm`;
        case 'centos6-x86_64':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.x86_64.rpm`;
        case 'centos6-armhf':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.armv7hl.rpm`;
        case 'centos7-i386':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.i386.rpm`;
        case 'centos7-aarch64':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.aarch64.rpm`;
        case 'centos7-x86_64':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.x86_64.rpm`;
        case 'centos7-armhf':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.armv7hl.rpm`;
        case 'centos7-powerpc':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.ppc64le.rpm`;
        default:
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.x86_64.rpm`;
      }
    }

    resolveSUSEPackage() {
      switch (
        `${this.state.selectedVersion}-${this.state.selectedArchitecture}`
      ) {
        case 'suse11-i386':
          return `https://packages.wazuh.com/4.x/yum5/i386/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.el5.i386.rpm`;
        case 'suse11-x86_64':
          return `https://packages.wazuh.com/4.x/yum5/x86_64/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.el5.x86_64.rpm`;
        case 'suse12-i386':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.i386.rpm`;
        case 'suse12-aarch64':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.aarch64.rpm`;
        case 'suse12-x86_64':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.x86_64.rpm`;
        case 'suse12-armhf':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.armv7hl.rpm`;
        case 'suse12-powerpc':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.ppc64le.rpm`;
        default:
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.x86_64.rpm`;
      }
    }

    resolveFEDORAPachage() {
      switch (
        `${this.state.selectedVersion}-${this.state.selectedArchitecture}`
      ) {
        case '22-i386':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.i386.rpm`;
        case '22-aarch64':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.aarch64.rpm`;
        case '22-x86_64':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.x86_64.rpm`;
        case '22-armhf':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.armv7hl.rpm`;
        case '22-powerpc':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.ppc64le.rpm`;
        default:
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.x86_64.rpm`;
      }
    }

    resolveAMAZONLPackage() {
      switch (
        `${this.state.selectedVersion}-${this.state.selectedArchitecture}`
      ) {
        case 'amazonlinux1-i386':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.i386.rpm`;
        case 'amazonlinux1-aarch64':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.aarch64.rpm`;
        case 'amazonlinux1-x86_64':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.x86_64.rpm`;
        case 'amazonlinux1-armhf':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.armv7hl.rpm`;
        case 'amazonlinux2-i386':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.i386.rpm`;
        case 'amazonlinux2-aarch64':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.aarch64.rpm`;
        case 'amazonlinux2-x86_64':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.x86_64.rpm`;
        case 'amazonlinux2-armhf':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.armv7hl.rpm`;
        case 'amazonlinux2022-i386':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.i386.rpm`;
        case 'amazonlinux2022-aarch64':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.aarch64.rpm`;
        case 'amazonlinux2022-x86_64':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.x86_64.rpm`;
        case 'amazonlinux2022-armhf':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.armv7hl.rpm`;
        default:
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.x86_64.rpm`;
      }
    }

    resolveDEBPackage() {
      switch (`${this.state.selectedArchitecture}`) {
        case 'i386':
          return `https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_${this.state.wazuhVersion}${this.addToVersion}_i386.deb`;
        case 'aarch64':
          return `https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_${this.state.wazuhVersion}${this.addToVersion}_arm64.deb`;
        case 'armhf':
          return `https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_${this.state.wazuhVersion}${this.addToVersion}_armhf.deb`;
        case 'x86_64':
          return `https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_${this.state.wazuhVersion}${this.addToVersion}_amd64.deb`;
        case 'powerpc':
          return `https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_${this.state.wazuhVersion}${this.addToVersion}_ppc64el.deb`;
        default:
          return `https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_${this.state.wazuhVersion}${this.addToVersion}_amd64.deb`;
      }
    }

    resolveRASPBIANPackage() {
      switch (
        `${this.state.selectedVersion}-${this.state.selectedArchitecture}`
      ) {
        case 'busterorgreater-i386':
          return `https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_${this.state.wazuhVersion}${this.addToVersion}_i386.deb`;
        case 'busterorgreater-aarch64':
          return `https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_${this.state.wazuhVersion}${this.addToVersion}_arm64.deb`;
        case 'busterorgreater-armhf':
          return `https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_${this.state.wazuhVersion}${this.addToVersion}_armhf.deb`;
        case 'busterorgreater-x86_64':
          return `https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_${this.state.wazuhVersion}${this.addToVersion}_amd64.deb`;
        case 'busterorgreater-powerpc':
          return `https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_${this.state.wazuhVersion}${this.addToVersion}_ppc64el.deb`;
        default:
          return `https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_${this.state.wazuhVersion}${this.addToVersion}_amd64.deb`;
      }
    }

    resolveUBUNTUPackage() {
      switch (
        `${this.state.selectedVersion}-${this.state.selectedArchitecture}`
      ) {
        case 'ubuntu14-i386':
          return `https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_${this.state.wazuhVersion}${this.addToVersion}_i386.deb`;
        case 'ubuntu14-aarch64':
          return `https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_${this.state.wazuhVersion}${this.addToVersion}_arm64.deb`;
        case 'ubuntu14-armhf':
          return `https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_${this.state.wazuhVersion}${this.addToVersion}_armhf.deb`;
        case 'ubuntu14-x86_64':
          return `https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_${this.state.wazuhVersion}${this.addToVersion}_amd64.deb`;
        case 'ubuntu15-i386':
          return `https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_${this.state.wazuhVersion}${this.addToVersion}_i386.deb`;
        case 'ubuntu15-aarch64':
          return `https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_${this.state.wazuhVersion}${this.addToVersion}_arm64.deb`;
        case 'ubuntu15-armhf':
          return `https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_${this.state.wazuhVersion}${this.addToVersion}_armhf.deb`;
        case 'ubuntu15-x86_64':
          return `https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_${this.state.wazuhVersion}${this.addToVersion}_amd64.deb`;
        default:
          return `https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_${this.state.wazuhVersion}${this.addToVersion}_amd64.deb`;
      }
    }

    resolveOPENSUSEPackage() {
      switch (
        `${this.state.selectedVersion}-${this.state.selectedArchitecture}`
      ) {
        case 'leap15-i386':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.i386.rpm`;
        case 'leap15-aarch64':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.aarch64.rpm`;
        case 'leap15-x86_64':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.x86_64.rpm`;
        case 'leap15-armhf':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.armv7hl.rpm`;
        case 'leap15-powerpc':
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.ppc64le.rpm`;
        default:
          return `https://packages.wazuh.com/4.x/yum/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.x86_64.rpm`;
      }
    }

    resolveSOLARISPackage() {
      switch (
        `${this.state.selectedVersion}-${this.state.selectedArchitecture}`
      ) {
        case 'solaris10-i386':
          return `https://packages.wazuh.com/4.x/solaris/i386/10/wazuh-agent_v${this.state.wazuhVersion}-sol10-i386.pkg`;
        case 'solaris10-sparc':
          return `https://packages.wazuh.com/4.x/solaris/sparc/10/wazuh-agent_v${this.state.wazuhVersion}-sol10-sparc.pkg`;
        case 'solaris11-i386':
          return `https://packages.wazuh.com/4.x/solaris/i386/11/wazuh-agent_v${this.state.wazuhVersion}-sol11-i386.p5p`;
        case 'solaris11-sparc':
          return `https://packages.wazuh.com/4.x/solaris/sparc/11/wazuh-agent_v${this.state.wazuhVersion}-sol11-sparc.p5p`;
        default:
          return `https://packages.wazuh.com/4.x/solaris/sparc/11/wazuh-agent_v${this.state.wazuhVersion}-sol11-sparc.p5p`;
      }
    }

    resolveAIXPackage() {
      switch (
        `${this.state.selectedVersion}-${this.state.selectedArchitecture}`
      ) {
        case '6.1 TL9-powerpc':
          return `https://packages.wazuh.com/4.x/aix/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.aix.ppc.rpm`;
        default:
          return `https://packages.wazuh.com/4.x/aix/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.aix.ppc.rpm`;
      }
    }

    resolveHPPackage() {
      switch (
        `${this.state.selectedVersion}-${this.state.selectedArchitecture}`
      ) {
        case '11.31-itanium2':
          return `https://packages.wazuh.com/4.x/hp-ux/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}-hpux-11v3-ia64.tar`;
        default:
          return `https://packages.wazuh.com/4.x/hp-ux/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}-hpux-11v3-ia64.tar`;
      }
    }

    optionalPackages() {
      switch (this.state.selectedOS) {
        case 'rpm':
          return this.resolveRPMPackage();
        case 'cent':
          return this.resolveCENTPackage();
        case 'deb':
          return this.resolveDEBPackage();
        case 'ubu':
          return this.resolveUBUNTUPackage();
        case 'open':
          return this.resolveOPENSUSEPackage();
        case 'sol':
          return this.resolveSOLARISPackage();
        case 'aix':
          return this.resolveAIXPackage();
        case 'hp':
          return this.resolveHPPackage();
        case 'amazonlinux':
          return this.resolveAMAZONLPackage();
        case 'fedora':
          return this.resolveFEDORAPachage();
        case 'oraclelinux':
          return this.resolveORACLELINUXPackage();
        case 'suse':
          return this.resolveSUSEPackage();
        case 'raspbian':
          return this.resolveRASPBIANPackage();
        case 'alpine':
          return this.resolveAlpinePackage();
        default:
          return `https://packages.wazuh.com/4.x/yum/x86_64/wazuh-agent-${this.state.wazuhVersion}${this.addToVersion}.x86_64.rpm`;
      }
    }

    checkMissingOSSelection() {
      if (!this.state.selectedOS) {
        return ['Hệ điều hành'];
      }
      switch (this.state.selectedOS) {
        case 'rpm':
          return [
            ...(!this.state.selectedVersion ? ['Phiên bản hệ điều hành'] : []),
            ...(this.state.selectedVersion && !this.state.selectedArchitecture
              ? ['Kiến trúc hệ điều hành']
              : []),
          ];
        case 'cent':
          return [
            ...(!this.state.selectedVersion ? ['Phiên bản hệ điều hành'] : []),
            ...(this.state.selectedVersion && !this.state.selectedArchitecture
              ? ['Kiến trúc hệ điều hành']
              : []),
          ];
        case 'deb':
          return [
            ...(!this.state.selectedVersion ? ['Phiên bản hệ điều hành'] : []),
            ...(this.state.selectedVersion && !this.state.selectedArchitecture
              ? ['Kiến trúc hệ điều hành']
              : []),
          ];
        case 'ubu':
          return [
            ...(!this.state.selectedVersion ? ['Phiên bản hệ điều hành'] : []),
            ...(this.state.selectedVersion && !this.state.selectedArchitecture
              ? ['Kiến trúc hệ điều hành']
              : []),
          ];
        case 'win':
          return [
            ...(!this.state.selectedVersion ? ['Phiên bản hệ điều hành'] : []),
            ...(this.state.selectedVersion && !this.state.selectedArchitecture
              ? ['Kiến trúc hệ điều hành']
              : []),
          ];
        case 'macos':
          return [
            ...(!this.state.selectedVersion ? ['Phiên bản hệ điều hành'] : []),
            ...(this.state.selectedVersion && !this.state.selectedArchitecture
              ? ['Kiến trúc hệ điều hành']
              : []),
          ];
        case 'open':
          return [
            ...(!this.state.selectedVersion ? ['Phiên bản hệ điều hành'] : []),
            ...(this.state.selectedVersion && !this.state.selectedArchitecture
              ? ['Kiến trúc hệ điều hành']
              : []),
          ];
        case 'sol':
          return [
            ...(!this.state.selectedVersion ? ['Phiên bản hệ điều hành'] : []),
            ...(this.state.selectedVersion && !this.state.selectedArchitecture
              ? ['Kiến trúc hệ điều hành']
              : []),
          ];
        case 'aix':
          return [
            ...(!this.state.selectedVersion ? ['Phiên bản hệ điều hành'] : []),
            ...(this.state.selectedVersion && !this.state.selectedArchitecture
              ? ['Kiến trúc hệ điều hành']
              : []),
          ];
        case 'hp':
          return [
            ...(!this.state.selectedVersion ? ['Phiên bản hệ điều hành'] : []),
            ...(this.state.selectedVersion && !this.state.selectedArchitecture
              ? ['Kiến trúc hệ điều hành']
              : []),
          ];
        case 'amazonlinux':
          return [
            ...(!this.state.selectedVersion ? ['Phiên bản hệ điều hành'] : []),
            ...(this.state.selectedVersion && !this.state.selectedArchitecture
              ? ['Kiến trúc hệ điều hành']
              : []),
          ];
        case 'fedora':
          return [
            ...(!this.state.selectedVersion ? ['Phiên bản hệ điều hành'] : []),
            ...(this.state.selectedVersion && !this.state.selectedArchitecture
              ? ['Kiến trúc hệ điều hành']
              : []),
          ];
        case 'oraclelinux':
          return [
            ...(!this.state.selectedVersion ? ['Phiên bản hệ điều hành'] : []),
            ...(this.state.selectedVersion && !this.state.selectedArchitecture
              ? ['Kiến trúc hệ điều hành']
              : []),
          ];
        case 'suse':
          return [
            ...(!this.state.selectedVersion ? ['Phiên bản hệ điều hành'] : []),
            ...(this.state.selectedVersion && !this.state.selectedArchitecture
              ? ['Kiến trúc hệ điều hành']
              : []),
          ];
        case 'raspbian':
          return [
            ...(!this.state.selectedVersion ? ['Phiên bản hệ điều hành'] : []),
            ...(this.state.selectedVersion && !this.state.selectedArchitecture
              ? ['Kiến trúc hệ điều hành']
              : []),
          ];
        case 'alpine':
          return [
            ...(!this.state.selectedVersion ? ['Phiên bản hệ điều hành'] : []),
            ...(this.state.selectedVersion && !this.state.selectedArchitecture
              ? ['Kiến trúc hệ điều hành']
              : []),
          ];
        default:
          return [];
      }
    }

    getHighlightCodeLanguage(selectedSO) {
      if (selectedSO.toLowerCase() === 'win') {
        return 'powershell';
      } else {
        return 'bash';
      }
    }

    render() {
      const appVersionMajorDotMinor = this.state.wazuhVersion
        .split('.')
        .slice(0, 2)
        .join('.');
      const urlCheckConnectionDocumentation = webDocumentationLink(
        'user-manual/agents/agent-connection.html',
        appVersionMajorDotMinor,
      );

      const urlWazuhAgentEnrollment = webDocumentationLink(
        'user-manual/agent-enrollment/index.html',
        appVersionMajorDotMinor,
      );

      const urlWindowsPackage = `https://packages.wazuh.com/4.x/windows/wazuh-agent-${this.state.wazuhVersion}-1.msi`;
      const missingOSSelection = this.checkMissingOSSelection();
      const warningForAgentName =
        'Tên trạm phải là độc nhất. Không thể thay đổi tên sau khi trạm đã được đăng ký.';

      const agentName = (
        <EuiText>
          <p>
            Triển khai mặc định sử dụng tên máy chủ làm tên trạm. Nếu muốn, bạn có thể đặt tên trạm bên dưới.
          </p>
          <EuiText color='default'>Đặt tên cho trạm</EuiText>
          <EuiSpacer />
          <EuiForm>
            <EuiFormRow
              isInvalid={this.state.agentNameError}
              error={[
                this.state.badCharacters.length < 1
                  ? 'Độ dài tối thiểu là 2 ký tự.'
                  : `Các ký tự ${this.state.badCharacters.map(char => `"${char}"`)} không hợp lệ. Các ký tự được phép là A-Z, a-z, ".", "-", "_"`,
              ]}
            >
              <EuiFieldText
                isInvalid={this.state.agentNameError}
                placeholder='Tên trạm'
                value={this.state.agentName}
                onChange={event => this.setAgentName(event)}
              />
            </EuiFormRow>
          </EuiForm>
          <EuiSpacer size='s' />
          <EuiCallOut
            color='warning'
            title={warningForAgentName}
            iconType='iInCircle'
          />
        </EuiText>
      );
      const groupInput = (
        <>
          {!this.state.groups.length && (
            <>
              <EuiCallOut
                style={{ marginTop: '1.5rem' }}
                color='warning'
                title='Không thể cấu hình phần này vì bạn không có quyền đọc nhóm.'
                iconType='iInCircle'
              />
            </>
          )}
        </>
      );

      const agentGroup = (
        <EuiText style={{ marginTop: '1.5rem' }}>
          <p>Chọn một hoặc nhiều nhóm có sẵn</p>
          <EuiComboBox
            placeholder={!this.state.groups.length ? 'Mặc định' : 'Chọn nhóm'}
            options={this.state.groups}
            selectedOptions={this.state.selectedGroup}
            onChange={group => {
              this.setGroupName(group);
            }}
            isDisabled={!this.state.groups.length}
            isClearable={true}
            data-test-subj='demoComboBox'
          />
        </EuiText>
      );
      const passwordInput = (
        <EuiFieldText
          placeholder='Mật khẩu Wazuh'
          value={this.state.wazuhPassword}
          onChange={event => this.setWazuhPassword(event)}
        />
      );

      const codeBlock = {
        zIndex: '100',
      };

      /*** macOS installation script customization ***/

      // Set macOS installation script with environment variables
      const macOSInstallationOptions =
        `${this.optionalDeploymentVariables()}${this.agentNameVariable()}`
          .replace(/\' ([a-zA-Z])/g, "' && $1") // Separate environment variables with &&
          .replace(/\"/g, '\\"') // Escape double quotes
          .trim();

      // If no variables are set, the echo will be empty
      const macOSInstallationSetEnvVariablesScript = macOSInstallationOptions
        ? `sudo echo "${macOSInstallationOptions}" > /tmp/wazuh_envs && `
        : ``;

      // Merge environment variables with installation script
      const macOSInstallationScript = `curl -so wazuh-agent.pkg https://packages.wazuh.com/4.x/macos/wazuh-agent-${this.state.wazuhVersion}-1.${this.state.selectedArchitecture}.pkg && ${macOSInstallationSetEnvVariablesScript}sudo installer -pkg ./wazuh-agent.pkg -target /`;

      /*** end macOS installation script customization ***/

      const customTexts = {
        rpmText: `sudo ${this.optionalDeploymentVariables()}${this.agentNameVariable()}yum install -y ${this.optionalPackages()}`,
        alpineText: `wget -O /etc/apk/keys/alpine-devel@wazuh.com-633d7457.rsa.pub ${this.optionalPackages()} >> /etc/apk/repositories && \
apk update && \
apk add wazuh-agent=${this.state.wazuhVersion}-r1`,
        centText: `sudo ${this.optionalDeploymentVariables()}${this.agentNameVariable()}yum install -y ${this.optionalPackages()}`,
        debText: `curl -so wazuh-agent.deb ${this.optionalPackages()} && sudo ${this.optionalDeploymentVariables()}${this.agentNameVariable()}dpkg -i ./wazuh-agent.deb`,
        ubuText: `curl -so wazuh-agent.deb ${this.optionalPackages()} && sudo ${this.optionalDeploymentVariables()}${this.agentNameVariable()}dpkg -i ./wazuh-agent.deb`,
        macosText: macOSInstallationScript,
        winText:
          this.state.selectedVersion == 'windowsxp' ||
          this.state.selectedVersion == 'windowsserver2008'
            ? `msiexec.exe /i wazuh-agent-${this.state.wazuhVersion}-1.msi /q ${this.optionalDeploymentVariables()}${this.agentNameVariable()}`
            : `Invoke-WebRequest -Uri https://packages.wazuh.com/4.x/windows/wazuh-agent-${this.state.wazuhVersion}-1.msi -OutFile \${env:tmp}\\wazuh-agent.msi; msiexec.exe /i \${env:tmp}\\wazuh-agent.msi /q ${this.optionalDeploymentVariables()}${this.agentNameVariable()}`,
        openText: `sudo rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH && sudo ${this.optionalDeploymentVariables()}${this.agentNameVariable()}zypper install -y ${this.optionalPackages()}`,
        solText: `sudo curl -so ${
          this.state.selectedVersion == 'solaris11'
            ? 'wazuh-agent.p5p'
            : 'wazuh-agent.pkg'
        } ${this.optionalPackages()} && ${
          this.state.selectedVersion == 'solaris11'
            ? 'pkg install -g wazuh-agent.p5p wazuh-agent'
            : 'pkgadd -d wazuh-agent.pkg'
        }`,
        aixText: `sudo ${this.optionalDeploymentVariables()}${this.agentNameVariable()}rpm -ivh ${this.optionalPackages()}`,
        hpText: `cd / && sudo curl -so wazuh-agent.tar ${this.optionalPackages()} && sudo groupadd wazuh && sudo useradd -G wazuh wazuh && sudo tar -xvf wazuh-agent.tar`,
        amazonlinuxText: `sudo ${this.optionalDeploymentVariables()}${this.agentNameVariable()}yum install -y ${this.optionalPackages()}`,
        fedoraText: `sudo ${this.optionalDeploymentVariables()}${this.agentNameVariable()}yum install -y ${this.optionalPackages()}`,
        oraclelinuxText: `sudo ${this.optionalDeploymentVariables()}${this.agentNameVariable()}yum install -y ${this.optionalPackages()}`,
        suseText: `sudo rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH && sudo ${this.optionalDeploymentVariables()}${this.agentNameVariable()}zypper install -y ${this.optionalPackages()}`,
        raspbianText: `curl -so wazuh-agent.deb ${this.optionalPackages()} && sudo ${this.optionalDeploymentVariables()}${this.agentNameVariable()}dpkg -i ./wazuh-agent.deb`,
      };

      const field = `${this.state.selectedOS}Text`;
      const text = customTexts[field];
      const language = this.getHighlightCodeLanguage(this.state.selectedOS);
      const warningUpgrade =
        'Nếu trình cài đặt phát hiện trạm Wazuh khác trên hệ thống, nó sẽ nâng cấp và giữ nguyên cấu hình.';
      const textAndLinkToCheckConnectionDocumentation = (
        <p>
          Để xác minh kết nối với máy chủ Wazuh, vui lòng làm theo hướng dẫn trong{' '}
          <a
            href={urlCheckConnectionDocumentation}
            target='_blank'
            rel='noreferrer'
          >
            tài liệu
          </a>
        </p>
      );

      const warningCommand = (
        <>
          <p>
            Vui lòng <a href={urlWindowsPackage}>tải gói</a> từ kho lưu trữ của chúng tôi và sao chép nó vào hệ thống Windows nơi bạn sẽ cài đặt. Sau đó, chạy lệnh sau để cài đặt:
          </p>
        </>
      );

      const windowsAdvice = this.state.selectedOS === 'win' && (
        <>
          <EuiCallOut title='Yêu cầu' iconType='iInCircle'>
            <ul className='wz-callout-list'>
              <li>
                <span>
                  Bạn cần quyền quản trị viên để thực hiện cài đặt này.
                </span>
              </li>
              <li>
                <span>Yêu cầu PowerShell 3.0 hoặc cao hơn.</span>
              </li>
            </ul>
            <p>
              Lưu ý rằng bạn cần chạy lệnh này trong terminal PowerShell của Windows.
            </p>
          </EuiCallOut>
          <EuiSpacer></EuiSpacer>
        </>
      );
      const restartAgentCommand =
        this.restartAgentCommand[this.state.selectedOS];
      const onTabClick = selectedTab => {
        this.selectSYS(selectedTab.id);
      };

      const calloutErrorRegistrationServiceInfo = this.state
        .gotErrorRegistrationServiceInfo ? (
        <EuiCallOut
          color='danger'
          title='Không thể hiển thị phần này vì bạn không có quyền truy cập dịch vụ đăng ký.'
          iconType='iInCircle'
        />
      ) : null;

      const guide = (
        <div>
          {this.state.gotErrorRegistrationServiceInfo ? (
            <EuiCallOut
              color='danger'
              title='Không thể hiển thị phần này vì bạn không có quyền truy cập dịch vụ đăng ký.'
              iconType='iInCircle'
            />
          ) : (
            this.state.selectedOS && (
              <EuiText>
                {this.state.agentName.length > 0 ? (
                  <p>
                    Bạn có thể sử dụng lệnh này để cài đặt và đăng ký trạm Wazuh.
                  </p>
                ) : (
                  <p>
                    Bạn có thể sử dụng lệnh này để cài đặt và đăng ký trạm Wazuh trên một hoặc nhiều máy chủ.
                  </p>
                )}
                <EuiCallOut
                  color='warning'
                  title={warningUpgrade}
                  iconType='iInCircle'
                />

                {!this.state.connectionSecure && (
                  <>
                    <EuiSpacer />
                    {/** Cảnh báo không có kết nối bảo mật */}
                    <EuiCallOut
                      color='danger'
                      title={
                        <>
                          Cảnh báo: không có{' '}
                          <EuiLink
                            target='_blank'
                            href={webDocumentationLink(
                              'user-manual/deployment-variables/deployment-variables.html',
                              appVersionMajorDotMinor,
                            )}
                          >
                            giao thức bảo mật
                          </EuiLink>{' '}
                          được cấu hình và các trạm sẽ không thể giao tiếp với máy chủ quản lý.
                        </>
                      }
                      iconType='iInCircle'
                    />
                  </>
                )}
                <EuiSpacer />
                {windowsAdvice}
                {['windowsxp', 'windowsserver2008'].includes(
                  this.state.selectedVersion,
                ) && (
                  <>
                    <EuiCallOut
                      color='warning'
                      title={warningCommand}
                      iconType='iInCircle'
                    />
                    <EuiSpacer />
                  </>
                )}
                <div className='copy-codeblock-wrapper'>
                  <EuiCodeBlock style={codeBlock} language={language}>
                    {this.state.wazuhPassword &&
                    !this.state.showPassword &&
                    !['sol', 'hp', 'alpine'].includes(this.state.selectedOS)
                      ? this.obfuscatePassword(text)
                      : text}
                  </EuiCodeBlock>
                  <EuiCopy textToCopy={text || ''}>
                    {copy => (
                      <div className='copy-overlay' onClick={copy}>
                        <p>
                          <EuiIcon type='copy' /> Sao chép lệnh
                        </p>
                      </div>
                    )}
                  </EuiCopy>
                </div>
                {this.state.selectedVersion == 'solaris10' ||
                this.state.selectedVersion == 'solaris11' ? (
                  <>
                    <EuiCallOut
                      color='warning'
                      className='message'
                      iconType='iInCircle'
                      title={
                        <span>
                          Có thể yêu cầu thêm một số bước cài đặt{' '}
                          <EuiLink
                            target='_blank'
                            href={webDocumentationLink(
                              'installation-guide/wazuh-agent/wazuh-agent-package-solaris.html',
                              appVersionMajorDotMinor,
                            )}
                          >
                            các bước
                          </EuiLink>
                          .
                        </span>
                      }
                    ></EuiCallOut>
                    <EuiSpacer size='m' />
                    <EuiCallOut
                      color='warning'
                      className='message'
                      iconType='iInCircle'
                      title={
                        <span>
                          Sau khi cài đặt trạm, bạn cần đăng ký nó vào máy chủ Wazuh. Xem phần{' '}
                          <EuiLink
                            target='_blank'
                            href={urlWazuhAgentEnrollment}
                          >
                            đăng ký trạm Wazuh
                          </EuiLink>{' '}
                          để biết thêm chi tiết.
                        </span>
                      }
                    ></EuiCallOut>
                  </>
                ) : this.state.selectedVersion == '6.1 TL9' ? (
                  <>
                    <EuiCallOut
                      color='warning'
                      className='message'
                      iconType='iInCircle'
                      title={
                        <span>
                          Có thể yêu cầu thêm một số bước cài đặt{' '}
                          <EuiLink
                            target='_blank'
                            href={webDocumentationLink(
                              'installation-guide/wazuh-agent/wazuh-agent-package-aix.html',
                              appVersionMajorDotMinor,
                            )}
                          >
                            các bước
                          </EuiLink>
                          .
                        </span>
                      }
                    ></EuiCallOut>
                    <EuiSpacer />
                  </>
                ) : this.state.selectedVersion == '11.31' ? (
                  <>
                    <EuiCallOut
                      color='warning'
                      className='message'
                      iconType='iInCircle'
                      title={
                        <span>
                          Có thể yêu cầu thêm một số bước cài đặt{' '}
                          <EuiLink
                            target='_blank'
                            href={webDocumentationLink(
                              'installation-guide/wazuh-agent/wazuh-agent-package-hpux.html',
                              appVersionMajorDotMinor,
                            )}
                          >
                            các bước
                          </EuiLink>
                          .
                        </span>
                      }
                    ></EuiCallOut>
                    <EuiSpacer size='m' />
                    <EuiCallOut
                      color='warning'
                      className='message'
                      iconType='iInCircle'
                      title={
                        <span>
                          Sau khi cài đặt trạm, bạn cần đăng ký nó vào máy chủ Wazuh. Xem phần{' '}
                          <EuiLink
                            target='_blank'
                            href={urlWazuhAgentEnrollment}
                          >
                            đăng ký trạm Wazuh
                          </EuiLink>{' '}
                          để biết thêm chi tiết.
                        </span>
                      }
                    ></EuiCallOut>
                  </>
                ) : this.state.selectedVersion == '3.12.12' ? (
                  <>
                    <EuiCallOut
                      color='warning'
                      className='message'
                      iconType='iInCircle'
                      title={
                        <span>
                          Có thể yêu cầu thêm một số bước cài đặt{' '}
                          <EuiLink
                            target='_blank'
                            href={webDocumentationLink(
                              'installation-guide/wazuh-agent/wazuh-agent-package-linux.html',
                              appVersionMajorDotMinor,
                            )}
                          >
                            các bước
                          </EuiLink>
                          .
                        </span>
                      }
                    ></EuiCallOut>
                    <EuiSpacer size='m' />
                    <EuiCallOut
                      color='warning'
                      className='message'
                      iconType='iInCircle'
                      title={
                        <span>
                          Sau khi cài đặt trạm, bạn cần đăng ký nó vào máy chủ Wazuh. Xem phần{' '}
                          <EuiLink
                            target='_blank'
                            href={urlWazuhAgentEnrollment}
                          >
                            đăng ký trạm Wazuh
                          </EuiLink>{' '}
                          để biết thêm chi tiết.
                        </span>
                      }
                    ></EuiCallOut>
                  </>
                ) : this.state.selectedVersion == 'debian7' ||
                  this.state.selectedVersion == 'debian8' ||
                  this.state.selectedVersion == 'debian9' ||
                  this.state.selectedVersion == 'debian10' ? (
                  <>
                    <EuiCallOut
                      color='warning'
                      className='message'
                      iconType='iInCircle'
                      title={
                        <span>
                          Có thể yêu cầu thêm một số bước cài đặt{' '}
                          <EuiLink
                            target='_blank'
                            href={webDocumentationLink(
                              'installation-guide/wazuh-agent/wazuh-agent-package-linux.html',
                              appVersionMajorDotMinor,
                            )}
                          >
                            các bước
                          </EuiLink>
                          .
                        </span>
                      }
                    ></EuiCallOut>
                    <EuiSpacer />
                  </>
                ) : (
                  ''
                )}
                {this.state.needsPassword &&
                !['sol', 'hp', 'alpine'].includes(this.state.selectedOS) ? (
                  <EuiSwitch
                    label='Hiển thị mật khẩu'
                    checked={this.state.showPassword}
                    onChange={active => this.setShowPassword(active)}
                  />
                ) : (
                  ''
                )}
                <EuiSpacer />
              </EuiText>
            )
          )}
        </div>
      );

      const tabSysV = [
        {
          id: 'sysV',
          name: 'SysV Init',
          content: (
            <Fragment>
              <EuiSpacer />
              <EuiText>
                <div className='copy-codeblock-wrapper'>
                  <EuiCodeBlock style={codeBlock} language={language}>
                    {this.systemSelector()}
                  </EuiCodeBlock>
                  <EuiCopy textToCopy={this.systemSelector()}>
                    {copy => (
                      <div className='copy-overlay' onClick={copy}>
                        <p>
                          <EuiIcon type='copy' /> Sao chép lệnh
                        </p>
                      </div>
                    )}
                  </EuiCopy>
                </div>
                <EuiSpacer size='s' />
                {textAndLinkToCheckConnectionDocumentation}
              </EuiText>
            </Fragment>
          ),
        },
      ];

      const tabSystemD = [
        {
          id: 'systemd',
          name: 'Systemd',
          content: (
            <Fragment>
              <EuiSpacer />
              <EuiText>
                <div className='copy-codeblock-wrapper'>
                  <EuiCodeBlock style={codeBlock} language={language}>
                    {this.systemSelector()}
                  </EuiCodeBlock>
                  <EuiCopy textToCopy={this.systemSelector()}>
                    {copy => (
                      <div className='copy-overlay' onClick={copy}>
                        <p>
                          <EuiIcon type='copy' /> Sao chép lệnh
                        </p>
                      </div>
                    )}
                  </EuiCopy>
                </div>
                <EuiSpacer size='s' />
                {textAndLinkToCheckConnectionDocumentation}
              </EuiText>
            </Fragment>
          ),
        },
      ];

      const tabNet = [
        {
          id: 'NET',
          name: 'NET',
          content: (
            <Fragment>
              <EuiSpacer />
              <EuiText>
                <div className='copy-codeblock-wrapper'>
                  <EuiCodeBlock style={codeBlock} language={language}>
                    {this.systemSelectorNet()}
                  </EuiCodeBlock>
                  <EuiCopy textToCopy={this.systemSelectorNet()}>
                    {copy => (
                      <div className='copy-overlay' onClick={copy}>
                        <p>
                          <EuiIcon type='copy' /> Sao chép lệnh
                        </p>
                      </div>
                    )}
                  </EuiCopy>
                </div>
                <EuiSpacer size='s' />
                {textAndLinkToCheckConnectionDocumentation}
              </EuiText>
            </Fragment>
          ),
        },
      ];

      const tabWazuhControlMacos = [
        {
          id: 'Wazuh-control-macos',
          name: 'Wazuh-control-macos',
          content: (
            <Fragment>
              <EuiSpacer />
              <EuiText>
                <div className='copy-codeblock-wrapper'>
                  <EuiCodeBlock style={codeBlock} language={language}>
                    {this.systemSelectorWazuhControlMacos()}
                  </EuiCodeBlock>
                  <EuiCopy textToCopy={this.systemSelectorWazuhControlMacos()}>
                    {copy => (
                      <div className='copy-overlay' onClick={copy}>
                        <p>
                          <EuiIcon type='copy' /> Sao chép lệnh
                        </p>
                      </div>
                    )}
                  </EuiCopy>
                </div>
                <EuiSpacer size='s' />
                {textAndLinkToCheckConnectionDocumentation}
              </EuiText>
            </Fragment>
          ),
        },
      ];

      const tabWazuhControl = [
        {
          id: 'Wazuh-control',
          name: 'Wazuh-control',
          content: (
            <Fragment>
              <EuiSpacer />
              <EuiText>
                <div className='copy-codeblock-wrapper'>
                  <EuiCodeBlock style={codeBlock} language={language}>
                    {this.systemSelectorWazuhControl()}
                  </EuiCodeBlock>
                  <EuiCopy textToCopy={this.systemSelectorWazuhControl()}>
                    {copy => (
                      <div className='copy-overlay' onClick={copy}>
                        <p>
                          <EuiIcon type='copy' /> Sao chép lệnh
                        </p>
                      </div>
                    )}
                  </EuiCopy>
                </div>
                <EuiSpacer size='s' />
                {textAndLinkToCheckConnectionDocumentation}
              </EuiText>
            </Fragment>
          ),
        },
      ];

      const tabInitD = [
        {
          id: 'Init.d',
          name: 'Init.d',
          content: (
            <Fragment>
              <EuiSpacer />
              <EuiText>
                <div className='copy-codeblock-wrapper'>
                  <EuiCodeBlock style={codeBlock} language={language}>
                    {this.systemSelectorInitD()}
                  </EuiCodeBlock>
                  <EuiCopy textToCopy={this.systemSelectorInitD()}>
                    {copy => (
                      <div className='copy-overlay' onClick={copy}>
                        <p>
                          <EuiIcon type='copy' /> Sao chép lệnh
                        </p>
                      </div>
                    )}
                  </EuiCopy>
                </div>
                <EuiSpacer size='s' />
                {textAndLinkToCheckConnectionDocumentation}
              </EuiText>
            </Fragment>
          ),
        },
      ];

      const onChangeServerAddress = async nodeSelected => {
        this.setState({
          serverAddress: nodeSelected,
          udpProtocol: this.state.haveUdpProtocol,
          connectionSecure: this.state.haveConnectionSecure,
        });
      };

      const steps = [
        {
          title: 'Chọn hệ điều hành',
          children: (
            <PrincipalButtonGroup
              legend='Chọn hệ điều hành'
              options={osPrincipalButtons}
              idSelected={this.state.selectedOS}
              onChange={os => this.selectOS(os)}
            />
          ),
        },
        ...(this.state.selectedOS == 'rpm'
          ? [
              {
                title: 'Chọn phiên bản',
                children: (
                  <RegisterAgentButtonGroup
                    legend='Chọn phiên bản'
                    options={versionButtonsRedHat}
                    idSelected={this.state.selectedVersion}
                    onChange={version => this.setVersion(version)}
                  />
                ),
              },
            ]
          : []),
        ...(this.state.selectedOS == 'oraclelinux'
          ? [
              {
                title: 'Chọn phiên bản',
                children: (
                  <RegisterAgentButtonGroup
                    legend='Chọn phiên bản'
                    options={versionButtonsOracleLinux}
                    idSelected={this.state.selectedVersion}
                    onChange={version => this.setVersion(version)}
                  />
                ),
              },
            ]
          : []),
        ...(this.state.selectedOS == 'raspbian'
          ? [
              {
                title: 'Chọn phiên bản',
                children: (
                  <RegisterAgentButtonGroup
                    legend='Chọn phiên bản'
                    options={versionButtonsRaspbian}
                    idSelected={this.state.selectedVersion}
                    onChange={version => this.setVersion(version)}
                  />
                ),
              },
            ]
          : []),
        ...(this.state.selectedOS == 'amazonlinux'
          ? [
              {
                title: 'Chọn phiên bản',
                children: (
                  <RegisterAgentButtonGroup
                    legend='Chọn phiên bản'
                    options={versionButtonAmazonLinux}
                    idSelected={this.state.selectedVersion}
                    onChange={version => this.setVersion(version)}
                  />
                ),
              },
            ]
          : []),
        ...(this.state.selectedOS == 'cent'
          ? [
              {
                title: 'Chọn phiên bản',
                children: (
                  <RegisterAgentButtonGroup
                    legend='Chọn phiên bản'
                    options={versionButtonsCentos}
                    idSelected={this.state.selectedVersion}
                    onChange={version => this.setVersion(version)}
                  />
                ),
              },
            ]
          : []),
        ...(this.state.selectedOS == 'fedora'
          ? [
              {
                title: 'Chọn phiên bản',
                children: (
                  <RegisterAgentButtonGroup
                    legend='Chọn phiên bản'
                    options={versionButtonFedora}
                    idSelected={this.state.selectedVersion}
                    onChange={version => this.setVersion(version)}
                  />
                ),
              },
            ]
          : []),
        ...(this.state.selectedOS == 'deb'
          ? [
              {
                title: 'Chọn phiên bản',
                children: (
                  <RegisterAgentButtonGroup
                    legend='Chọn phiên bản'
                    options={versionButtonsDebian}
                    idSelected={this.state.selectedVersion}
                    onChange={version => this.setVersion(version)}
                  />
                ),
              },
            ]
          : []),
        ...(this.state.selectedOS == 'ubu'
          ? [
              {
                title: 'Chọn phiên bản',
                children: (
                  <RegisterAgentButtonGroup
                    legend='Chọn phiên bản'
                    options={versionButtonsUbuntu}
                    idSelected={this.state.selectedVersion}
                    onChange={version => this.setVersion(version)}
                  />
                ),
              },
            ]
          : []),
        ...(this.state.selectedOS == 'win'
          ? [
              {
                title: 'Chọn phiên bản',
                children: (
                  <RegisterAgentButtonGroup
                    legend='Chọn phiên bản'
                    options={versionButtonsWindows}
                    idSelected={this.state.selectedVersion}
                    onChange={version => this.setVersion(version)}
                  />
                ),
              },
            ]
          : []),
        ...(this.state.selectedOS == 'macos'
          ? [
              {
                title: 'Chọn phiên bản',
                children: (
                  <RegisterAgentButtonGroup
                    legend='Chọn phiên bản'
                    options={versionButtonsMacOS}
                    idSelected={this.state.selectedVersion}
                    onChange={version => this.setVersion(version)}
                  />
                ),
              },
            ]
          : []),
        ...(this.state.selectedOS == 'suse'
          ? [
              {
                title: 'Chọn phiên bản',
                children: (
                  <RegisterAgentButtonGroup
                    legend='Chọn phiên bản'
                    options={versionButtonsSuse}
                    idSelected={this.state.selectedVersion}
                    onChange={version => this.setVersion(version)}
                  />
                ),
              },
            ]
          : []),
        ...(this.state.selectedOS == 'open'
          ? [
              {
                title: 'Chọn phiên bản',
                children: (
                  <RegisterAgentButtonGroup
                    legend='Chọn phiên bản'
                    options={versionButtonsOpenSuse}
                    idSelected={this.state.selectedVersion}
                    onChange={version => this.setVersion(version)}
                  />
                ),
              },
            ]
          : []),
        ...(this.state.selectedOS == 'sol'
          ? [
              {
                title: 'Chọn phiên bản',
                children: (
                  <RegisterAgentButtonGroup
                    legend='Chọn phiên bản'
                    options={versionButtonsSolaris}
                    idSelected={this.state.selectedVersion}
                    onChange={version => this.setVersion(version)}
                  />
                ),
              },
            ]
          : []),
        ...(this.state.selectedOS == 'aix'
          ? [
              {
                title: 'Chọn phiên bản',
                children: (
                  <RegisterAgentButtonGroup
                    legend='Chọn phiên bản'
                    options={versionButtonsAix}
                    idSelected={this.state.selectedVersion}
                    onChange={version => this.setVersion(version)}
                  />
                ),
              },
            ]
          : []),
        ...(this.state.selectedOS == 'hp'
          ? [
              {
                title: 'Chọn phiên bản',
                children: (
                  <RegisterAgentButtonGroup
                    legend='Chọn phiên bản'
                    options={versionButtonsHPUX}
                    idSelected={this.state.selectedVersion}
                    onChange={version => this.setVersion(version)}
                  />
                ),
              },
            ]
          : []),
        ...(this.state.selectedOS == 'alpine'
          ? [
              {
                title: 'Chọn phiên bản',
                children: (
                  <RegisterAgentButtonGroup
                    legend='Chọn phiên bản'
                    options={versionButtonAlpine}
                    idSelected={this.state.selectedVersion}
                    onChange={version => this.setVersion(version)}
                  />
                ),
              },
            ]
          : []),
        ...(this.state.selectedVersion == 'centos5' ||
        this.state.selectedVersion == 'redhat5' ||
        this.state.selectedVersion == 'oraclelinux5' ||
        this.state.selectedVersion == 'suse11'
          ? [
              {
                title: 'Chọn kiến trúc',
                children: (
                  <RegisterAgentButtonGroup
                    legend='Chọn kiến trúc'
                    options={architecturei386Andx86_64}
                    idSelected={this.state.selectedArchitecture}
                    onChange={architecture =>
                      this.setArchitecture(architecture)
                    }
                  />
                ),
              },
            ]
          : []),
        ...(this.state.selectedVersion == 'leap15'
          ? [
              {
                title: 'Chọn kiến trúc',
                children: (
                  <RegisterAgentButtonGroup
                    legend='Chọn kiến trúc'
                    options={architectureButtonsWithPPC64LE}
                    idSelected={this.state.selectedArchitecture}
                    onChange={architecture =>
                      this.setArchitecture(architecture)
                    }
                  />
                ),
              },
            ]
          : []),
        ...(this.state.selectedVersion == '3.12.12'
          ? [
              {
                title: 'Chọn kiến trúc',
                children: (
                  <RegisterAgentButtonGroup
                    legend='Chọn kiến trúc'
                    options={architectureButtonsWithPPC64LEAlpine}
                    idSelected={this.state.selectedArchitecture}
                    onChange={architecture =>
                      this.setArchitecture(architecture)
                    }
                  />
                ),
              },
            ]
          : []),
        ...(this.state.selectedVersion == 'centos6' ||
        this.state.selectedVersion == 'oraclelinux6' ||
        this.state.selectedVersion == 'amazonlinux1' ||
        this.state.selectedVersion == 'redhat6' ||
        this.state.selectedVersion == 'amazonlinux2022' ||
        this.state.selectedVersion == 'amazonlinux2' ||
        this.state.selectedVersion == 'debian7' ||
        this.state.selectedVersion == 'debian8' ||
        this.state.selectedVersion == 'ubuntu14' ||
        this.state.selectedVersion == 'ubuntu15'
          ? [
              {
                title: 'Chọn kiến trúc',
                children: (
                  <RegisterAgentButtonGroup
                    legend='Chọn kiến trúc'
                    options={architectureButtons}
                    idSelected={this.state.selectedArchitecture}
                    onChange={architecture =>
                      this.setArchitecture(architecture)
                    }
                  />
                ),
              },
            ]
          : []),
        ...(this.state.selectedVersion == 'centos7' ||
        this.state.selectedVersion == 'redhat7' ||
        this.state.selectedVersion == 'suse12' ||
        this.state.selectedVersion == '22' ||
        this.state.selectedVersion == 'debian9' ||
        this.state.selectedVersion == 'busterorgreater'
          ? [
              {
                title: 'Chọn kiến trúc',
                children: (
                  <RegisterAgentButtonGroup
                    legend='Chọn kiến trúc'
                    options={architectureButtonsWithPPC64LE}
                    idSelected={this.state.selectedArchitecture}
                    onChange={architecture =>
                      this.setArchitecture(architecture)
                    }
                  />
                ),
              },
            ]
          : []),
        ...(this.state.selectedVersion == 'windowsxp' ||
        this.state.selectedVersion == 'windowsserver2008' ||
        this.state.selectedVersion == 'windows7'
          ? [
              {
                title: 'Chọn kiến trúc',
                children: (
                  <RegisterAgentButtonGroup
                    legend='Chọn kiến trúc'
                    options={architectureButtonsi386}
                    idSelected={this.state.selectedArchitecture}
                    onChange={architecture =>
                      this.setArchitecture(architecture)
                    }
                  />
                ),
              },
            ]
          : []),
        ...(this.state.selectedVersion == 'sierra'
          ? [
              {
                title: 'Chọn kiến trúc',
                children: (
                  <RegisterAgentButtonGroup
                    legend='Chọn kiến trúc'
                    options={architectureButtonsMacos}
                    idSelected={this.state.selectedArchitecture}
                    onChange={architecture =>
                      this.setArchitecture(architecture)
                    }
                  />
                ),
              },
            ]
          : []),
        ...(this.state.selectedVersion == 'solaris10' ||
        this.state.selectedVersion == 'solaris11'
          ? [
              {
                title: 'Chọn Kiến Trúc',
                children: (
                  <RegisterAgentButtonGroup
                    legend='Chọn kiến trúc'
                    options={architectureButtonsSolaris}
                    idSelected={this.state.selectedArchitecture}
                    onChange={architecture =>
                      this.setArchitecture(architecture)
                    }
                  />
                ),
              },
            ]
          : []),
        ...(this.state.selectedVersion == '6.1 TL9'
          ? [
              {
                title: 'Chọn kiến trúc',
                children: (
                  <RegisterAgentButtonGroup
                    legend='Chọn kiến trúc'
                    options={architectureButtonsAix}
                    idSelected={this.state.selectedArchitecture}
                    onChange={architecture =>
                      this.setArchitecture(architecture)
                    }
                  />
                ),
              },
            ]
          : []),
        ...(this.state.selectedVersion == '11.31'
          ? [
              {
                title: 'Chọn kiến trúc',
                children: (
                  <RegisterAgentButtonGroup
                    legend='Chọn kiến trúc'
                    options={architectureButtonsHpUx}
                    idSelected={this.state.selectedArchitecture}
                    onChange={architecture =>
                      this.setArchitecture(architecture)
                    }
                  />
                ),
              },
            ]
          : []),
        ...(!(
          this.state.selectedOS == 'hp' ||
          this.state.selectedOS == 'sol' ||
          this.state.selectedOS == 'alpine'
        )
          ? [
              {
                title: 'Địa chỉ máy chủ Wazuh',
                children: (
                  <Fragment>
                    <WzManagerAddressInput
                      defaultValue={this.state.defaultServerAddress}
                      onChange={onChangeServerAddress}
                    />
                  </Fragment>
                ),
              },
            ]
          : []),
        ...(!(
          !this.state.needsPassword ||
          this.state.hidePasswordInput ||
          !!['solaris10', 'solaris11', '11.31', '3.12.12'].includes(
            this.state.selectedVersion,
          )
        )
          ? [
              {
                title: 'Mật khẩu Wazuh',
                children: <Fragment>{passwordInput}</Fragment>,
              },
            ]
          : []),
        ...(!(
          this.state.selectedOS == 'hp' ||
          this.state.selectedOS == 'sol' ||
          this.state.selectedOS == 'alpine'
        )
          ? [
              {
                title: 'Cài đặt tùy chọn',
                children: (
                  <Fragment>
                    {agentName}
                    {groupInput}
                    {agentGroup}
                  </Fragment>
                ),
              },
            ]
          : []),
        {
          title: 'Cài đặt và đăng ký trạm',
          children: this.state.gotErrorRegistrationServiceInfo ? (
            calloutErrorRegistrationServiceInfo
          ) : this.state.agentNameError &&
            !['hp', 'sol', 'alpine'].includes(this.state.selectedOS) ? (
            <EuiCallOut
              color='danger'
              title={'Có một số trường có lỗi. Vui lòng kiểm tra lại.'}
              iconType='alert'
            />
          ) : missingOSSelection.length ? (
            <EuiCallOut
              color='warning'
              title={`Hãy chọn ${missingOSSelection.join(', ')}.`}
              iconType='iInCircle'
            />
          ) : (
            <div>{guide}</div>
          ),
        },
        ...(!missingOSSelection.length &&
        this.state.selectedOS !== 'rpm' &&
        this.state.selectedOS !== 'deb' &&
        this.state.selectedOS !== 'cent' &&
        this.state.selectedOS !== 'ubu' &&
        this.state.selectedOS !== 'win' &&
        this.state.selectedOS !== 'macos' &&
        this.state.selectedOS !== 'open' &&
        this.state.selectedOS !== 'sol' &&
        this.state.selectedOS !== 'aix' &&
        this.state.selectedOS !== 'hp' &&
        this.state.selectedOS !== 'amazonlinux' &&
        this.state.selectedOS !== 'fedora' &&
        this.state.selectedOS !== 'oraclelinux' &&
        this.state.selectedOS !== 'suse' &&
        this.state.selectedOS !== 'raspbian' &&
        this.state.selectedOS !== 'alpine' &&
        restartAgentCommand
          ? [
              {
                title: 'Khởi động trạm',
                children: this.state.gotErrorRegistrationServiceInfo ? (
                  calloutErrorRegistrationServiceInfo
                ) : this.state.agentNameError &&
                  !['hp', 'sol', 'alpine'].includes(this.state.selectedOS) ? (
                  <EuiCallOut
                    color='danger'
                    title={'Có một số trường có lỗi. Vui lòng kiểm tra lại.'}
                    iconType='alert'
                  />
                ) : missingOSSelection.length ? (
                  <EuiCallOut
                    color='warning'
                    title={`Hãy chọn ${missingOSSelection.join(
                      ', ',
                    )}.`}
                    iconType='iInCircle'
                  />
                ) : (
                  <EuiTabbedContent
                    tabs={
                      this.state.selectedVersion == 'redhat7' ||
                      this.state.selectedVersion == 'amazonlinux2022' ||
                      this.state.selectedVersion == 'centos7' ||
                      this.state.selectedVersion == 'suse11' ||
                      this.state.selectedVersion == 'suse12' ||
                      this.state.selectedVersion == 'amazonlinux2' ||
                      this.state.selectedVersion == '22' ||
                      this.state.selectedVersion == 'debian8' ||
                      this.state.selectedVersion == 'debian9' ||
                      this.state.selectedVersion == 'debian10' ||
                      this.state.selectedVersion == 'busterorgreater' ||
                      this.state.selectedVersion == 'busterorgreater' ||
                      this.state.selectedVersion === 'ubuntu15' ||
                      this.state.selectedVersion === 'leap15'
                        ? tabSystemD
                        : this.state.selectedVersion == 'windowsxp' ||
                          this.state.selectedVersion == 'windowsserver2008' ||
                          this.state.selectedVersion == 'windows7'
                        ? tabNet
                        : this.state.selectedVersion == 'sierra' ||
                          this.state.selectedVersion == 'highSierra' ||
                          this.state.selectedVersion == 'mojave' ||
                          this.state.selectedVersion == 'catalina' ||
                          this.state.selectedVersion == 'bigSur' ||
                          this.state.selectedVersion == 'monterrey' ||
                          this.state.selectedVersion == 'ventura'
                        ? tabWazuhControlMacos
                        : this.state.selectedVersion == 'solaris10' ||
                          this.state.selectedVersion == 'solaris11' ||
                          this.state.selectedVersion == '6.1 TL9' ||
                          this.state.selectedVersion == '3.12.12'
                        ? tabWazuhControl
                        : this.state.selectedVersion == '11.31'
                        ? tabInitD
                        : tabSysV
                    }
                    selectedTab={this.selectedSYS}
                    onTabClick={onTabClick}
                  />
                ),
              },
            ]
          : []),
      ];

      return (
        <div>
          <EuiPage restrictWidth='1000px' style={{ background: 'transparent' }}>
            <EuiPageBody>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiPanel>
                    <EuiFlexGroup>
                      <EuiFlexItem>
                        <EuiTitle>
                          <h2>Triển khai trạm mới</h2>
                        </EuiTitle>
                      </EuiFlexItem>
                      <EuiFlexItem grow={false}>
                        {this.props.hasAgents() && (
                          <EuiButtonEmpty
                            size='s'
                            onClick={() => this.props.addNewAgent(false)}
                            iconType='cross'
                          >
                            Đóng
                          </EuiButtonEmpty>
                        )}
                        {!this.props.hasAgents() && (
                          <EuiButtonEmpty
                            size='s'
                            onClick={() => this.props.reload()}
                            iconType='refresh'
                          >
                            Làm mới
                          </EuiButtonEmpty>
                        )}
                      </EuiFlexItem>
                    </EuiFlexGroup>
                    <EuiSpacer />
                    {this.state.loading && (
                      <>
                        <EuiFlexItem>
                          <EuiProgress size='xs' color='primary' />
                        </EuiFlexItem>
                        <EuiSpacer></EuiSpacer>
                      </>
                    )}
                    {!this.state.loading && (
                      <EuiFlexItem>
                        <EuiSteps steps={steps} />
                      </EuiFlexItem>
                    )}
                  </EuiPanel>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPageBody>
          </EuiPage>
        </div>
      );
    }
  },
);
