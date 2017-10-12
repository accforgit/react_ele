// 购物车商品数量
import { CART_ADD, CART_MINUS, CART_CLEAR } from '../constants/actionType'

export function addCartCount(data) {
  return {
    type: CART_ADD,
    data
  }
}
export function minusCartCount(data) {
  return {
    type: CART_MINUS,
    data
  }
}

export function clearCartCount(data) {
  return {
    type: CART_CLEAR,
    data
  }
}