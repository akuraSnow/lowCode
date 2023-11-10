import React from 'react';
import InputNumber from '../components/inputNumber';

const InputNumberSkeleton = {
  type: 'inputnumber',
  label: '文本',
  labelAction: "function main(){\n  return '文本';\n}\n",
  visibility: "function main(){\n  return 'required';\n}\n",
  dataBinding: {
    path: 'path',
  },
  validators: 'function main(){\n  return [];\n}\n',
  Component: InputNumber,
};

export default InputNumberSkeleton;
