import React from 'react';
import Html from '../components/html';

const HtmlSkeleton = {
  type: 'html',
  label: '文本',
  labelAction: "function main(){\n  return '';\n}\n",
  visibility: "function main(){\n  return '';\n}\n",
  dataBinding: {
    path: 'path',
  },
  Component: Html,
};

export default HtmlSkeleton;
