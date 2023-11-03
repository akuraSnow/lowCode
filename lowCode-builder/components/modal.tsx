import React, { useState } from 'react';
import { Button, Modal as ModalBuilder } from 'antd';

import { PageFormBuilder } from 'dynamic-builder';

const Modal = (props: any) => {
  const {
    control: { target, value },
    field: {
      metaData: { onOk, onCancel, footer, jsonName },
    },
  } = props;

  const executeAction = (name, params?) => {
    target.executeAction(name, params);
  };

  return (
    <>
      <ModalBuilder
        {...props.field.metaData}
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
        {React.createElement(ModelContent as any, {
          jsonName,
          target,
          viewModel: value,
        })}
      </ModalBuilder>
    </>
  );
};

export default Modal;

@PageFormBuilder({})
class ModelContent {
  [x: string]: any;

  constructor(props: any) {
    this.content = props;
  }

  componentDidMount() {
    // const { jsonName, target: { target }, value } = this.target.content;
    // console.log('value: ', value);
    // this.loadJson({
    //   jsonName,
    // });
    // for (const key in target) {
    //   if (Object.prototype.hasOwnProperty.call(target, key)) {
    //     this.target[key] = target[key];
    //   }
    // }
    // console.log(this.target);
  }
}
