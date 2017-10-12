import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import HocRedux from 'util/HocRedux'
import LocalStorage from 'util/localStore.js'
import { localStorageKey } from '@config/index'

import { getRecursiveEle, selectEle } from 'util'

import './style.less'

class AddressItem extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this.changeAddress = this.changeAddress.bind(this)
  }
  render() {
    let data = this.props.data
    let {country, province, cityName} = data.cityInfo
    return (
      <li className="address-list" onClick={this.changeAddress} name={data.id}>
        <p className="user-info">
          <span className="name">{data.userName}</span>
          <span className="gender">{data.gender}</span>
          <span className="phone">{data.phone}</span>
        </p>
        <p className="address" data-city-info={`${country}, ${province}, ${cityName}`}>{data.detailAddress}</p>
      </li>
    )
  }

  changeAddress(e) {
    let props = this.props
    let newAddressEle = getRecursiveEle(e.target)
    let userInfoEle = selectEle('.user-info', false, newAddressEle)
    let addressDetailEle = selectEle('.address', false, newAddressEle)
    let cityInfo = addressDetailEle.dataset.cityInfo.split(',')
    let newAddressDesc = {
      cityInfo: {
        country: cityInfo[0],
        province: cityInfo[1],
        cityName: cityInfo[2]
      },
      userName: selectEle('.name', false, userInfoEle).innerHTML,
      gender: selectEle('.gender', false, userInfoEle).innerHTML,
      tel: selectEle('.phone', false, userInfoEle).innerHTML,
      addressDetail: selectEle('.address', false, newAddressEle).innerHTML
    }
    // 修改 redux
    const addressActions = props.reduxActions.updateAddressInfo
    addressActions(newAddressDesc)

    // 修改 LocalStorage
    LocalStorage.setItem(localStorageKey.ADDRESSINFO, JSON.stringify(newAddressDesc))
    // 跳转到首页
    window.location.reload()
  }
}

export default HocRedux(AddressItem)