import { Layout, Menu, type MenuProps } from 'antd';
import menuConfig from '../../config';
import { getMenuItems } from '../../untils';
import { useNavigate } from 'react-router-dom';
import { selectMenuList } from '../../store/reducer/tab';
import { useDispatch} from 'react-redux';

const { Sider } = Layout;

function CommonAside({ collapsed }: { collapsed: boolean }) {
  const items = getMenuItems(menuConfig);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //添加路由权限数据到store
  const setTabsList = (val) => {
    dispatch(selectMenuList(val));
  };

  //点击菜单
  const selectMenu: MenuProps['onClick'] = (e) => {
    navigate(e.key);
    let data;
    //静态路由实现的tag
    menuConfig.forEach((item) => {
      if (item.path === e.keyPath[e.keyPath.length - 1]) {
        data = item;
        // 是否有二级菜单
        if (e.keyPath.length > 1) {
          data = item.children?.find((child) => child.path === e.key);
        }
      }
    });
    setTabsList({
      path: data.path,
      name: data.name,
      label: data.label,
    });
  };

  return (
    <Sider trigger={null} collapsed={collapsed}>
      <h3 className="app-name">{collapsed ? '后台' : '通用后台管理系统'}</h3>
      <Menu
        onClick={selectMenu}
        theme="dark"
        mode="inline"
        items={items}
        style={{
          height: '100%',
        }}
      />
    </Sider>
  );
}

export default CommonAside;
