import { Card, Col, Row, Table, type TableProps } from 'antd';
import userImg from '../../assets/images/user.png';
import './home.scss';
import { useEffect, useState } from 'react';
import { getData } from '../../api';
import type { mockTableData } from '../../api/mockServeData/dto/home';
import { countData, tableColumn } from '../../api/mockServeData/staticMockData/home';
import type {
  EchartsData,
  staticCountData,
  staticTableColumns,
} from '../../typings/pages/home';
import { iconToElement } from '../../untils';
import { Echarts } from '../../components/Echarts';

const Home: React.FC = () => {
  // 表格数据
  const [tableData, setTableData] = useState<mockTableData[]>([]);
  // 表格列
  const [columns, setColumns] = useState<TableProps<mockTableData>['columns']>([]);
  // 统计数据
  const [countDatas, setCountDatas] = useState<staticCountData[]>([]);
  // Echarts数据
  const [echartsData, setEchartsData] = useState<EchartsData>({} as EchartsData);

  useEffect(() => {
    setColumns(tableColumn);
    setCountDatas(countData);

    getData().then((res) => {
      const { tableData, orderData, userData, videoData } = res.data.data;
      setTableData(tableData);

      // Echarts折线图数据
      const order = orderData;
      const xData = order.date;

      const keyArray = Object.keys(order.data[0]);
      const series: EchartsData['order']['series'] = [];
      keyArray.forEach((key) => {
        series.push({
          name: key,
          data: order.data.map((item) => item[key]),
          type: 'line',
        });
      });

      setEchartsData({
        ...echartsData,
        order: {
          xData,
          series,
        },
        user: {
          xData: userData.map((item) => item.date),
          series: [
            {
              name: '新增用户',
              data: userData.map((item) => item.new),
              type: 'bar',
            },
            {
              name: '活跃用户',
              data: userData.map((item) => item.active),
              type: 'bar',
            },
          ],
        },
        video: {
          series: [
            {
              data: videoData,
              type: 'pie',
            },
          ],
        },
      });
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
          <Table<mockTableData>
            rowKey={'name'}
            columns={columns}
            dataSource={tableData}
            pagination={false}
          />
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
        {/* 防止首次加载eChart是空 */}
        {echartsData.order && <Echarts style={{ height: '280px' }} chartData={echartsData.order} />}
        <div className="graph">
          {echartsData.user && <Echarts style={{ height: '240px' }} chartData={echartsData.user} />}
          {echartsData.video && (
            <Echarts style={{ height: '260px' }} chartData={echartsData.video} isAxisChat={false} />
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Home;
