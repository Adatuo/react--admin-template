import { Layout, Menu, type MenuProps } from 'antd';
import menuConfig from '../../../public/config';
import { getMenuItems } from '../../untils';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

function CommonAside({ collapsed }: { collapsed: boolean }) {
  // const [collapsed, setCollapsed] = useState(false);
  const items = getMenuItems(menuConfig);
  const navigate = useNavigate();

  const selectMenu: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <Sider trigger={null} collapsed={collapsed}>
      <h3 className="app-name">{collapsed ? '后台' : '通用后台管理系统'}</h3>
      <Menu
        onClick={selectMenu}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}
        style={{
          height: '100%',
        }}
      />
    </Sider>
  );
}

export default CommonAside;
