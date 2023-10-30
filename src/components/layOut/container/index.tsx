import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import RowContainer from './row';
import ElementContainer from './element';
import styles from './index.less';
import { connect } from 'umi';

const Container = memo((props: any) => {
  const {
    treeData: { count, chooseKey, functionObj },
    dispatch,
  } = props;

  const renderContainer = (count: any) => {
    return count.map((container: any, k: any) => {
      const { children, type } = container;
      if (type === 'rowContainer') {
        return (
          <ElementContainer key={k} dataSource={container}>
            <RowContainer container={container}></RowContainer>
          </ElementContainer>
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
