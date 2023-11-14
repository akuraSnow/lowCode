import { Button as ButtonFrom } from 'antd';
import React from 'react';

export default function Button(props: any) {
  const {
    control: { event },
    field: {
      label = '',
      metaData: { type = 'primary' } = {},
      visibility = 'visible',
    },
  } = props;

  return (
    <ButtonFrom disabled={visibility === 'disable'} type={type} {...event}>
      {label}
    </ButtonFrom>
  );
}
