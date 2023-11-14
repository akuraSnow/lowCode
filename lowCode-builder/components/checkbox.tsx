import React from 'react';
import { Form, Checkbox as FromCheckbox } from 'antd';

export default function Checkbox(props: any) {
  const {
    control,
    field: { label, dataSource = [], metaData, visibility = 'visible' },
  } = props;

  return (
    <Form.Item label={label} style={{ width: '100% ' }}>
      <FromCheckbox.Group
        options={dataSource}
        defaultValue={control.value}
        disabled={visibility === 'disable'}
        {...metaData}
        {...control.event}
      />
    </Form.Item>
  );
}
