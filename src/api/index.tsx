import axios from "./axios";

export const getData = () => {
    return axios.request({
        url: '/home/getData',
        method: 'get'
    })
}



export const getUser = (params: unknown) => {
    return axios.request({
        url: '/user/getUser',
        method: 'get',
        params
    })
}