import { connect } from 'umi';
import styles from './index.less';

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
