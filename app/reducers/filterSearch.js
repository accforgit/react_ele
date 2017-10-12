import { CLASSIFIED_CONDITION, SORT_CONDITION, FILTER_CONDITION } from '../constants/actionType'

const initialState = {}

export default function filterSearch (state = initialState, action) {
  let newState = Object.assign({}, state)
  let data = action.data
  switch (action.type) {
    case CLASSIFIED_CONDITION:
      newState.classifiedIndex = data
      return newState
    case SORT_CONDITION:
      newState.sortIndex = data
      return newState
    case FILTER_CONDITION:
      newState.filterIndex = data
    default:
      return newState
  }
}
