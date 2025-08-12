import React from 'react';
import { Form, Input, Button, message } from 'antd';
import './login.scss';
import { getMenu } from '../../api';
import { Navigate, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  if (localStorage.getItem('token')) {
    return <Navigate to="/home" replace />;
  }
  //这里暂时unknown
  const onFinish = (val: unknown) => {
    //如果是真实项目,这里要加密
    getMenu(val)
      .then(({ data }) => {
        localStorage.setItem('token', data.token);
        message.success('登录成功');
        navigate('/home');
      })
      .catch((err) => {
        console.error('登录失败:', err);
      });
  };

  return (
    <div className="login-container">
      <div className="left-image" />
      <div className="right-form">
        <h2 className="login-title">登录账号</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
