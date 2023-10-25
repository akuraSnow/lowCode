import React, { useEffect, useState } from 'react';

import RowContainer from './row';
import Element from './element';
import styles from './index.less';
import { connect } from 'umi';
import { updateDataSubject } from '@/services';
import { operateItem } from '@/utils';

function Container(props: any) {
  const {
    treeData: { count, chooseKey },
    dispatch,
  } = props;

  updateDataSubject.subscribe((res: any) => {
    const newCont = operateItem(count, chooseKey, (element: any, i: any) => {
      element[res.name] = res.value;
      return element;
    });

    dispatch({
      type: 'treeData/changeTree',
      payload: { count: newCont },
    });
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
}

export default connect(({ treeData }: any) => ({
  treeData,
}))(Container);
