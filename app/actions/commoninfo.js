// import * as actionTypes from '../constants/commoninfo'
import { ADDRESS_INFO } from '../constants/actionType'

export function updateAddressInfo(data) {
  return {
    type: ADDRESS_INFO,
    data
  }
}