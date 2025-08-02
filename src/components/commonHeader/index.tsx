import { Layout, Button, Avatar, Dropdown, type MenuProps } from 'antd';
import avatar from '../../assets/images/user.png';
import './index.scss';
import { MenuFoldOutlined } from '@ant-design/icons';

const { Header } = Layout;

const CommonHeader: React.FC = () => {
  const logout = () => {
    console.log('User logged out');
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label:(
        <span>个人中心</span>
      )
    },
    {
      key: '2',
      label:(
        <span onClick={() => logout()}>退出登录</span>
      )
    },
  ];
  return (
    <Header className="header-container">
      <Button
        type="text"
        icon={<MenuFoldOutlined />}
        // icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        // onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 32,
          background: '#fff',
        }}
      />

      <Dropdown menu={{ items }} trigger={['click']} placement="bottom" arrow>
        <Avatar src={avatar} size={36} />
      </Dropdown>
    </Header>
  );
};

export default CommonHeader;
