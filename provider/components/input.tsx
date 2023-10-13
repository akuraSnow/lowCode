import { Form, Input as FormInput } from "antd";
import React from "react";

export default function Input(props: any) {
  const {
    control: {
        value,
        event,
        errorList
    },
    field: {
      id,
      label,
      dataBinding: { path },
    },
  } = props;

  const validateStatus = errorList.length === 0 ? "success" : "error";
  const validateMes = errorList[0] && errorList[0].mes;

  return (
    <div style={{ width: '100% '}}>
      <Form>
        <Form.Item label={label}  validateStatus={validateStatus} help={validateMes}>
          <FormInput value={value || ""} {...event} />
        </Form.Item>
      </Form>
    </div>
  );
}
