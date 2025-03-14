import React from 'react';
import {
	EuiButton,
	EuiFlexGroup,
	EuiFlexItem,
} from '@elastic/eui';
import { PLUGIN_PLATFORM_NAME } from '../../../../../../../common/constants';
import { getToasts } from '../../../../../../kibana-services';

export const toastRequiresReloadingBrowserTab = () => {
	getToasts().add({
	  color: 'success',
	  title: 'Tải lại trang để áp dụng thay đổi',
	  text: <EuiFlexGroup justifyContent="flexEnd" gutterSize="s">
		<EuiFlexItem grow={false}>
		  <EuiButton onClick={() => window.location.reload()} size="s">Reload page</EuiButton>
		</EuiFlexItem>
	  </EuiFlexGroup>
	});
};
  
export const toastRequiresRunningHealthcheck = () => {
	const toast = getToasts().add({
	  color: 'warning',
	  title: 'Chạy kiểm tra sức khỏe để áp dụng thay đổi',
	  toastLifeTimeMs: 5000,
	  text:
		<EuiFlexGroup alignItems="center" gutterSize="s">
		  <EuiFlexItem grow={false} >
			<EuiButton onClick={() => {
			  getToasts().remove(toast);
			  window.location.href = '#/health-check';
			}} size="s">Execute health check</EuiButton>
		  </EuiFlexItem>
		</EuiFlexGroup>
	});
};
  
export const toastRequiresRestartingPluginPlatform = () => {
	getToasts().add({
	  color: 'warning',
	  title: `Restart ${PLUGIN_PLATFORM_NAME} to apply the changes`,
	});
};
  
export const toastSuccessUpdateConfiguration = () => {
	getToasts().add({
	  color: 'success',
	  title: 'Cấu hình đã được cập nhật thành công',
	});
};