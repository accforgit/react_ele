import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {getAddressListData} from '../../../../fetch/home/home.js'
import AddressItem from './AddressItem'
import './style.less'

class CityList extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this.state = {
      initDone: false,
      addressList: []
    }
  }

  componentWillReceiveProps(newProps) {
    if(!this.state.initDone && newProps.showSelectCity){
      const result = getAddressListData()
      result.then((res)=>{
        return res.json()
      }).then((data)=>{
        // console.log('地址列表：', data)
        if(data && data.length>0) {
          this.setState({
            initDone: true,
            addressList: data
          })
        }
      }).catch((ex)=>{
        // if (__DEV__) {
          console.error('选择地址模块获取数据报错, ', ex.message)
        // }
      })
    }
  }

  render() {
    let addressList = this.state.addressList
    return (
      <section id='city-list-container'>
        <h4>收货地址</h4>
        <ul>
        {
          addressList.length>0 &&
          addressList.map((item, index)=>{
            return <AddressItem key={index} data={item}/>
          })
        }
        </ul>
      </section>
    )
  }
}

export default CityList