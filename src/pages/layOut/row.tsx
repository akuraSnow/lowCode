import React, { HTMLAttributes, useState } from 'react';
import ColContainer from './col';
import { connect } from 'umi';
import styles from './index.less';
import Element from './element';

const RowContainer = (props: any) => {

  const {
    container,
    treeData: { chooseKey },
  } = props;
  const { children, key } = container;


  return (<div
    key={key}
    className={`${styles.rowContainer} ${chooseKey === key && styles.isChoose}`}
    draggable={false}
  >

    <div className={styles.colContent}>
      {(children || []).map((content: any, i: any) => {
        return <Element key={`${i}-${new Date()}`} dataKey={content.key}>
          <ColContainer content={content}></ColContainer>
        </Element>;
      })}
    </div>
  </div>);
};

export default connect(({ treeData }: any) => ({
  treeData,
}))(RowContainer);
