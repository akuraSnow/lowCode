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

  console.log('jsonName: ', props.field.metaData);

  let title = labelAction ? executeAction(labelAction) : label;

  return (
    <>
      <ModalBuilder
        {...props.field.metaData}
        title={title}
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
        {React.createElement(ModelContent as any, { jsonName, target })}
      </ModalBuilder>
    </>
  );
};

export default Modal;

@PageFormBuilder({})
class ModelContent {
  [x: string]: any;

  constructor(props: any) {
    console.log('props: ', props);

    setTimeout(() => {
      this.loadJson({
        jsonName: props.jsonName,
      });
      // this.target = props.target.target;
    });
  }
}
