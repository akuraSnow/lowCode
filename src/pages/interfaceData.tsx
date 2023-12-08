import { Link } from 'umi';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import InterfaceDetail from '@/components/interfaceData';
import style from './index.less';
import { addUrlByPath, getUrl } from '@/services/api';

export default function InterfaceData(props: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [saveJson, setSaveJson] = useState([]);
  const [currentData, setCurrentData] = useState({});

  useEffect(() => {
    getInterfaceData();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (e: any) => {
    const saveData = [...saveJson, e];
    await addUrlByPath(saveData);
    await getInterfaceData();
    setIsModalOpen(false);
  };

  const getInterfaceData = async () => {
    const {
      data: { content },
    } = await getUrl();
    setSaveJson(JSON.parse(content));
    setData(
      JSON.parse(content).map((item: any) => {
        item.key = item.dataId;
        return item;
      }),
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const editData = (e: any) => {
    console.log('e: ', e);

    setCurrentData(e);
    setIsModalOpen(true);
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
      title: '请求方法',
      width: 100,
      dataIndex: 'requestMethod',
      key: 'requestMethod',
    },
    {
      title: '请求地址',
      dataIndex: 'requestUrl',
      key: 'requestUrl',
    },
    {
      title: 'Action',
      key: 'operation',
      width: 200,
      fixed: 'right',
      render: (e: any) => <a onClick={() => editData(e)}>编辑</a>,
    },
  ];

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

      <Modal
        title="接口信息"
        onCancel={handleCancel}
        open={isModalOpen}
        footer={null}
      >
        <div className={style.interfaceContent}>
          <InterfaceDetail
            save={handleOk}
            currentData={currentData}
          ></InterfaceDetail>
        </div>
      </Modal>
    </div>
  );
}
