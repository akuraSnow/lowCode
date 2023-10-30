import React, { HTMLAttributes, useState } from 'react';
import { connect } from 'umi';
import { Button, Modal, Row, Col, Input, List, Menu, Select } from 'antd';
import styles from './index.less';
import Editor from '@/components/menuOpretor/editor';
import CodeEditor from '@/components/menuOpretor/codeEditor';

const Event = (props: any) => {
  const [open, setOpen] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(1);

  //   const [js, setJs] = useState('function (){\n  return [];\n}\n');
  //   console.log('js: ', js);
  const data = [
    'onclick',
    'oncontextmenu',
    'ondblclick',
    'onmousedown',
    'onmouseenter',
    'onmouseleave',
    'onmousemove',
    'onmouseover',
    'onmouseout',
    'onmouseup',
  ];

  const items = data.map((item, index) => ({
    key: index,
    label: item,
  }));

  const onClick = (e: any) => {
    setSelectedKeys(Number(e.key));
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        组件自带事件
      </Button>

      <Modal
        title="事件绑定"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={8}>事件选择</Col>
          <Col span={16}>事件名称</Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={8}>
            <Menu
              onClick={onClick}
              style={{ width: '100%' }}
              selectedKeys={[`${selectedKeys}`]}
              defaultOpenKeys={['sub1']}
              mode="inline"
              items={items}
            />
          </Col>
          <Col span={16}>
            <Row style={{ marginBottom: '20px ' }}>
              <Col span={24}>
                <Input placeholder="事件名称" value={data[selectedKeys]} />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <CodeEditor />
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default connect(({ treeData }: any) => ({
  treeData,
}))(Event);
