import React from 'react';
import Select from '../components/select';

const SelectSkeleton = {
  type: 'select',
  staticProperties: [
    'label',
    'path',
    'dataSourceAction',
    'validator',
    'visibility',
    'labelAction',
  ],
  Component: Select,
};

export default SelectSkeleton;
