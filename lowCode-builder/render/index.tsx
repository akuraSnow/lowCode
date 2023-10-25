import React, { Fragment, useEffect, useState } from 'react';
import UnitComponent from './component';
import './index.css';

export default function RenderProvider(source: any, Component: any) {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    source.subscribe({
      next: (v: any) => {
        setChildren(v.data);
      },
    });
  }, []);

  const columns = (item: any, index: number): React.ReactNode => {
    return item.map((ElementList: any, i: number) => {
      const {
        layoutDefinition: { columnSpan = 1 },
      } = ElementList.field;

      return (
        <div
          className={`grid-item-${columnSpan} align-items-center`}
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
