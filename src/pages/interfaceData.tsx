import { Link } from 'umi';
import React, { useState } from 'react';
import { Button, Col, Modal, Row, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import InterfaceDetail from '@/components/interfaceData';
import style from './index.less';

export default function InterfaceData(props: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      width: 200,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Action',
      key: 'operation',
      width: 200,
      fixed: 'right',
      render: () => <a>编辑</a>,
    },
  ];

  const data: any = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      name: `www ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }

  return (
    <div style={{ padding: 20 }}>
      <Row>
        <Col span={12}>
          <Button type="primary" onClick={showModal}>
            添加
          </Button>
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ x: 1500, y: '90vh' }}
          />
        </Col>
      </Row>

      <Modal title=" " onCancel={handleCancel} open={isModalOpen} footer={null}>
        <div className={style.interfaceContent}>
          <InterfaceDetail></InterfaceDetail>
        </div>
      </Modal>
    </div>
  );
}
