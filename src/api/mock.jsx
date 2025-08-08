import Mock from 'mockjs';
import homeApi from './mockServeData/home';

//Mock拦截
Mock.mock(/home\/getData/, homeApi.getStatisticalData)