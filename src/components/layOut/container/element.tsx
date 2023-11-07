import { connect } from 'umi';
import { operateItem, serialized, getInitJson, cuttingModule } from '@/utils';
import { chooseComponentSubject } from '@/services';
import styles from './index.less';
import { cloneDeep } from 'lodash';

const ElementContainer = (props: any): any => {
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
    console.log('key: ', key);
    chooseComponentSubject.next({
      ...dataSource,
      executeJs: functionObj[dataSource.id] || undefined,
    });

    dispatch({
      type: 'treeData/chooseKey',
      payload: { chooseKey: key },
    });
  }

  function onVerticalCut(container: any) {
    const { newCont, newKey } = cuttingModule(
      container.key,
      count,
      'rowContainer',
    );

    dispatch({
      type: 'treeData/changeTree',
      payload: { count: serialized(newCont, ''), chooseKey: newKey },
    });
  }

  function onCrossCut(container: any) {
    const { newCont, newKey } = cuttingModule(
      container.key,
      count,
      'colContainer',
    );

    dispatch({
      type: 'treeData/changeTree',
      payload: { count: serialized(newCont, ''), chooseKey: newKey },
    });
  }

  const operatorBtn = (container: any) => {
    return (
      chooseKey === dataKey && (
        <>
          <span
            className={styles.verticalCut}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onVerticalCut(container);
            }}
          ></span>
          <span
            className={styles.crossCut}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onCrossCut(container);
            }}
          ></span>
        </>
      )
    );
  };

  return (
    children && (
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
        {operatorBtn(dataSource)}
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
    )
  );
};

export default connect(({ treeData }: any) => ({
  treeData,
}))(ElementContainer);
