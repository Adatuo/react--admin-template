import { Card, Col, Row, Table } from 'antd';
import userImg from '../../assets/images/user.png';
import './home.scss';
import { useEffect, useState } from 'react';
import { getData } from '../../api';
import type { mockTableData } from '../../api/mockServeData/dto/home';
import { countData, tableColumn } from '../../api/mockServeData/staticMockData/home';
import type { staticCountData, staticTableColumns } from '../../typings/staticData/home';
import { iconToElement } from '../../untils';

const Home: React.FC = () => {
  const [tableData, setTableData] = useState<mockTableData[]>([]);
  const [columns, setColumns] = useState<staticTableColumns[]>([]);
  const [countDatas, setCountDatas] = useState<staticCountData[]>([]);

  useEffect(() => {
    setColumns(tableColumn);
    setCountDatas(countData);

    getData().then((res) => {
      const { tableData } = res.data.getStatisticalData.data;
      setTableData(tableData);
    });
  }, []);
  return (
    <Row className="home">
      <Col span={8}>
        <Card hoverable>
          <div className="user">
            <img src={userImg} alt="加载失败" />
            <div className="userInfo">
              <p className="name">Admin</p>
              <p className="access">管理员</p>
            </div>
          </div>
          <div className="login-info">
            <p>
              上次登录时间: <span>2025</span>
            </p>
            <p>
              上次登录地点: <span>中国</span>
            </p>
          </div>
        </Card>
        <Card>
          <Table rowKey={'name'} columns={columns} dataSource={tableData} pagination={false} />
        </Card>
      </Col>
      <Col span={16}>
        <div className="num">
          {countDatas.map((item, index) => {
            return (
              <Card key={index}>
                <div className="icon-box" style={{ background: item.color }}>
                  {iconToElement(item.icon)}
                </div>
                <div className="detail">
                  <p className="num">￥{item.value}</p>
                  <p className="txt">{item.name}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </Col>
    </Row>
  );
};

export default Home;
