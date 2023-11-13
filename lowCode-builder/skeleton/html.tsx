import React from 'react';
import Html from '../components/html';

const HtmlSkeleton = {
  type: 'html',
  staticProperties: {
    label: '文本',
    dataBinding: {
      path: 'path',
    },
  },
  bindingMethod: {
    labelAction: "function main(){\n  return '';\n}\n",
    visibility: "function main(){\n  return '';\n}\n",
  },
  Component: Html,
};

export default HtmlSkeleton;
