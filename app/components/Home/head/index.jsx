import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Link, hashHistory} from 'react-router'
import LocalStorage from 'util/localStore.js'
import { localStorageKey } from '@config/index'
import { serverInfo } from '@config/index'

import 'style/Home/head/style.less'

class Head extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this.state = {
      cityInfo: null
    }
  }

  componentWillMount() {
    // console.log(87865, LocalStorage.getItem(localStorageKey.ADDRESSINFO))
    let addressInfo = JSON.parse(LocalStorage.getItem(localStorageKey.ADDRESSINFO))
    this.state.cityInfo = (addressInfo.addressDetail || '') || ''
  }
  
  render() {
    return (
      <header id="home-head">
        <div className="lt">
          <div className="locationBox" onClick={this.showSelectCityPage.bind(this)}>
            <svg className="location">
              <use xlinkHref="#location"></use>
            </svg>
            <span className="location-name">
              {this.state.cityInfo}
            </span>
            <svg className="arrow">
              <use xlinkHref="#arrow"></use>
            </svg>
          </div>
          <aside className="thermometerBox">
            <div>
              <h2>35°</h2>
              <p>高温</p>
            </div>
            <img alt="天气图标" className="thermometer-icon" src={`//${serverInfo.host}:${serverInfo.staticPort}/home/thermometer.png`}/>
          </aside>
        </div>
        <Link className="searchBox" to="/Search">
          <input type="text" placeholder="搜索商家、商品"/>
        </Link>
        <div className="commendBox">
          <a href="/search/#/shop?keyword=8888">尖椒牛肉</a>
          <a href="/search/#/shop?keyword=8888">鸭血粉丝</a>
          <a href="/search/#/shop?keyword=8888">吵河粉</a>
          <a href="/search/#/shop?keyword=8888">蛋糕</a>
          <a href="/search/#/shop?keyword=8888">我的菜</a>
          <a href="/search/#/shop?keyword=8888">鱿鱼</a>
          <a href="/search/#/shop?keyword=8888">披萨</a>
          <a href="/search/#/shop?keyword=8888">披萨</a>
          <a href="/search/#/shop?keyword=8888">披萨</a>
        </div>
      </header>
    )
  }

  showSelectCityPage() {
    this.props.showSelectCityPage()
  }

}

export default Head