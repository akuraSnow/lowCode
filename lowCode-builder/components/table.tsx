import React from 'react';
import { Table as TableForm } from 'antd';

export default function Table(props: any) {
  const {
    control,
    field: {
      label,
      dataSourceList = [],
      metaData: { columns },
    },
  } = props;

  return (
    <div style={{ width: '100%' }}>
      <TableForm columns={columns} dataSource={dataSourceList} />
    </div>
  );
}
