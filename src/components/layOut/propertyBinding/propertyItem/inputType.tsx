import { Form, Input } from 'antd';
import React from 'react';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export default function InputType(props: any) {
  const { name, path, defaultVal, outFunction } = props;
  const [form] = Form.useForm();

  const getValue = () => {
    console.log(form.getFieldsValue());

    outFunction(form.getFieldsValue());
  };

  return (
    <Form {...layout} form={form} style={{ maxWidth: 600, marginTop: 20 }}>
      <Form.Item label={name} name={path}>
        <Input defaultValue={defaultVal} onBlur={getValue} />
      </Form.Item>
    </Form>
  );
}
