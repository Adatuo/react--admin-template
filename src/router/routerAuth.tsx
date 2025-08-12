import React from 'react';
import { Navigate } from 'react-router-dom';
import type { AuthProps } from '../typings/misc';

const AuthRoute: React.FC<AuthProps> = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // 未登录跳转登录页
    return <Navigate to="/login" replace />;
  }

  // 已登录返回子组件（一般是Main页面）
  return <>{children}</>;
};

export default AuthRoute;
