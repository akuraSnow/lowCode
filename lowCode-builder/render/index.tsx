import React, { useEffect, useState } from 'react';
import UnitComponent from './component';
import { addColumns } from '../../src/utils/index';
import './index.css';

export default function RenderProvider(source: any, Component: any) {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    const observable = source.subscribe({
      next: (v: any) => {
        // const data = addColumns(v.data);
        // console.log('data: ', data);
        setChildren(v.data);
      },
    });
    return () => observable.unsubscribe();
  }, []);

  const columns = (item: any, index: number): React.ReactNode => {
    return item.map((ElementList: any, i: number) => {
      const {
        layoutDefinition: { columnSpan = 1 },
      } = ElementList.field;

      return (
        <div
          className={`align-items-center`}
          style={{ gridColumnStart: `span ${columnSpan}` }}
          key={`${index}-${i}`.toString()}
        >
          <UnitComponent Component={Component} ElementList={ElementList} />
        </div>
      );
    });
  };

  return (children || []).map((item: any, index: number) => {
    return (
      <div className="grid-container" key={index}>
        {columns(item, index)}
      </div>
    );
  });
}
