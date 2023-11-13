import { Form, Select as FromSelect } from 'antd';
import React from 'react';

export default function Select(props: any) {
  const {
    control,
    field: { label, dataSource = [], metaData },
  } = props;

  return (
    <Form.Item label={label} style={{ width: '100% ' }}>
      <FromSelect
        getPopupContainer={(triggerNode) => triggerNode.parentNode}
        defaultValue={control.value}
        filterOption={(input: string, option: any) => {
          return (option?.label + option?.children ?? '').indexOf(input) > -1;
        }}
        {...metaData}
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
