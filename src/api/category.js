import axios from '@/libs/api.request'
/**
 * 创建分类
 * @param {*} info 
 */
export const create = info => {
  return axios.request({
    url: '/pms/category/add',
    data: info,
    method: 'post'
  })
}
/**
 * 获取分类列表（分页）
 * @param {*} info 
 */
export const getList = info => {
  return axios.request({
    url: '/pms/category/list',
    params: info,
    method: 'get'
  })
}
/**
 * 获取分类列表（全部）
 * @param {*} info 
 */
export const getCatgoryAll = info => {
  return axios.request({
    url: '/pms/category/find/all',
    params: info,
    method: 'get'
  })
}
/**
 * 通过ID删除分类
 * @param {*} info 
 */
export const deleteById = info => {
  return axios.request({
    url: '/pms/category/delete/'+info,
    method: 'get'
  })
}
/**
 * 修改分类信息
 * @param {*} info 
 */
export const modify = info => {
  return axios.request({
    url: '/pms/category/modify/'+info.id,
    data: info,
    method: 'post'
  })
}
