export interface MenuConfig {
  path: string;
  name?: string;
  label: string;
  icon: string;
  url?: string;
  children?: MenuConfig[];
}

