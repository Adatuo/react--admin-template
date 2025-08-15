import { Layout, Menu } from 'antd';
import menuConfig from '../../config';
import { getMenuItems } from '../../untils';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectMenus, setCurrentMenu } from '../../store/reducer/tab';
import type { RootState } from '../../store';

const { Sider } = Layout;

function CommonAside({ collapsed }: { collapsed: boolean }) {
  // const [collapsed, setCollapsed] = useState(false);
  const items = getMenuItems(menuConfig);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentMenu = useSelector((state: RootState) => state.tab.currentMenu);

  const handleMenuClick = (e: any) => {
    navigate(e.key);
    let data;
    for (const item of menuConfig) {
      if (item.children) {
        for (const child of item.children) {
          if (child.path === e.key) {
            data = {
              path: child.path,
              name: child.label,
            };
            break;
          }
        }
      }
      if (item.path === e.key) {
        data = {
          path: item.path,
          name: item.label,
        };
        break;
      }
    }
    console.log(data);

    if (data) {
      dispatch(selectMenus(data));
      dispatch(setCurrentMenu(data));
    }
  };

  return (
    <Sider trigger={null} collapsed={collapsed}>
      <h3 className="app-name">{collapsed ? '后台' : '通用后台管理系统'}</h3>
      <Menu
        onClick={selectMenu}
        theme="dark"
        mode="inline"
        onClick={handleMenuClick}
        selectedKeys={[currentMenu?.path]}
        items={items}
        style={{
          height: '100%',
        }}
      />
    </Sider>
  );
}

export default CommonAside;
