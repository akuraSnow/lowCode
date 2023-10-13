import { connect } from 'umi';
import { operateItem } from '@/utils';
import styles from './index.less';

function OperateElement(props: any): any {
  const {
    children,
    dispatch,
    dataKey,
    treeData: { count, chooseKey },
  } = props;

  const keyList = dataKey.split('-');
  const parentKey = keyList.splice(0, keyList.length - 1).join('-');

  function deleteContainer(key: any) {
    const currentKey = keyList[keyList.length - 1];
    const newCont = operateItem(count, key, (element: any, i: any) => {
      element.children.splice(currentKey, 1);
      return element;
    });

    dispatch({
      type: 'treeData/changeTree',
      payload: { count: serialized(newCont, ''), chooseKey: '0' },
    });
  }

  function chooseElContainer(key: any) {
    dispatch({
      type: 'treeData/chooseKey',
      payload: { chooseKey: key },
    });
  }

  function serialized(list: any, key: any) {
    return list.filter((item: any) => (item.type !== 'rowContainer' || item.children.length > 0)).map((item: any, index: number) => {
      item.key = key ? key + '-' + index : `${index}`;
      if (Array.isArray(item.children)) {
        item.children = serialized(item.children, item.key);
      }
      return item;
    });
  }

  return (
    <div
      className={`${styles.itemContainer} ${
        chooseKey === dataKey && styles.chooseBtn
      }`}
      onClick={(e: any) => {
        e.preventDefault();
        e.stopPropagation();
        chooseElContainer(dataKey);
      }}
    >
      <div
        onClick={(e: any) => {
          e.preventDefault();
          e.stopPropagation();
          deleteContainer(parentKey);
        }}
        className={`${styles.deleteBtn} ${chooseKey === dataKey && styles.checkBtn}`}
      >
        删除
      </div>
      {children}
    </div>

  );
}

export default Element = connect(({ treeData }: any) => ({
  treeData,
}))(OperateElement);
