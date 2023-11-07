import React from 'react';
import { Table as TableForm } from 'antd';

const { Column, ColumnGroup } = TableForm;

export default function Table(props: any) {
  const {
    control: { target, event },
    field: {
      label,
      dataSource = [],

      metaData: { columns },
    },
  } = props;

  console.log('dataSource: ', dataSource);

  const operationBtn = (e: any, record: any) => {
    target.executeAction(e.name, record);
  };

  const ColumnSpan = (item: any) => {
    const { title, key, dataIndex, render: renderFun = undefined } = item;
    return (
      <Column
        title={title}
        dataIndex={dataIndex}
        key={key}
        render={
          renderFun
            ? (_, record: any) => {
                return (
                  <div style={{ display: 'flex' }}>
                    {renderFun.map((item: any, index: number) => (
                      <a
                        style={{ marginLeft: 10 }}
                        key={index}
                        dangerouslySetInnerHTML={{ __html: item.element }}
                        onClick={operationBtn.bind(this, item.onclick, record)}
                      ></a>
                    ))}
                  </div>
                );
              }
            : undefined
        }
      />
    );
  };

  return (
    <div style={{ width: '100%' }}>
      <TableForm dataSource={dataSource}>
        {columns.map((item: any, index: number) => {
          if (item.children && item.children.length > 0) {
            return (
              <ColumnGroup key={index} title={item.title}>
                {item.children.map((res: any, i: number) => ColumnSpan(res))}
              </ColumnGroup>
            );
          }
          return ColumnSpan(item);
        })}
      </TableForm>
    </div>
  );
}
