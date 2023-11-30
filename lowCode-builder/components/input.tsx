import { Form, Input as FormInput } from 'antd';
import React from 'react';
import './index.css';

export default function Input(props: any) {
  const {
    control: { value, event, errorList },
    field: {
      label,
      layout: { labelCol, wrapperCol, layout = 'horizontal' },
      visibility = 'visible',
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
        <FormInput
          disabled={visibility === 'disable'}
          value={value || ''}
          {...event}
        />
      </Form.Item>
    </Form>
  );
}
