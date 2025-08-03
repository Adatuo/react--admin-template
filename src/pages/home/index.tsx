import { Card, Col, Row } from 'antd';
import userImg from '../../assets/images/user.png';
import './home.scss';
import { useEffect } from 'react';
import { getData } from '../../api';

const Home: React.FC = () => {
  useEffect(() => {
    getData().then(() => {
     
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
      </Col>
      <Col span={16}>col</Col>
    </Row>
  );
};

export default Home;
