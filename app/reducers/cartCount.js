import { CART_ADD, CART_MINUS, CART_CLEAR } from '../constants/actionType'

const initialState = []

export default function store (state = initialState, action) {
  let newState = Object.assign([], state)
  let data = action.data
  switch (action.type) {
      case CART_ADD:
        // let data = action.data
        let isExist = newState.some(item=>{
          if(item.shopId === data.shopId &&
            item.foodId === data.foodId) {
              data.count ? (item.count = data.count) : (item.count += 1)
              return true
          }
          return false
        })
        
        if(!isExist) {
          !data.count && (data.count = 1)
          newState.push(data)
        }
        return newState
      case CART_MINUS:
        // let data2 = action.data
        newState.some(item=>{
          if(item.shopId === data.shopId &&
            item.foodId === data.foodId) {
              data.count ? (item.count = data.count) : (item.count -= 1)
            return true
          }
          return false
        })
        return newState
      case CART_CLEAR:
        newState.forEach((item, index)=>{
          if(item.shopId === data.shopId) {
            item.count = 0
          }
        })
        return newState
      default:
        return newState
  }
}