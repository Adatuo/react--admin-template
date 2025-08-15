import { Button, DatePicker, Form, Input, InputNumber, Popconfirm, Select, Table } from 'antd';
import './user.scss';
import { useEffect, useState } from 'react';
import { addUser, delUser, editUser, getUser } from '../../api';
import { Modal } from 'antd';
import { cloneDeep } from 'lodash';
import dayjs from 'dayjs';
import type { userListData, userTableData } from '../../typings/pages/userManage';

const User: React.FC = () => {
  //刷新列表与查询
  const getTableData = () => {
    getUser(listData).then(({ data }) => {
      setTableData(data.list);
    });
  };
  //modal弹窗显示与切换
  const handleClick = (type, rowData) => {
    if (type === 'add') {
      setModalType(0);
    } else {
      setModalType(1);
      const cloneData = cloneDeep(rowData);
      cloneData.birth = dayjs(cloneData.birth);
      form.setFieldsValue(cloneData);
    }
    setIsModalOpen(true);
  };
  //删除
  const handleDelete = ({ id }) => {//
    delUser({id})
      .then(() => {
        getTableData();
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };
  //modal确认
  const handleOk = (e) => {
    form
      .validateFields()
      .then((values) => {
        values.birth = values.birth.format('YYYY-MM-DD');
        if (modalType) {
          //编辑
          editUser(values).then(() => {
            handleCancel();
            getTableData();
          });
          form.resetFields();
        } else {
          //添加
          addUser(values).then(() => {
            handleCancel();
            getTableData();
          });
          form.resetFields();
        }
        handleCancel();
        form.resetFields();
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };
  //modal取消
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  //Column静态数据
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: (val) => {
        return val ? '女' : '男';
      },
    },
    {
      title: '出生日期',
      dataIndex: 'birth',
      key: 'birth',
    },
    {
      title: '地址',
      dataIndex: 'addr',
      key: 'addr',
    },
    {
      title: '操作',
      dataIndex: 'edit',
      key: 'edit',
      render: (row, rowData) => {
        return (
          <div className="">
            <Button style={{ marginRight: '5px' }} onClick={() => handleClick('edit', rowData)}>
              编辑
            </Button>
            <Popconfirm
              title="提示"
              description="此操作将删除该用户, 是否继续?"
              okText="确认"
              cancelText="取消"
              onConfirm={() => handleDelete(rowData)}
            >
              <Button type="primary" danger>
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  //user查询列表数据
  const [listData, setListData] = useState<userListData>({
    name: '',
    page: 1,
    limit: 20,
  });
  //user表格数据
  const [tableData, setTableData] = useState<userTableData[]>([]);
  //编辑与新增弹窗
  const [modalType, setModalType] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  //提交
  const handleFinish = (e) => {
    setListData({ ...listData, name: e.keyword });//异步
  };
  useEffect(() => {
    getTableData();
  }, [listData]);

  useEffect(() => {
    getUser(listData).then(({ data }) => {
      setTableData(data.list);
    });
  }, []);
  return (
    <div className="user">
      <div className="flex-box">
        <Button type="primary" onClick={() => handleClick('add', null)}>
          +新增
        </Button>
        <Form layout="inline" onFinish={handleFinish}>
          <Form.Item name="keyword">
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              搜索
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table columns={columns} dataSource={tableData} rowKey={'id'} />
      {/* 新增和编辑共用 */}
      <Modal
        title={modalType ? '编辑用户' : '新增用户'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={'确认'}
        cancelText={'取消'}
      >
        <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} labelAlign="left">
          {modalType == 1 && (
            <Form.Item label="ID" name="id" hidden>
              <Input />
            </Form.Item>
          )}
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: '请输入${label}' }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            label="年龄"
            name="age"
            rules={[
              { required: true, message: '请输入${label}' },
              { type: 'number', message: '${label}必须是大于0的数字', min: 0 },
            ]}
          >
            <InputNumber placeholder="请输入年龄" />
          </Form.Item>
          <Form.Item
            label="性别"
            name="sex"
            rules={[{ required: true, message: '请选择${label}' }]}
          >
            <Select
              placeholder="请选择性别"
              options={[
                { label: '男', value: 0 },
                { label: '女', value: 1 },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="出生日期"
            name="birth"
            rules={[{ required: true, message: '请选择${label}' }]}
          >
            <DatePicker format="YYYY/MM/DD" placeholder="请选择出生日期" />
          </Form.Item>
          <Form.Item
            label="地址"
            name="addr"
            rules={[{ required: true, message: '请输入${label}' }]}
          >
            <Input placeholder="请输入地址" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default User;
