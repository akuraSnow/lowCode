import React from 'react';
import Select from '../components/select';

const SelectSkeleton = {
  type: 'select',
  staticProperties: {
    label: '文本',
    dataBinding: {
      path: 'path',
    },
    transfer: '',
  },
  bindingMethod: {
    dataSource: 'function  main(){\n  return [];\n}\n',
    labelAction: "function  main(){\n  return '文本';\n}\n",
    visibility: "function  main(){\n  return 'required';\n}\n",
    metadata: {},
  },
  Component: Select,
};

export default SelectSkeleton;
