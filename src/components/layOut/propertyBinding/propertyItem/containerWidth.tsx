import { Button, Form, Input, Select, InputNumber, Row, Col } from 'antd';
import { useState } from 'react';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const ContainerWidth = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState<string | number | null>(100);

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Form
      {...layout}
      form={form}
      onFinish={onFinish}
      style={{ maxWidth: 600, marginTop: 20 }}
    >
      <Row>
        <Col span={12}>
          <Form.Item name="note" label="宽度">
            <InputNumber min={1} max={10} value={value} onChange={setValue} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="unit">
            <Select placeholder="单位">
              <Option value="px">px</Option>
              <Option value="%">%</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
