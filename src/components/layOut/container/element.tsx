import { connect } from 'umi';
import { operateItem, serialized } from '@/utils';
import styles from './index.less';
import { chooseComponentSubject } from '@/services';

const OperateElement = (props: any): any => {
  const {
    children,
    dispatch,
    dataSource,
    treeData: { count, chooseKey, functionObj },
  } = props;

  const dataKey = dataSource.key;

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
    chooseComponentSubject.next({
      ...dataSource,
      executeJs: functionObj[dataSource.id] || undefined,
    });

    dispatch({
      type: 'treeData/chooseKey',
      payload: { chooseKey: key },
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
        className={`${styles.deleteBtn} ${
          chooseKey === dataKey && styles.checkBtn
        }`}
      >
        删除
      </div>
      {children}
    </div>
  );
};

export default connect(({ treeData }: any) => ({
  treeData,
}))(OperateElement);
