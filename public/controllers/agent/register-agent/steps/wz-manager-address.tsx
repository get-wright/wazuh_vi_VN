import React, { memo, useCallback, useEffect, useState } from 'react';
import { EuiText, EuiFieldText } from '@elastic/eui';

type Props = {
  onChange: (value: string) => void;
  defaultValue?: string;
};

const WzManagerAddressInput = (props: Props) => {
  const { onChange, defaultValue } = props;
  const [value, setValue] = useState('');

  useEffect(() => {
    if(defaultValue){
      setValue(defaultValue);
      onChange(defaultValue);
    }else{
      setValue('');
      onChange('');
    }
  },[])
  /**
   * Handles the change of the selected node IP
   * @param value
   */
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(value);
    setValue(value);
  };
  return (
    <EuiText>
      <p>
        Đây là địa chỉ mà agent sử dụng để giao tiếp với máy chủ Wazuh, có thể là địa chỉ IP hoặc tên miền đủ điều kiện (FQDN).
      </p>
      <EuiFieldText
        placeholder='Nhập địa chỉ máy chủ Wazuh'
        onChange={handleOnChange}
        value={value}
      />
    </EuiText>
  );
};

export default WzManagerAddressInput;
