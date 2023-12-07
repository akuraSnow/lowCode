import React from 'react';
import { Button, Form, Input, Select, Space, Switch } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

export default function InterfaceDetail() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  const addRequestHeader = () => {
    console.log('addRequestHeader', form.getFieldsValue());
  };

  return (
    <div>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        initialValues={{ requestMethod: 'GET' }}
        style={{ maxWidth: 500 }}
      >
        <Form.Item name="type" label="类型">
          <Input />
        </Form.Item>
        <Form.Item name="dataId" label="数据源 ID" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="isAutoRequest" label="是否自动请求">
          <Switch />
        </Form.Item>
        <Form.Item
          name="requestUrl"
          label="请求地址"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="requestParams" label="请求参数">
          <Input />
        </Form.Item>
        <Form.Item
          name="requestMethod"
          label="请求方法"
          rules={[{ required: true }]}
        >
          <Select allowClear>
            <Option value="GET">GET</Option>
            <Option value="POST">POST</Option>
            <Option value="PUT">PUT</Option>
            <Option value="DELETE">DELETE</Option>
          </Select>
        </Form.Item>
        <Form.Item name="isSupportCrossDomain" label="是否支持跨域">
          <Switch />
        </Form.Item>
        <Form.Item name="timeoutDuration" label="超时时长（毫秒">
          <Input />
        </Form.Item>
        <Form.Item name="dataFunction" label="超时时长（毫秒">
          <Input />
        </Form.Item>

        <Form.List name="requestHeader">
          {(fields: any, { add, remove }: any, { errors }: any) => (
            <>
              {fields.map(({ key, name, ...restField }: any) => (
                <Space
                  key={key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    rules={[{ required: true, message: 'Missing value' }]}
                  >
                    <Input placeholder="name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'content']}
                    rules={[{ required: true, message: 'Missing value' }]}
                  >
                    <Input />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="primary" icon={<PlusOutlined />} onClick={add}>
                  添加请求头
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
