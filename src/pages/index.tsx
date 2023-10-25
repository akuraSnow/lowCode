import styles from './index.less';
import { connect } from 'umi';
import { Menu, Drawer, Layout } from 'antd';
import { useState } from 'react';
import Container from './layOut/container/index';
import OperateList from './operateList/index';
import Materials from './menuOpretor/menuOperator';
import DataSource from './menuOpretor/dataSource';
import PropertyBinding from './layOut/propertyBinding/index';

import initBuilder from '../../lowCode-builder/index';

initBuilder();

const { Header, Sider, Content } = Layout;

const headerStyle: any = {
  textAlign: 'right',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#fff',
};

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
    <div className={styles.content}>
      <Layout>
        <Header style={headerStyle}>
          <OperateList></OperateList>
        </Header>
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
      </Layout>
    </div>
  );
}

export default connect(({ treeData }: any) => ({
  treeData,
}))(IndexPage);
