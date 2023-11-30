import React, { useState } from 'react';
import { Form, Input, Popconfirm, Table as TableForm, Typography } from 'antd';

const { Column, ColumnGroup } = TableForm;

export default function Table(props: any) {
  const {
    control: { target },
    field: {
      dataSource = [],
      metaData: { columns, editable },
    },
  } = props;

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const operationBtn = (e: any, record: any) => {
    target.executeAction(e.name, record);
  };

  const save = async (key: React.Key, event: any, record: any) => {
    try {
      const row = await form.validateFields();

      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
      setEditingKey('');
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
      } else {
        newData.push(row);
      }

      operationBtn(event, newData);
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const edit = (record: any & { key: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };
  const isEditing = (record: any) => record && record.key === editingKey;

  const EditableCell: any = (editing, dataIndex, children) => {
    console.log('children: ', children);
    return editing ? (
      <Form.Item
        name={dataIndex}
        style={{ margin: 0 }}
        rules={[
          {
            required: true,
            message: `Please Input!`,
          },
        ]}
      >
        <Input value={children} />
      </Form.Item>
    ) : (
      children
    );
  };

  const render = (data: any, record, { render: renderFun, dataIndex }: any) => {
    if (!editable) {
      return !renderFun ? (
        data
      ) : (
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
    const editStatus = isEditing(record);

    if (renderFun) {
      return editStatus ? (
        <div style={{ display: 'flex' }}>
          {renderFun.map((item: any, index: number) => (
            <a
              style={{ marginRight: 10 }}
              key={index}
              dangerouslySetInnerHTML={{ __html: item.element }}
              onClick={() =>
                item.type === 'save'
                  ? save(record.key, item.onclick, record)
                  : operationBtn.bind(this, item.onclick, record)
              }
            ></a>
          ))}
          <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
            <a>Cancel</a>
          </Popconfirm>
        </div>
      ) : (
        <Typography.Link
          disabled={editingKey !== ''}
          onClick={() => edit(record)}
        >
          编辑
        </Typography.Link>
      );
    }

    return EditableCell(editStatus, dataIndex, data);
  };

  const ColumnSpan = (item: any) => {
    const { title, key, dataIndex, render: renderFun = undefined } = item;
    return (
      <Column
        title={title}
        dataIndex={dataIndex}
        key={key}
        render={(e: any, record: any) => render(e, record, item)}
      />
    );
  };

  return (
    <div style={{ width: '100%' }}>
      <Form form={form}>
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
      </Form>
    </div>
  );
}
