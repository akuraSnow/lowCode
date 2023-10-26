import React from 'react';
import Input from '../components/input';

const InputSkeleton = {
  type: 'input',
  label: '文本',
  labelAction: "function main(){\n  return '文本';\n}\n",
  visibility: "function main(){\n  return 'required';\n}\n",
  dataBinding: {
    path: 'path',
  },
  validators: 'function main(){\n  return [];\n}\n',
  Component: Input,
};

export default InputSkeleton;
