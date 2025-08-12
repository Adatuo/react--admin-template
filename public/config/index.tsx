import type { MenuConfig } from "../../src/typings/misc";
/**这里是静态数据路由,通常应该
 * 后端 API。在用户登录后动态获取。
 * 根据后端返回的权限列表，使用动态 import() 异步加载组件，动态生成路由配置。
 * 基于从后端获取的、已存入全局状态的权限列表生成。
 * 同样是依赖全局状态中的权限列表来查找标签信息（如 title），并将打开的标签页列表也存放在全局状态中。
 */
const menuConfig: MenuConfig[] = [
  {
    path: '/home',
    name: 'home',
    label: '首页',
    icon: 'HomeOutlined',
    url: '/home/index',
  },
  {
    path: '/mall',
    name: 'mall',
    label: '商品管理',
    icon: 'ShopOutlined',
    url: '/mall/index',
  },
  {
    path: '/user',
    name: 'user',
    label: '用户管理',
    icon: 'UserOutlined',
    url: '/user/index',
  },
  {
    path: '/other',
    label: '其他',
    icon: 'SettingOutlined',
    children: [
      {
        path: '/other/pageOne',
        name: 'page1',
        label: '页面1',
        icon: 'SettingOutlined',
      },
      {
        path: '/other/pageTwo',
        name: 'page2',
        label: '页面2',
        icon: 'SettingOutlined',
      },
    ],
  },
];

export default menuConfig;
