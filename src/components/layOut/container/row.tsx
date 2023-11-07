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
    dispatch,
    treeData: { count, chooseKey },
  } = props;
  const { children, key } = container;

  return (
    <div
      key={key}
      className={`${styles.rowContainer} ${
        chooseKey === key && styles.isChoose
      }`}
      draggable={false}
    >
      <div className={styles.colContent}>
        {(children || []).map((content: any, i: any) => {
          if (
            content?.children &&
            content?.children[0]?.children[0] === 'colContainer'
          ) {
            return <ColContainer key={k} content={content}></ColContainer>;
          }
          return (
            <ElementContainer key={`${i}-${new Date()}`} dataSource={content}>
              <ColContainer content={content}></ColContainer>
            </ElementContainer>
          );
        })}
      </div>
    </div>
  );
};

export default connect(({ treeData }: any) => ({
  treeData,
}))(RowContainer);
