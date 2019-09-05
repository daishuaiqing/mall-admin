import axios from '@/libs/api.request'
/**
 * 创建商品
 * @param {*} info 
 */
export const create = info => {
  return axios.request({
    url: '/pms/goods/add',
    data: info,
    method: 'post'
  })
}
/**
 * 获取商品列表（分页）
 * @param {*} info 
 */
export const getList = info => {
  return axios.request({
    url: '/pms/goods/list',
    params: info,
    method: 'get'
  })
}
/**
 * 通过商品的ID删除商品
 * @param {*} info 
 */
export const deleteById = info => {
  return axios.request({
    url: '/pms/goods/delete/'+info,
    method: 'get'
  })
}
/**
 * 修改商品信息
 * @param {*} info 
 */
export const modify = info => {
  return axios.request({
    url: '/pms/goods/modify/'+info.id,
    data: info,
    method: 'post'
  })
}
