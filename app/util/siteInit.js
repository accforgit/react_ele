/**
 * 网站启动时初始化操作
 */
import Es6Promise from 'es6-promise'
import { getRealLocation } from 'util/getPosition'
import LocalStorage from 'util/localStore.js'
import { localStorageKey } from '@config/index'

// 地理位置信息 localStorage操作
const addressInfoInit = ()=> {
  return new Es6Promise((resolve, reject)=>{
    let addressInfo = JSON.parse(LocalStorage.getItem(localStorageKey.ADDRESSINFO) || null)
    if(!addressInfo || addressInfo.expireTime < new Date().getTime() || true) {
      let realPosition = getRealLocation()
      realPosition.then(res=>{
        // alert('realPosition get:')
        // alert(res.detail.poilist[0].addr)
        // 过期时间为 +1天
        let computeTime = new Date()
        computeTime.setDate(computeTime.getDate() + 1)
        let qqDetailData = res.data.detail
        if(res.type === 1) {
          // 调用腾讯地图api获取到详细位置信息
          let cityInfo = qqDetailData.results[0]
          let addressDetail = qqDetailData.poilist[0]
          addressInfo = {
            cityInfo: {country: cityInfo.n, province: cityInfo.p, cityName: cityInfo.c},
            addressDetail: addressDetail.addr + addressDetail.name,
            expireTime: computeTime.getTime()
          }
        } else {
          // 只获取到城市信息
          console.log('只获取到城市信息:', res)
          let data = res.data
          addressInfo = {
            cityInfo: {country: data[0], province: data[1], cityName: data[2] || ''},
            addressDetail: data[2] ? data[2] : data[1],
            expireTime: computeTime.getTime()
          }
        }
        LocalStorage.setItem(localStorageKey.ADDRESSINFO, JSON.stringify(addressInfo))
        resolve({isGet: true, data: addressInfo})
      }).catch(error=>{
        alert(JSON.stringify(error.data))
        reject({isGet: false, data: 'realPosition Error:' + error})
        console.log('realPosition Error:', error)
      })
    } else {
      resolve({isGet: true, data: addressInfo})
    }
  })
}

export {
  addressInfoInit
}