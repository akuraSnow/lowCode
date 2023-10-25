import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Card } from 'antd';
import componentList from '../../../lowCode-builder/materialPool/componentList';

export default function Materials(props: any): any {
  function domDrugStart(ev: any) {
    const type = ev.target.getAttribute('data-type');
    ev.dataTransfer.setData('type', type);
    ev.dataTransfer.dropEffect = 'move';
    props.setOpen(false);
  }

  return (
    <div className={styles.drawer}>
      <Card style={{ width: '100%', height: '100%' }}>
        <div className={styles.componentContent}>
          {componentList.map((item: any, key: any) => {
            return (
              <div
                key={key}
                data-type={item.type}
                className={styles.componentItem}
                draggable
                onDragStart={domDrugStart}
              >
                {item.type}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
