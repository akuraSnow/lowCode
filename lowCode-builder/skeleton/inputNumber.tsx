import React from 'react';
import Number from '../components/inputNumber';

const InputNumberSkeleton = {
  type: 'number',
  staticProperties: ['label', 'path', 'validator', 'visibility', 'labelAction'],
  Component: Number,
};

export default InputNumberSkeleton;
