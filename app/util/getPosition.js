/**
 * 获取地理位置信息
 */
import Es6Promise from 'es6-promise'
import { getUserIp } from '@fetch/common'
import { getByJsonp } from '@fetch/get'

/**
* options: {
  enableHighAccuracy: 高精度
  timeout: 超时时间
  maximumAge: 地理位置信息缓存时间
}
*/
const getLocationLatLon = (options) => {
  let newOption = Object.assign({}, {enableHighAccuracy: true, maximumAge: 3600000, timeout: 1000}, options)
  return new Es6Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({ isGet: true, data: { position } })
      }, (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject({ isGet: false, data: 'User denied the request for Geolocation' })
            break
          case error.POSITION_UNAVAILABLE:
            reject({ isGet: false, data: 'Location information is unavailable' })
            break
          case error.TIMEOUT:
            reject({ isGet: false, data: 'The request to get user location timed out' })
            break
          case error.UNKNOWN_ERROR:
            reject({ isGet: false, data: 'An unknown error occurred' })
            break
          default:
            reject({ isGet: false, data: 'other error' })
        }
      }, newOption)
    } else {
      reject({ isGet: false, data: 'Geolocation is not supported by this browser' })
    }
  })
}

// 通过 ip定位当前城市
const getCityByIp = ()=>{
  return new Promise((resolve, reject)=>{
    let ipData = getUserIp()
    ipData.then(ipData=>{
      return ipData.text()
    })
    .then(res=>{
      console.log('获取到的城市ip:', res)
      let result = getByJsonp(`https://open.onebox.so.com/dataApi?type=ip&src=onebox&tpl=0&query=ip&ip=${res}`, 'callback')
      result.then(data=>{
        console.log('获取到的城市信息：', data)
        resolve(data)
      }).catch(e=>{
        reject(e)
      })
    }).catch(e=>{
      reject(e)
      alert('getUserIp Error', e)
      console.log('getUserIp Error', e)
    })
  })
}

// 调用腾讯地图接口，获取真正可观的位置信息
const getRealLocation = (options)=> {
  return new Es6Promise((resolve, reject)=>{
    let getLocationll = getLocationLatLon()
    getLocationll.then(res=>{
      if(res && res.isGet === true) {
        let {longitude, latitude} = res.data.position.coords
        let lonlat = longitude + ',' + latitude
        let result = getByJsonp(`http://apis.map.qq.com/jsapi?qt=rgeoc&lnglat=${lonlat}&key=FBOBZ-VODWU-C7SVF-B2BDI-UK3JE-YBFUS&pf=jsapi&ref=jsapi`)
        result.then(res=>{
          // 获取到 腾讯地图返回的真实地理位置数据
          // alert('获取到 腾讯地图返回的真实地理位置数据')
          console.log('getByJsonp res:')
          resolve({type: 1, data: res})
        }).catch(error=>{
          console.log('getLocationll Error:', error)
        })
      } else {
        console.log({errorType :'Geolocation Error1: ', errorMsg: res})
        reject({errorType :'Geolocation Error1: ', errorMsg: res})
      }
    }).catch(error=>{
      console.log({errorType: 'Geolocation Error2: ', errorMsg: error})
      // alert('没有获取到经纬度')
      let getCityInfo = getCityByIp()
      getCityInfo.then(res=>{
        resolve({type: 2, data: res})
      }).catch(e=>{
        reject({errorType: 'getCityByIp Error1: ', errorMsg: e})
        console.log(e)
        alert('getCityByIp Error1:', e)
      })
    })
  })
}

export {
  getLocationLatLon,
  getRealLocation,
  getCityByIp
}