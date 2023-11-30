import { Form, Switch as FromSwitch } from 'antd';
import React from 'react';

export default function Switch(props: any) {
  const {
    control: { value, event },
    field: { label, visibility = 'visible' },
  } = props;

  return (
    <Form.Item label={label} style={{ width: '100% ' }}>
      <FromSwitch
        disabled={visibility === 'disable'}
        checked={value}
        onChange={event.onChange}
        onClick={event.onClick}
      />
    </Form.Item>
  );
}
