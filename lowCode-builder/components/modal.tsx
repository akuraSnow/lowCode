import React, { useState } from 'react';
import { Button, Modal as ModalBuilder } from 'antd';

import { PageFormBuilder } from 'dynamic-builder';

const Modal = (props: any) => {
  const {
    control: { target, value },
    field: {
      label,
      labelAction,
      metaData: { onOk, onCancel, footer, jsonName },
    },
  } = props;

  const executeAction = (name, params?) => {
    target.executeAction(name, params);
  };

  console.log('jsonName: ', jsonName);

  let title = labelAction ? executeAction(labelAction) : label;

  return (
    <>
      <ModalBuilder
        {...props.field.metaData}
        title={title}
        open={value}
        onOk={() => executeAction(onOk)}
        onCancel={() => executeAction(onCancel)}
        footer={
          footer &&
          footer.map((item: any) => {
            const {
              element,
              onclick: { name, params },
            } = item;
            return (
              <span
                dangerouslySetInnerHTML={{ __html: element }}
                onClick={() => executeAction(name, params)}
              ></span>
            );
          })
        }
      >
        {React.createElement(ModelContent as any, { name: 'li' })}
      </ModalBuilder>
    </>
  );
};

export default Modal;

@PageFormBuilder({
  jsonName: 'config/home.json',
  provider: [],
})
class ModelContent {
  [x: string]: any;

  constructor(props: any) {}
}
