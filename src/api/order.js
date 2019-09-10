import axios from '@/libs/api.request'

/**
 * 获取商品列表（分页）
 * @param {*} info 
 */
export const getList = info => {
  return axios.request({
    url: '/oms/order/list',
    params: info,
    method: 'get'
  })
}
