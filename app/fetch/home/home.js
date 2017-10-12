import { get } from '../get'

// 首页 大类 列表
export function getCateData() {
  const result = get('/api/homecate')
  return result
}

// 首页 推荐商家 列表
export function getShoplistData(city='北京', page=0) {
  const result = get('/api/shoplist/' + encodeURIComponent(city) + '/' + page)
  return result
}

// 地址列表
export function getAddressListData() {
  const result = get('/api/addresslist')
  return result
}

// 发现页
export function getDiscoverListData() {
  const result = get('/api/discoverlist')
  return result
}

// 订单页 订单列表
export function getOrderListData(userid=0, page=0) {
  const result = get('/api/orderlist/' + page + '/' + userid)
  return result
}

export function getShopDetailData(shopId=0) {
  const result = get('/api/detail/' + shopId)
  return result
}

// 商家详情页 所有评论 
export function getShopCommentlData(shopId=1, commentSize=10, commentNumber=1) {
  return get(`/api/shop/comment/${shopId}/${commentSize}/${commentNumber}`)
}

// 筛选条件
export function getDropDownData() {
  return get('/api/selectDropDown')
}