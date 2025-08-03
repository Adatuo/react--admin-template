import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import CommonAside from '../components/commonAside';
import CommonHeader from '../components/commonHeader';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;
const Main: React.FC = () => {
  // const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // 展开收起的状态
  const collapsed = useSelector((state: RootState) => state.tab.isCollapse);
  return (
    <Layout className="main-container">
      <CommonAside collapsed={collapsed} />
      <Layout>
        <CommonHeader collapsed={collapsed} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Main;
