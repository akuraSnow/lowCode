import React from 'react';
import InputNumber from '../components/inputNumber';

const InputNumberSkeleton = {
  type: 'inputnumber',
  staticProperties: {
    label: '文本',
    dataBinding: {
      path: 'path',
    },
  },
  bindingMethod: {
    labelAction: "function main(){\n  return '文本';\n}\n",
    visibility: "function main(){\n  return 'required';\n}\n",
  },
  Component: InputNumber,
};

export default InputNumberSkeleton;
