import Mock from 'mockjs';
import homeApi from './mockServeData/home';
import permissionApi from './mockServeData/permission';


//Mock拦截
Mock.mock(/home\/getData/, homeApi)

Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)