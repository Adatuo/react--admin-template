import React from 'react';
import * as Icon from "@ant-design/icons"
import type { MenuConfig } from '../typings/misc';
import type { MenuProps } from 'antd/es/menu';

export const iconToElement = (name: string) => React.createElement(Icon[name]);

export function getMenuItems(menuList: MenuConfig[]): MenuProps['items'] {
  return menuList.map((item) => ({
    key: item.path,
    icon: iconToElement(item.icon),
    label: item.label,
    children: item.children ? getMenuItems(item.children) : undefined,
  }));
}
