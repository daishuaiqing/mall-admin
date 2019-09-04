import axios from '@/libs/api.request'

export const create = info => {
  return axios.request({
    url: '/pms/goods/add',
    data: info,
    method: 'post'
  })
}

export const getList = info => {
  return axios.request({
    url: '/pms/goods/list',
    params: info,
    method: 'get'
  })
}
