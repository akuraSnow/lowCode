import { Form, InputNumber as FormInputNumber } from 'antd';
import React from 'react';
import './index.css';

export default function Number(props: any) {
  const {
    control: { value, event, errorList },
    field: {
      label,
      metaData,
      layout: { labelCol, wrapperCol, layout = 'horizontal' },
    },
  } = props;

  const validateStatus = errorList.length === 0 ? 'success' : 'error';
  const validateMes = errorList[0] && errorList[0].mes;

  return (
    <Form
      layout={layout}
      labelCol={{ span: labelCol }}
      wrapperCol={{ span: wrapperCol }}
      style={{
        width: '100% ',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Form.Item
        label={label}
        validateStatus={validateStatus}
        help={validateMes}
      >
        <FormInputNumber
          {...metaData}
          {...event}
          type="number"
          value={value || ''}
        />
      </Form.Item>
    </Form>
  );
}
