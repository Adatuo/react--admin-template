import axios from "./axios";

//这的TS有待封装
export function getMenu(param: unknown) {
  return axios.request({
    url: "/menu/getMenu",
    method: "get",
    data: param
  })
}

export const getData = () => {
    return axios.request({
        url: '/home/getData',
        method: 'get'
    })
}