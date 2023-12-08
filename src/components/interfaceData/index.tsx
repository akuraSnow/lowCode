import React, { useEffect } from 'react';
import { Button, Form, Input, Select, Space, Switch } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import CodeEditor from '../menuOpretor/codeEditor';
import Editor from '../menuOpretor/editor';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const layout1 = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function InterfaceDetail(props: any) {
  const { save, currentData } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(currentData);
  }, [JSON.stringify(currentData)]);

  const onFinish = (values: any) => {
    const value = form.getFieldsValue();
    const { requestHeader = [] } = value;

    value.requestHeader = requestHeader.map(({ content, name }: any) => {
      return { content, name };
    });

    save(value);
  };

  const options = [
    {
      label: '请求前对参数的处理',
      value: 'requestBefore',
    },
    {
      label: '对成功结果的处理',
      value: 'requestSuccessAfter',
    },
    {
      label: '对异常的处理',
      value: 'catchErr',
    },
  ];

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
        <Form.Item label="请求参数" name="requestParams">
          <Form.List name="requestParams">
            {(fields: any, { add, remove }: any, { errors }: any) => (
              <>
                {fields.map(({ key, name, ...restField }: any) => (
                  <Space key={key} style={{ display: 'flex' }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      rules={[{ required: true, message: '请输入name' }]}
                    >
                      <Input placeholder="name" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'content']}
                      rules={[{ required: true, message: '请输入content' }]}
                    >
                      <Input />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Button type="primary" icon={<PlusOutlined />} onClick={add}>
                  添加
                </Button>
                <Form.ErrorList errors={errors} />
              </>
            )}
          </Form.List>
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
        <Form.Item label="添加请求头" name="requestHeader">
          <Form.List name="requestHeader">
            {(fields: any, { add, remove }: any, { errors }: any) => (
              <>
                {fields.map(({ key, name, ...restField }: any) => (
                  <Space key={key} style={{ display: 'flex' }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      rules={[{ required: true, message: '请输入name' }]}
                    >
                      <Input placeholder="name" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'content']}
                      rules={[{ required: true, message: '请输入content' }]}
                    >
                      <Input />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Button type="primary" icon={<PlusOutlined />} onClick={add}>
                  添加
                </Button>
                <Form.ErrorList errors={errors} />
              </>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item label="添加数据处理函数" name="handleFunction">
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder=""
            optionLabelProp="label"
            options={options}
          />
        </Form.Item>
        <Form.Item
          label=""
          {...layout1}
          shouldUpdate={(prevValues, curValues) =>
            prevValues.handleFunction !== curValues.handleFunction
          }
        >
          {({ getFieldValue }) => {
            const handleFunctionList: any =
              getFieldValue('handleFunction') || [];

            return (handleFunctionList || []).map((item: any, key: number) => {
              const label = options.find((e) => e.value === item)?.label;

              return (
                <Form.Item
                  key={item}
                  name={item}
                  label={label}
                  initialValue={'function (res){\n  return res.data;\n}\n'}
                  {...layout}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: '请输入',
                    },
                  ]}
                >
                  <Editor language="javascript" />
                </Form.Item>
              );
            });
          }}
        </Form.Item>
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
