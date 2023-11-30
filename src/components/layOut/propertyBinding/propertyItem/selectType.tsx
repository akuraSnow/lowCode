import { Switch, Form, Input, Select, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';

const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export default function SelectType(props: any) {
  const {
    name,
    path,
    option: dataSource = [],
    mode,
    outFunction,
    defaultVal,
  } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldValue('switchVal', !!defaultVal);
  }, []);

  const onchange = (value: any) => {
    outFunction(value);
  };

  return (
    <Form {...layout} form={form} style={{ maxWidth: 600, marginTop: 20 }}>
      <Row>
        <Col span={24}>
          <Form.Item name={'switchVal'} label={name}>
            <Switch
              defaultChecked={!!defaultVal}
              onChange={(value: any) => {
                !value && outFunction(undefined);
              }}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.switchVal !== currentValues.switchVal
            }
          >
            {({ getFieldValue }) => {
              return getFieldValue('switchVal') === true ? (
                <Form.Item label={''} name={path} style={{ marginTop: 10 }}>
                  <Select
                    showSearch
                    mode={mode}
                    defaultValue={defaultVal}
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                    filterOption={(input: string, option: any) => {
                      return (
                        (option?.label + option?.children ?? '').indexOf(
                          input,
                        ) > -1
                      );
                    }}
                    onChange={onchange}
                  >
                    {dataSource.map(({ value, label }: any, index: number) => (
                      <Select.Option key={index} value={value}>
                        {label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              ) : null;
            }}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
