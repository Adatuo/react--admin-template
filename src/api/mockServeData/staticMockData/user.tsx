import { Button } from "antd";

export const userTableColumn = [
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
    render: (val) => (val ? '女性' : '男性'),
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
    render:(row,rowData) => {
      return (
        <div className="flex-box">
          <Button style={{ marginRight: '10px' }} onClick={() => handleClick('edit', rowData)}>编辑</Button>
          <Button >删除</Button>
        </div>
      )
    }
  },
];
