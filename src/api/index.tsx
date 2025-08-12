import axios from "./axios";

//mockjs不支持TS,所有生成的API都不封装
//菜单获取+登录
export function getMenu(param: unknown) {
  return axios.request({
    url: "/permission/getMenu",
    method: "post",
    data: param
  })
}

export const getData = () => {
  return axios.request({
    url: '/home/getData',
    method: 'get',
  });
};

export const getUser = (params: unknown) => {
  return axios.request({
    url: '/user/getUser',
    method: 'get',
    params,
  });
};

export const addUser = (data: unknown) => {
  return axios.request({
    url: '/user/addUser',
    method: 'post',
    data,
  });
};

export const editUser = (data: unknown) => {
  return axios.request({
    url: '/user/editUser',
    method: 'post',
    data,
  });
};

export const delUser = (data: unknown) => {
  return axios.request({
    url: '/user/delUser',
    method: 'post',
    data,
  });
};
