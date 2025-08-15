export interface TabItem {
  path: string;
  name: string;
}

export interface TabState {
  isCollapse: boolean;
  tableList: TabItem[];
  currentMenu: TabItem | null;
}