import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { operateItem, serialized } from '@/utils';
import RowContainer from './row';
import ColContainer from './col';
import Container from './container';
import ElementContainer from './element';
import styles from './index.less';
import { connect } from 'umi';

const Content = memo((props: any) => {
  const {
    treeData: { count, chooseKey, functionObj },
    dispatch,
  } = props;

  function addComponent(container: any) {
    let newCont = operateItem(count, '0-0-0', (element: any, i: any) => {
      element.children.push({
        key: element.key + '-' + element.children.length,
        type: 'container',
        children: [],
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
      const { children, type, width } = container;
      if (type === 'rowContainer') {
        return (
          <ElementContainer key={`${k}-${new Date()}`} dataSource={container}>
            <RowContainer key={`${k}-${new Date()}`} container={container}>
              {renderContainer(children)}
            </RowContainer>
          </ElementContainer>
        );
      } else if (type === 'colContainer') {
        return (
          <ElementContainer key={`${k}-${new Date()}`} dataSource={container}>
            <ColContainer key={`${k}-${new Date()}`} container={container}>
              {renderContainer(children)}
            </ColContainer>
          </ElementContainer>
        );
      } else if (type === 'container') {
        return (
          <ElementContainer
            width={width}
            key={`${k}-${new Date()}`}
            dataSource={container}
          >
            <Container key={k} content={container}></Container>
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
}))(Content);
