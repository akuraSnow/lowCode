import React from 'react';
import Html from '../components/html';

const HtmlSkeleton = {
  type: 'html',
  label: '文本',
  labelAction: "function (){\n  return '';\n}\n",
  visibility: "function (){\n  return '';\n}\n",
  dataBinding: 'path',
  Component: Html,
};

export default HtmlSkeleton;
