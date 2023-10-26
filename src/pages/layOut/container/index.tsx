import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import RowContainer from './row';
import Element from './element';
import styles from './index.less';
import { connect } from 'umi';
import { updateDataSubject, updateFunSubject } from '@/services';
import { operateItem } from '@/utils';

const Container = memo((props: any) => {
  const {
    treeData: { count, chooseKey, functionObj },
    dispatch,
  } = props;

  useEffect(() => {
    const a = updateDataSubject.subscribe((res: any) => {
      console.log('count: ', count);

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

  const renderContainer = (count: any) => {
    return count.map((container: any, k: any) => {
      const { children, type } = container;
      if (type === 'rowContainer') {
        return (
          <Element key={k} dataSource={container}>
            <RowContainer container={container}></RowContainer>
          </Element>
        );
      }

      return renderContainer(children);
    });
  };

  return <div className={styles.page}>{renderContainer(count)}</div>;
});

export default connect(({ treeData }: any) => ({
  treeData,
}))(Container);
