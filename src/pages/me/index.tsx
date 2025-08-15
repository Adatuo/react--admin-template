import React, { useState } from 'react';
import { Card, Form, Input, Button, Row, Col, Modal, message } from 'antd';
import userImg from '../../assets/images/user.png';
import './index.scss';

const Me: React.FC = () => {
  // 静态用户信息
  const [userInfo, setUserInfo] = useState({
    name: '张三',
    position: '前端工程师',
    email: 'zhangsan@example.com',
    account: 'admin',
  });

  // 控制修改密码模态框显示
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 基本资料表单提交
  const onBasicFinish = (values: any) => {
    setUserInfo({
      ...userInfo,
      name: values.name,
      position: values.position,
    });
    message.success('基本资料更新成功');
  };

  // 修改密码表单提交
  const onPasswordFinish = (values: any) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error('两次密码输入不一致');
      return;
    }
    // 这里只是演示，实际需要调用接口
    message.success('密码修改成功（模拟）');
    setIsModalVisible(false);
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="个人信息">
            <div className="userInfo">
              <img src={userImg} alt="加载失败" />
              <div>
                <p>
                  姓名：<span>{userInfo.name}</span>
                </p>
                <p>
                  邮箱：<span>{userInfo.email}</span>
                </p>
                <p>
                  职位：<span>{userInfo.position}</span>
                </p>
                <p>
                  账号：<span>{userInfo.account}</span>
                </p>
                <Button type="primary" onClick={() => setIsModalVisible(true)}>
                  修改密码
                </Button>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={16}>
          <Card title="基本资料">
            <Form
              layout="vertical"
              initialValues={{
                name: userInfo.name,
                email: userInfo.email,
              }}
              onFinish={onBasicFinish}
            >
              <Form.Item
                label="姓名"
                name="name"
                rules={[{ required: true, message: '请输入姓名' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="邮箱"
                name="email"
                rules={[{ required: true, message: '请输入邮箱' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>

      <Modal
        title="修改密码"
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form layout="vertical" onFinish={onPasswordFinish}>
          <Form.Item
            label="旧密码"
            name="oldPassword"
            rules={[{ required: true, message: '请输入旧密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="新密码"
            name="newPassword"
            rules={[{ required: true, message: '请输入新密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirmPassword"
            rules={[{ required: true, message: '请确认新密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              修改密码
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Me;
