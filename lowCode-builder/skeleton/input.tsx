import React from 'react';
import Input from '../components/input';

const InputSkeleton = {
  type: 'input',
  staticProperties: {
    label: '文本',
    dataBinding: {
      path: 'path',
    },
  },
  bindingMethod: {
    labelAction: "function main(){\n  return '文本';\n}\n",
    dataSource: [],
    visibility: "function main(){\n  return 'required';\n}\n",
    validators: 'function main(){\n  return [];\n}\n',
  },
  Component: Input,
};

export default InputSkeleton;
