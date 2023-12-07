import React, { useEffect, useState } from 'react';
import UnitComponent from './component';
import './index.css';
import { LayoutElement } from 'dynamic-builder';

export default function RenderProvider(source: any, Component: any) {
  const [children, setChildren] = useState([]);
  const [layOutList, setLayOutList] = useState([]);

  useEffect(() => {
    const observable = source.subscribe({
      next: (v: any) => {
        const data = LayoutElement.normalizeTreeFormConfig(v.data);
        console.log('data: ', data);

        setLayOutList(v.layout || []);
        console.log('v.layout: ', v.layout);
        setChildren(data);
      },
    });
    return () => observable.unsubscribe();
  }, []);

  const getStyle = (item: any, order: string, isRow: boolean): any => {
    const flexDirection = isRow ? 'row' : 'column';

    let layout: any;

    if (Array.isArray(item)) {
      const layObj: any = layOutList.filter((e: any) => e.grid === order);
      const span = layObj[0] && layObj[0].span;
      if (!span) {
        return { flexDirection };
      }
      layout = span;
    } else {
      let {
        field: { layout: { span = '100%' } = {} },
      } = item;
      layout = span;
    }

    const placeholder =
      layout.indexOf('%') > -1 ? `1 1 ${layout}` : `0 0 ${layout}`;

    return { flexDirection, flex: placeholder };
  };

  const columns = (
    item: any,
    index: string,
    isRow: boolean,
  ): React.ReactNode => {
    if (!item) {
      return null;
    }

    if (Array.isArray(item)) {
      return item.map((el, i: number) => {
        const order = `${index} ${i}`;
        return (
          <div
            className="packaging-box"
            style={getStyle(el, order, isRow)}
            key={i}
          >
            {columns(el, order, !isRow)}
          </div>
        );
      });
    }

    return (
      <UnitComponent
        key={`${index}`.toString()}
        Component={Component}
        ElementList={item}
      />
    );
  };

  return (children || []).map((item: any, index: number) => {
    return (
      <div className="flex-container" key={index}>
        {columns(item, `${index}`, true)}
      </div>
    );
  });
}
