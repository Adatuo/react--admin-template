export interface MenuConfig {
  path: string;
  name?: string;
  label: string;
  icon: string;
  url?: string;
  children?: MenuConfig[];
}

export interface CommonHeaderProps {
  collapsed: boolean;
}

export interface AuthProps {
  children: React.ReactNode;
}
