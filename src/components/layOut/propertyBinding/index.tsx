import React, { HTMLAttributes, useEffect, useState } from 'react';
import { connect } from 'umi';
import { Card, Tabs, Spin } from 'antd';
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
import { getJsonByPath } from '@/services/api';
import Property from './property';

const PropertyBinding = (props: any) => {
  const {
    container,
    treeData: { chooseKey },
  } = props;

  const [loading, setLoading] = React.useState<boolean>(true);
  const [optionList, setOptionList] = React.useState<any>({});

  const onChange = (key: string) => {
    console.log(key);
  };

  useEffect(() => {
    function callAllData(list: any) {
      const getDataList = list.map((path: any) => {
        return getJsonByPath({ path });
      });

      Promise.all(getDataList)
        .then((res: any) => {
          const data: any = {};
          list.forEach((element: any, index: number) => {
            data[element] = res[index].data;
          });
          setOptionList(data);
          setLoading(false);
        })
        .catch((err: any) => {
          setLoading(false);
        });
    }
    callAllData(['staticData', 'visibility', 'calculator']);
  }, []);

  const items = [
    {
      key: '1',
      label: '属性',
      children: <Property optionList={optionList}></Property>,
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
    <Card style={{ flex: '0 0 400px', height: '100%', overflow: 'auto' }}>
      <Spin spinning={loading} delay={10}>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </Spin>
    </Card>
  );
};

export default connect(({ treeData }: any) => ({
  treeData,
}))(PropertyBinding);
