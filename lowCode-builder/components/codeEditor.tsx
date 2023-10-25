import { Form, Input as FormInput } from 'antd';
import React from 'react';
import Editor from '../../src/pages/menuOpretor/editor';

export default function CodeEditor(props: any) {
  const {
    control: { value, event, errorList },
    field: {
      id,
      label,
      layoutDefinition: {
        labelCol = 8,
        wrapperCol = 16,
        layout = 'horizontal',
      } = {},
      css: { height = '200px' } = {},
      dataBinding: { path },
    },
  } = props;

  const validateStatus = errorList.length === 0 ? 'success' : 'error';
  const validateMes = errorList[0] && errorList[0].mes;

  return (
    <Form
      layout={layout}
      labelCol={{ span: labelCol }}
      wrapperCol={{ span: wrapperCol }}
      style={{ width: '100% ' }}
    >
      <Form.Item
        label={label}
        validateStatus={validateStatus}
        help={validateMes}
      >
        <Editor
          language="javascript"
          height={height}
          value={value || "function (){\n  return '';\n}\n"}
          {...event}
        />
      </Form.Item>
    </Form>
  );
}
