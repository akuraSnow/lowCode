import styles from './index.less';
import { connect } from 'umi';
import { Menu, Card, Layout } from 'antd';
import { useState } from 'react';
import Container from './layOut/index';
import OperateList from './operateList/index';
import Materials from './componentDisplay/materials';
import { RegisterFormBuilder, iocContainer } from "dynamic-builder";

import components from "../../provider/components/index";

import { 
  converter,
  extension,
  // components,
  validator,
  RenderProvider } from  "dynamic-provider";

RegisterFormBuilder.use({
  components,
  extension,
  validator,
  converter
}).render(RenderProvider);

console.log('iocContainer: ', iocContainer);
const { Header, Sider, Content } = Layout;


const headerStyle: any = {
  textAlign: 'right',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#fff'
};

const contentStyle: any = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',

};


function getItem(
  label: any,
  key: any,
  icon?: any,
  children?: any,
  type?: any,
) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [getItem('容器', '13'), getItem('组件库', '14')];

function IndexPage(props: any) {

  const [open, setOpen] = useState(false);

  return (
    <div className={styles.content}>
      <Layout>
        <Header style={headerStyle}>
          <OperateList></OperateList>
        </Header>
        <Layout hasSider>
          <Sider width={100}>
            <Menu
              onClick={() => {
                setOpen(true);
              }}
              style={{ width: '100%' }}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              items={items}
            />
          </Sider>
          <Content style={contentStyle}>
            <Container />
          </Content>
        </Layout>
      </Layout>
      <Materials
        open={open}
        setOpen={(e: any) => {
          setOpen(e);
        }}
      ></Materials>
    </div>
  );
}

export default connect(({ treeData }: any) => ({
  treeData,
}))(IndexPage);
