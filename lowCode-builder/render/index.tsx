import React, { useEffect, useState } from 'react';
import UnitComponent from './component';
import './index.css';

export default function RenderProvider(source: any, Component: any) {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    const observable = source.subscribe({
      next: (v: any) => {
        setChildren(v.data);
        console.log('v.data: ', v.data);
      },
    });
    return () => observable.unsubscribe();
  }, []);

  const columns = (
    item: any,
    index: number,
    isRow: boolean,
  ): React.ReactNode => {
    if (Array.isArray(item)) {
      return item.map((el, i: number) => {
        const flexDirection = isRow ? 'row' : 'column';
        return (
          <div
            className="packaging-box"
            style={{ flexDirection: flexDirection }}
            key={i}
          >
            {columns(el, index, !isRow)}
          </div>
        );
      });
    }

    return (
      item && (
        <div className="component-box" key={`${index}`.toString()}>
          <UnitComponent Component={Component} ElementList={item} />
        </div>
      )
    );
  };

  return (children || []).map((item: any, index: number) => {
    return (
      <div className="flex-container" key={index}>
        {columns(item, index, true)}
      </div>
    );
  });
}
