import { USERINFO_LOGIN, USERINFO_UPDATE } from '../constants/actionType'

const initialState = {}

export default function userInfo (state = initialState, action) {
  switch (action.type) {
    case USERINFO_LOGIN:
      return action.data
    case USERINFO_UPDATE:
      return action.data
    default:
      return state
  }
}