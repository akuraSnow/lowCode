import { Menu, Drawer, Layout as LayoutFrom } from 'antd';
import { connect, history } from 'umi';
import OperateList from '@/components/operateList';
import initBuilder from '../../lowCode-builder/index';
import { updateDataSubject, updateFunSubject } from '@/services';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import styles from './index.less';

import { operateItem } from '@/utils';

const { Header } = LayoutFrom;

const headerStyle: any = {
  display: 'flex',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#fff',
};

initBuilder();

function Layout(props: any) {
  const {
    treeData: { count, chooseKey, functionObj },
    dispatch,
  } = props;

  useEffect(() => {
    const a = updateDataSubject.subscribe((res: any) => {
      const newCont = operateItem(count, chooseKey, (element: any) => {
        element[res.name] = res.value;
        return element;
      });

      dispatch({
        type: 'treeData/changeTree',
        payload: { count: newCont },
      });
    });

    const b = updateFunSubject.subscribe((res: any) => {
      const { id, type, value } = res;

      const newFunctionObj = JSON.parse(JSON.stringify(functionObj));

      newFunctionObj[id] = functionObj[id] || {};
      newFunctionObj[id][type] = value || '';
      console.log('functionObj: ', newFunctionObj);

      dispatch({
        type: 'treeData/saveFunction',
        payload: { functionObj: newFunctionObj },
      });
    });

    return () => {
      a.unsubscribe();
      b.unsubscribe();
    };
  });

  return (
    <div className={styles.content}>
      <LayoutFrom>
        <Header style={headerStyle}>
          <OperateList></OperateList>
        </Header>
        {props.children}
      </LayoutFrom>
    </div>
  );
}

export default connect(({ treeData }: any) => ({
  treeData,
}))(Layout);
