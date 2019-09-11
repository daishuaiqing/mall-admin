import axios from '@/libs/api.request'

/**
 * 获取订单列表（分页）
 * @param {*} info 
 */
export const getList = info => {
  return axios.request({
    url: '/oms/order/list',
    params: info,
    method: 'get'
  })
}


export const getOrderGoodsList = info => {
  return axios.request({
    url: '/oms/order/goods/find/all',
    params: info,
    method: 'get'
  })
}
