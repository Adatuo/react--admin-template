import Mock from 'mockjs';
import homeApi from './mockServeData/home';
import userApi from './mockServeData/user';

//Mock拦截
Mock.mock(/home\/getData/, homeApi.getStatisticalData)
Mock.mock(/user\/getUser/, userApi.getUserList)
