import { connect } from 'umi';
import componentList from '../../../../lowCode-builder/materialPool/componentList';
import styles from './index.less';
import { operateItem, serialized } from '@/utils';
import ElementContainer from './element';
import RowContainer from './row';
import { memo } from 'react';

const ColContainer = (props: any): any => {
  const {
    content,
    dispatch,
    treeData: { count, chooseKey },
  } = props;

  const { key } = content;

  function dragover_handler(e: any) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
  }

  function drop_handler(ev: any, key: string) {
    const type = ev.dataTransfer.getData('type');

    const list = operateItem(count, key, (element: any) => {
      element.children = element.children || [];
      const key = element.key + '-' + element.children.length;
      element.children.push({
        id: `${key.split('-').join('')}${type}`,
        key,
        type,
      });
      return element;
    });

    dispatch({
      type: 'treeData/changeTree',
      payload: { count: list },
    });
  }

  function onVerticalCut(container: any) {
    const keyList = container.key.split('-');
    const parentKey = keyList.splice(0, keyList.length - 1).join('-');

    let newCont = operateItem(count, parentKey, (element: any, i: any) => {
      element.children = element.children || [];
      element.children.splice(Number(keyList[keyList.length - 1]) + 1, 0, {
        name: '列容器',
        key: element.key + '-' + element.children.length,
        type: 'colContainer',
        children: [],
      });
      return element;
    });

    dispatch({
      type: 'treeData/changeTree',
      payload: { count: serialized(newCont, '') },
    });
  }

  function onCrossCut(container: any) {
    const keyList = container.key.split('-');
    const order = keyList[keyList.length - 2];
    const parentKey = keyList.splice(0, keyList.length - 2).join('-');
    console.log('parentKey: ', parentKey);

    let newCont = operateItem(count, container.key, (element: any, i: any) => {
      element.children = element.children || [];
      element.children.splice(Number(order) + 1, 0, {
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

  const operatorBtn = (container: any) => {
    return (
      chooseKey === key && (
        <>
          <span
            className={styles.verticalCut}
            onClick={onVerticalCut.bind(this, container)}
          ></span>
          <span
            className={styles.crossCut}
            onClick={onCrossCut.bind(this, container)}
          ></span>
        </>
      )
    );
  };

  const showContent = (List: any) => {
    return (List.children || []).map((item: any, index: number) => {
      if (item.type === 'rowContainer') {
        return (
          <ElementContainer key={index} dataSource={item}>
            <RowContainer container={item}></RowContainer>
          </ElementContainer>
        );
      }
      const element = componentList.filter((k: any) => k.type === item.type);
      const [{ Component }] = element;

      const initProps = {
        control: { value: '', event: {}, errorList: [] },
        field: {
          id: key,
          label: '文本',
          layoutDefinition: {},
          css: {},
          dataBinding: { path: '' },
          ...item,
        },
      };

      return (
        <ElementContainer key={`${item.key}-${new Date()}`} dataSource={item}>
          <div className={styles.componentItem}>
            <Component {...initProps} />
          </div>
        </ElementContainer>
      );
    });
  };

  return (
    <div
      key={key}
      className={`${styles.colContainer} ${
        chooseKey === key && styles.isChoose
      }`}
      onDrop={(ev) => drop_handler(ev, key)}
      onDragOver={dragover_handler}
      data-name={chooseKey !== key && name}
    >
      {operatorBtn(content)}
      <div className={styles.containerSequence}>{showContent(content)}</div>
    </div>
  );
};

export default connect(({ treeData }: any) => ({
  treeData,
}))(ColContainer);
