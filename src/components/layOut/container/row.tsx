import React, { HTMLAttributes, memo, useEffect, useState } from 'react';
import ColContainer from './col';
import { connect } from 'umi';
import styles from './index.less';
import ElementContainer from './element';
import { operateItem } from '@/utils';
import { updateDataSubject } from '@/services';

const RowContainer = (props: any) => {
  const {
    container,
    treeData: { count, chooseKey },
    children,
  } = props;
  const { children: child, key } = container;

  return (
    children && (
      <div
        key={key}
        className={`${styles.rowContainer} ${
          chooseKey === key && styles.isChoose
        }`}
        draggable={false}
      >
        {children}
      </div>
    )
  );
};

export default connect(({ treeData }: any) => ({
  treeData,
}))(RowContainer);
