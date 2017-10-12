import { get } from '../get'
import apiUrl from '../apiUrl'

// 获取访客 ip
export function getUserIp() {
  const result = get(apiUrl.getUserIp)
  return result
}