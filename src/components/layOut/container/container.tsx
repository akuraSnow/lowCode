import { connect } from 'umi';
import componentList from '../../../../lowCode-builder/materialPool/componentList';
import styles from './index.less';
import { operateItem, serialized, getInitJson } from '@/utils';
import ElementContainer from './element';
import RowContainer from './row';
import { memo } from 'react';

const Container = (props: any): any => {
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

  const showContent = (List: any) => {
    return (List.children || []).map((item: any, index: number) => {
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
      className={`${styles.container} ${chooseKey === key && styles.isChoose}`}
      onDrop={(ev) => drop_handler(ev, key)}
      onDragOver={dragover_handler}
      data-name={chooseKey !== key && name}
    >
      {/* {operatorBtn(content)} */}
      <div className={styles.containerSequence}>{showContent(content)}</div>
    </div>
  );
};

export default connect(({ treeData }: any) => ({
  treeData,
}))(Container);
