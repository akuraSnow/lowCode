
import { connect } from 'umi';
import { useState } from 'react';
import { Button, Drawer, Space } from 'antd';
import Home from './previewInterface';
import React from 'react';
import { updateFelidJson } from '@/utils';

function OperateList(props: any) {

  const { treeData: { count }} = props;
  const [open, setOpen] = useState(false);
  

  const onClose = () => {
    setOpen(false);
  };

  const showModal = async() => {

    const json = updateFelidJson(count);

    sessionStorage.setItem("name", JSON.stringify(json));


    setOpen(true);
  };

  return (
    <div>
       <Button type="primary" onClick={showModal}>预览</Button>
       <Drawer
        width="100%"
        onClose={onClose}
        open={open}
        destroyOnClose={true}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button type="primary" onClick={onClose}>确定</Button>
          </Space>
        }
      >

        {React.createElement(Home as any, {name: 'li'})}
      </Drawer>
    </div>
  );
}

export default connect(({ treeData }: any) => ({
  treeData,
}))(OperateList);
