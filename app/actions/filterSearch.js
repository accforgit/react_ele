// 搜索的筛选条件
import { CLASSIFIED_CONDITION, SORT_CONDITION, FILTER_CONDITION } from '../constants/actionType'

export function classifiedCondition(data) {
  return {
    type: CLASSIFIED_CONDITION,
    data
  }
}
export function sortCondition(data) {
  return {
    type: SORT_CONDITION,
    data
  }
}
export function filterCondition(data) {
  return {
    type: FILTER_CONDITION,
    data
  }
}
