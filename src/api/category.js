import axios from '@/libs/api.request'

export const create = info => {
    return axios.request({
      url: '/pms/category/add',
      data: info,
      method: 'post'
    })
}

export const getList = info => {
    return axios.request({
      url: '/pms/category/list',
      data: info,
      method: 'get'
    })
}

export const getCatgoryAll = info => {
  return axios.request({
    url: '/pms/category/find/all',
    data: info,
    method: 'get'
  })
}