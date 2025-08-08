import { Button, Form, Input, Popconfirm, Table } from 'antd';
import './user.scss';
import { useEffect, useState } from 'react';
import { getUser } from '../../api';
import type { userListData, userTableData } from '../../typings/staticData/user';

const User: React.FC = () => {
  const handleClick = (type, rowData) => {};
  const handleDelete = (rowData) => {};

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
      render: (row,rowData) => {
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
  //user列表数据
  const [listData, setListData] = useState<userListData>({
    name: '',
    page: 1,
    limit: 20,
  });
  const [tableData, setTableData] = useState<userTableData[]>([]);

  const handleFinish = (e) => {
    setListData({ ...listData, name: e.name });
  };
  useEffect(() => {
    getUser(listData).then(({ data }) => {
      setTableData(data.list);
    });
  }, []);
  return (
    <div className="user">
      <div className="flex-box">
        <Button type="primary" >
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
    </div>
  );
};

export default User;
