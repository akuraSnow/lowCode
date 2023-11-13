import { Form, Switch as FromSwitch } from 'antd';
import React from 'react';

export default function Switch(props: any) {
  const {
    control,
    field: { label, dataSource = [] },
  } = props;

  return (
    <Form.Item label={label} style={{ width: '100% ' }}>
      <FromSwitch defaultChecked={control.value} {...control.event} />
    </Form.Item>
  );
}
