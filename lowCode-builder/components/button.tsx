import { Button as ButtonFrom } from 'antd';
import React from 'react';

export default function Button(props: any) {
  const {
    control: { event },
    field: { label = '', metaData: { type = 'primary' } = {} },
  } = props;

  return (
    <ButtonFrom type={type} {...event}>
      {label}
    </ButtonFrom>
  );
}
