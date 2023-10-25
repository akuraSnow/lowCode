import React, { HTMLAttributes, useState } from 'react';
import { connect } from 'umi';
import { Card, Tabs } from 'antd';
import Event from './event';
import styles from './index.less';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';

import 'codemirror/theme/dracula.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/mdn-like.css';
import 'codemirror/theme/the-matrix.css';
import 'codemirror/theme/night.css';
import Attribute from './attribute';

const PropertyBinding = (props: any) => {
  const {
    container,
    treeData: { chooseKey },
  } = props;

  const onChange = (key: string) => {
    console.log(key);
  };

  const items = [
    {
      key: '1',
      label: '属性',
      children: <Attribute data={chooseKey} />,
    },
    {
      key: '2',
      label: '事件',
      children: <Event />,
    },
    {
      key: '3',
      label: '样式',
      children: '样式',
    },
  ];

  return (
    <Card style={{ width: '35%', height: '100%' }}>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </Card>
  );
};

export default connect(({ treeData }: any) => ({
  treeData,
}))(PropertyBinding);
