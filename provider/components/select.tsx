import { Input as FormInput } from 'antd';
// import {, Space } from 'antd';
import { Button, Form, Input, Select as FromSelect } from 'antd';
import React from 'react';

const { Option } = FromSelect;

export default function Select(props: any) {
  const {
    control,
    field: { dataSourceList },
  } = props;

  return (
    <Form.Item style={{ width: '100% ' }}>
      <FromSelect
        defaultValue={control.value}
        {...control.event}
        options={dataSourceList}
      />
    </Form.Item>
  );
}
