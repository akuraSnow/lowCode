import React from 'react';
import Input from '../components/input';

const InputSkeleton = {
  type: 'input',
  label: '文本',
  labelAction: "function (){\n  return '文本';\n}\n",
  visibility: "function (){\n  return 'required';\n}\n",
  dataBinding: 'input',
  validators: 'function (){\n  return [];\n}\n',
  Component: Input,
};

export default InputSkeleton;
