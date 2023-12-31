import { connect, history } from 'umi';

import { useState } from 'react';
import { Button, Drawer, Space } from 'antd';
import Home from './previewInterface';
import React from 'react';
import { updateFelidJson } from '@/utils';
import styles from './index.less';

import { MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

function OperateList(props: any) {
  const {
    treeData: { count, functionObj, attributeObj },
  } = props;
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const showModal = async () => {
    console.log('count: ', count);
    let { fieldsJson, scaleArr } = updateFelidJson(count, attributeObj);
    console.log('fields: ', fieldsJson);

    const data = {
      fields: fieldsJson,
      layout: scaleArr,
      executeFunction: functionObj,
    };

    sessionStorage.setItem('name', JSON.stringify(data));
    setOpen(true);
  };

  const [current, setCurrent] = useState('');

  const onClickMenu: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    history.push(`/${e.key}`);
    setCurrent(e.key);
  };

  const items: MenuProps['items'] = [
    {
      label: '生成页面',
      key: '',
      icon: <MailOutlined />,
    },
    {
      label: '数据管理',
      key: 'SubMenu',
      icon: <SettingOutlined />,
      children: [
        {
          key: 'interfaceData',
          label: '接口管理',
        },
        {
          key: 'staticData',
          label: '数据管理',
        },
        {
          key: 'calculatorData',
          label: '验证管理',
        },
        {
          key: 'actionData',
          label: '方法管理',
        },
      ],
    },
  ];

  return (
    <div>
      <Menu
        onClick={onClickMenu}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />

      <div className={styles.preview}>
        <Button type="primary" onClick={showModal}>
          预览
        </Button>
      </div>

      <Drawer
        width="100%"
        onClose={onClose}
        open={open}
        destroyOnClose={true}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button type="primary" onClick={onClose}>
              确定
            </Button>
          </Space>
        }
      >
        {React.createElement(Home as any, { name: 'li' })}
      </Drawer>
    </div>
  );
}

export default connect(({ treeData }: any) => ({
  treeData,
}))(OperateList);
