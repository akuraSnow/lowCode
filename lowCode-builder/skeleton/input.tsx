import React from 'react';
import Input from '../components/input';

const InputSkeleton = {
  type: 'input',
  staticProperties: ['label', 'path', 'validator', 'visibility', 'labelAction'],
  Component: Input,
};

export default InputSkeleton;
