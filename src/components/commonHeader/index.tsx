import { Layout, Button, Avatar, Dropdown, type MenuProps } from 'antd';
import avatar from '../../assets/images/user.png';
import './index.scss';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { collapseMenu } from '../../store/reducer/tab';
import { useNavigate } from 'react-router-dom';
import type { CommonHeaderProps } from '../../typings/misc';
const { Header } = Layout;

const CommonHeader: React.FC<CommonHeaderProps> = ({ collapsed }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function setCollapsed() {
    dispatch(collapseMenu());
  }

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span>个人中心</span>,
    },
    {
      key: '2',
      label: <span onClick={() => logout()}>退出登录</span>,
    },
  ];
  return (
    <Header className="header-container">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed()}
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
