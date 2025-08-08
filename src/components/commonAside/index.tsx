import { Layout, Menu} from 'antd';
import menuConfig from '../../config';
import { getMenuItems } from '../../untils';

const { Sider } = Layout;

function CommonAside({collapsed}: {collapsed: boolean}) {
  // const [collapsed, setCollapsed] = useState(false);
  const items = getMenuItems(menuConfig);
  
  return (
    <Sider trigger={null} collapsed={collapsed}>
      <h3 className="app-name">{collapsed ? '后台' : '通用后台管理系统'}</h3>
      <Menu
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
