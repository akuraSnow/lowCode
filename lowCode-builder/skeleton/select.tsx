import React from 'react';
import Select from '../components/select';

const SelectSkeleton = {
  type: 'select',
  label: '文本',
  dataSource: 'function  main(){\n  return [];\n}\n',
  labelAction: "function  main(){\n  return '文本';\n}\n",
  visibility: "function  main(){\n  return 'required';\n}\n",
  metadata: {},
  dataBinding: {
    path: 'select',
  },
  validators: 'function main(){\n  return [];\n}\n',
  Component: Select,
};

export default SelectSkeleton;
