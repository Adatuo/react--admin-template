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
        method: 'get'
    })
}
