import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { operateItem, serialized } from '@/utils';
import RowContainer from './row';
import ElementContainer from './element';
import styles from './index.less';
import { connect } from 'umi';

const Container = memo((props: any) => {
  const {
    treeData: { count, chooseKey, functionObj },
    dispatch,
  } = props;

  function addComponent(container: any) {
    let newCont = operateItem(count, '0-0-0', (element: any, i: any) => {
      element.children.push({
        name: '行容器',
        key: element.key + '-' + element.children.length,
        type: 'rowContainer',
        children: [
          {
            name: '列容器',
            key: element.key + '-' + element.children.length + '-' + '0',
            type: 'colContainer',
            children: [],
          },
        ],
      });

      return element;
    });

    dispatch({
      type: 'treeData/changeTree',
      payload: { count: serialized(newCont, '') },
    });
  }

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

  return (
    <div className={styles.page}>
      {renderContainer(count)}
      <div className={styles.addBtn}>
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size={'small'}
          onClick={addComponent}
        />
      </div>
    </div>
  );
});

export default connect(({ treeData }: any) => ({
  treeData,
}))(Container);
