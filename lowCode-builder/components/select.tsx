import { Input as FormInput } from 'antd';
// import {, Space } from 'antd';
import { Button, Form, Input, Select as FromSelect } from 'antd';
import React from 'react';

const { Option } = FromSelect;

export default function Select(props: any) {
  const {
    control,
    field: { label, dataSource = [] },
  } = props;

  return (
    <Form.Item
      label={label}
      style={{ width: '100% ', height: '60px', lineHeight: '60px' }}
    >
      <FromSelect
        getPopupContainer={(triggerNode) => triggerNode.parentNode}
        defaultValue={control.value}
        {...control.event}
      >
        {dataSource.map(({ value, label }: any, index: number) => (
          <FromSelect.Option key={index} value={value}>
            {label}
          </FromSelect.Option>
        ))}
      </FromSelect>
    </Form.Item>
  );
}
