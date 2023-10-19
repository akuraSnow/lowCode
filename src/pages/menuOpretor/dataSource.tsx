import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import CodeEditor from './codeEditor';

export default function DataSource(props: any): any {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '接口数据',
      children: <div>fff</div>,
    },
    {
      key: '2',
      label: '静态数据',
      children: <CodeEditor></CodeEditor>,
    },
    {
      key: '3',
      label: '导入文件',
      children: <div>导入文件</div>,
    },
  ];

  return (
    <div>
      <Tabs
        size={'small'}
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </div>
  );
}
