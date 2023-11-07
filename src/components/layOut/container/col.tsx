import { connect } from 'umi';
import componentList from '../../../../lowCode-builder/materialPool/componentList';
import styles from './index.less';
import { operateItem, serialized } from '@/utils';
import ElementContainer from './element';
import RowContainer from './row';
import { memo } from 'react';

const ColContainer = (props: any): any => {
  const {
    container,
    treeData: { chooseKey },
    children,
  } = props;

  const { key, children: child } = container;

  return (
    <div
      key={key}
      className={`${styles.colContainer} ${
        chooseKey === key && styles.isChoose
      }`}
      draggable={false}
    >
      {children}
    </div>
  );
};

export default connect(({ treeData }: any) => ({
  treeData,
}))(ColContainer);
