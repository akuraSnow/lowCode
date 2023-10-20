import { connect } from 'umi';
import componentList from '../../materialPool/componentList';
import styles from './index.less';
import { operateItem } from '@/utils';
import Element from './element';

const ColContainer = (props: any): any => {
  const {
    content,
    dispatch,
    treeData: { count, chooseKey },
  } = props;

  const { key } = content;

  function chooseContainer(key: any) {
    dispatch({
      type: 'treeData/chooseKey',
      payload: { chooseKey: key },
    });
  }

  function dragover_handler(e: any) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
  }

  function drop_handler(ev: any, key: string) {
    const type = ev.dataTransfer.getData('type');

    const list = operateItem(count, key, (element: any) => {
      element.children = element.children || [];
      element.children.push({
        key: element.key + '-' + element.children.length,
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

    let newCont = operateItem(count, parentKey, (element: any, i: any) => {
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

  function serialized(list: any, key: any) {
    return list
      .filter((item: any) => {
        return item.type !== 'rowContainer' || item.children.length > 0;
      })
      .map((item: any, index: number) => {
        item.key = key ? key + '-' + index : `${index}`;
        if (Array.isArray(item.children)) {
          item.children = serialized(item.children, item.key);
        }
        return item;
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
      const element = componentList.filter((k: any) => k.type === item.type);
      const { component } = element[0];

      return (
        <Element key={`${item.key}-${new Date()}`} dataKey={item.key}>
          <div className={styles.componentItem}>{component}</div>
        </Element>
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
      onClick={(e: any) => {
        e.preventDefault();
        e.stopPropagation();
        chooseContainer.call(this, key);
      }}
    >
      {operatorBtn(content)}
      <div className={styles.containerSequence}>{showContent(content)}</div>
    </div>
  );
};

export default connect(({ treeData }: any) => ({
  treeData,
}))(ColContainer);
