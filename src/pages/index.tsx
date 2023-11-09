import { connect } from 'umi';
import { Menu, Drawer, Layout, Select } from 'antd';
import { useState } from 'react';

import Materials from '@/components/menuOpretor/menuOperator';
import DataSource from '@/components/menuOpretor/dataSource';

import Container from '@/components/layOut/container';
import PropertyBinding from '@/components/layOut/propertyBinding';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const contentStyle: any = {
  with: '400px',
  display: 'flex',
  position: 'relative',
  overflow: 'hidden',
};

function IndexPage(props: any) {
  const [open, setOpen] = useState(false);
  const [component, setComponent]: any = useState(null);
  const [width, setWidth]: [number, any] = useState(400);

  const onClose = () => {
    setOpen(false);
  };

  const DrawerList = [
    {
      label: '容器',
      key: '1',
      component: <div>这是容器</div>,
    },
    {
      label: '组件库',
      key: '2',
      width: 300,
      component: (
        <Materials
          setOpen={(e: any) => {
            setTimeout(() => {
              setOpen(e);
            }, 500);
          }}
        ></Materials>
      ),
    },
    {
      label: '数据源',
      key: '3',
      width: 600,
      component: <DataSource></DataSource>,
    },
  ];

  const items = DrawerList.map((item: any) => {
    const { key, label, icon } = item;
    return {
      key,
      icon,
      label,
    };
  });

  const changeMenu = (k: any) => {
    const [{ component, width }] = DrawerList.filter(
      (item: any) => item.key === k.key,
    );
    setComponent(component);
    setWidth(width);
    setOpen(true);
  };

  return (
    <div>
      <Layout hasSider>
        <Sider width={100}>
          <Menu
            onClick={changeMenu}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
          />
        </Sider>
        <Content style={contentStyle}>
          <Drawer
            title=""
            placement="left"
            closable={true}
            onClose={onClose}
            width={width}
            open={open}
            mask={false}
            getContainer={false}
          >
            {component}
          </Drawer>
          <Container />
          <PropertyBinding />
        </Content>
      </Layout>
    </div>
  );
}

export default connect(({ treeData }: any) => ({
  treeData,
}))(IndexPage);
