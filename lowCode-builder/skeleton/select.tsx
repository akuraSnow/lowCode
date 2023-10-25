import React from 'react';
import Select from '../components/select';

const SelectSkeleton = {
  type: 'select',
  label: '文本',
  labelAction: "function (){\n  return '文本';\n}\n",
  visibility: "function (){\n  return 'required';\n}\n",
  metadata: {},
  dataBinding: 'select',
  validators: 'function (){\n  return [];\n}\n',
  Component: Select,
};

export default SelectSkeleton;
