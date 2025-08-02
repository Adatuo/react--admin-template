// import React, { useState } from 'react';
import { Layout, Menu, type MenuProps } from 'antd';
import type { MenuConfig } from '../../interface';
import menuConfig from '../../config';
import React from 'react';
import * as Icon from "@ant-design/icons"

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

//这里是until类函数后面再来封装
// 最好不要使用cloneElement,这样不清楚props的流向,这里的Icon后面或许会做一个部分引入icon的组件
const iconToElement = (name: string) => React.createElement(Icon[name]);
// 菜单
function getMenuItems(menuList: MenuConfig[]): MenuProps['items'] {
  return menuList.map((item) => ({
    key: item.path,
    icon: iconToElement(item.icon),
    label: item.label,
    children: item.children ? getMenuItems(item.children) : undefined,
  }));
}

export default CommonAside;
