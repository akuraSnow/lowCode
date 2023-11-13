import { Input as FormInput } from 'antd';
// import {, Space } from 'antd';
import { Button, Form, Input, Transfer as FromTransfer } from 'antd';
import React from 'react';

export default function Transfer(props: any) {
  const {
    control,
    field: {
      label,
      dataSource = [],
      metaData: { titles },
    },
  } = props;

  return (
    <Form.Item label={label} style={{ width: '100% ' }}>
      <FromTransfer
        dataSource={dataSource}
        titles={titles}
        targetKeys={control.value}
        render={(item) => item.title}
        {...control.event}
      />
    </Form.Item>
  );
}
