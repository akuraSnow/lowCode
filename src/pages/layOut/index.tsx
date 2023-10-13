import React, { useState } from "react";

import RowContainer from './row';
import Element from './element';
import styles from "./index.less";
import { connect } from "umi";

function Container(props: any) {
  // const [count, setCount] = useState([]);

  const { treeData: { count }} = props;

  const renderContainer = (count: any) => {

    return count.map((container: any, k: any) => {
      const { children, type } = container;
      if (type === 'rowContainer') {
        return <Element key={k} dataKey={container.key}>
          <RowContainer container={container}></RowContainer>
        </Element>;
      }

      return renderContainer(children);
    });
  };

  return <div className={styles.page}>{renderContainer(count)}</div>;
}


export default connect(({ treeData }: any) => ({
  treeData,
}))(Container)