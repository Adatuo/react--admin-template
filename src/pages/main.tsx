import { Layout, theme } from 'antd';
import CommonAside from '../components/commonAside';
import CommonHeader from '../components/commonHeader';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { Outlet } from 'react-router-dom';
import AuthRoute from '../router/routerAuth';
import CommonTag from '../components/commonTag';

const { Content } = Layout;
const Main: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // 展开收起的状态
  const collapsed = useSelector((state: RootState) => state.tab.isCollapse);
  return (
    <AuthRoute>
      <Layout className="main-container">
        <CommonAside collapsed={collapsed} />
        <Layout>
          <CommonHeader collapsed={collapsed} />
          <CommonTag />
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
    </AuthRoute>
  );
};

export default Main;
