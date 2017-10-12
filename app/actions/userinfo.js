import { USERINFO_LOGIN, USERINFO_UPDATE } from '../constants/actionType'

export function login(data) {
  return {
    type: USERINFO_LOGIN,
    data
  }
}

export function update(data) {
  return {
    type: USERINFO_UPDATE,
    data
  }
}