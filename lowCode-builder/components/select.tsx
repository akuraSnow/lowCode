import { Input as FormInput } from 'antd';
// import {, Space } from 'antd';
import { Button, Form, Input, Select as FromSelect } from 'antd';
import React from 'react';

const { Option } = FromSelect;

export default function Select(props: any) {
  console.log('props: ', props);
  const {
    control,
    field: { label, dataSourceList },
  } = props;

  return (
    <Form.Item label={label} style={{ width: '100% ' }}>
      <FromSelect
        defaultValue={control.value}
        {...control.event}
        options={dataSourceList}
      />
    </Form.Item>
  );
}
