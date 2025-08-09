import axios from './axios';

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