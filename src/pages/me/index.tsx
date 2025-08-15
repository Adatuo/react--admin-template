import React, { useState } from 'react';
import { Card, Form, Input, Button, Row, Col, Modal, message } from 'antd';
import userImg from '../../assets/images/user.png';
import './index.scss';
import type { BasicFormValues, PasswordFormValues, UserInfo } from '../../typings/pages/me';

const Me: React.FC = () => {
  // 静态用户信息,正式项目需要用useEffect获取
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '张三',
    position: '前端工程师',
    email: 'zhangsan@example.com',
    account: 'admin',
  });

  // 控制修改密码模态框显示
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  const success = (content: string) => {
    messageApi.open({
      type: 'success',
      content: content,
    });
  };

  const error = (content: string) => {
    messageApi.open({
      type: 'error',
      content: content,
    });
  };

  // 基本资料表单模拟提交
  const onBasicFinish = (values: BasicFormValues) => {
    setUserInfo((prev) => ({
      ...prev,
      name: values.name,
      email: values.email,
    }));
    //接口调用到后端
    success('基本资料修改成功（模拟）');
  };

  // 修改密码表单提交
  const onPasswordFinish = (values: PasswordFormValues) => {
    if (values.newPassword !== values.confirmPassword) {
      error('两次密码输入不一致');
      return
    }
    success('密码修改成功（模拟）');
    //清空表单
    form.resetFields();
    setIsModalVisible(false);
  };

  return (
    <>
    {contextHolder}
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
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={() => setIsModalVisible(false)}
        okText={'确认'}
        cancelText={'取消'}
      >
        <Form layout="vertical" form={form} onFinish={onPasswordFinish}>
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
        </Form>
      </Modal>
    </>
  );
};

export default Me;
