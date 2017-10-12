import React from 'react'
import { Link } from 'react-router'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import 'style/TabBar/style.less'

class TabBar extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this.changeTab = this.changeTab.bind(this)

    this.state = {
      currentTab: 'tab-home'
    }
  }
  render() {
    return (
      <footer id="tabBar-box">
        <div className="tabBar-wrapper">
          <Link to="/Home" className="tab-home" onClick={this.changeTab}>
            <svg className="tab-icon">
              <use xlinkHref={this.state.currentTab==='tab-home' ? "#tabBar-home-active" : "#tabBar-home"}></use>
            </svg>
            <span>外卖</span>
          </Link>
          <Link to="/Discover" className="tab-discover" onClick={this.changeTab}>
            <svg className="tab-icon">
              <use xlinkHref={this.state.currentTab==='tab-discover' ? "#tabBar-discover-active" : "#tabBar-discover"}></use>
            </svg>
            <span>发现</span>
          </Link>
          <Link to="/Order" className="tab-order" onClick={this.changeTab}>
            <svg className="tab-icon">
              <use xlinkHref={this.state.currentTab==='tab-order' ? "#tabBar-order-active" : "#tabBar-order"}></use>
            </svg>
            <span>订单</span>
          </Link>
          <Link to="/User" className="tab-user" onClick={this.changeTab}>
            <svg className="tab-icon">
              <use xlinkHref={this.state.currentTab==='tab-user' ? "#tabBar-user-active" : "#tabBar-user"}></use>
            </svg>
            <span>我的</span>
          </Link>
        </div>
      </footer>
    )
  }

  changeTab(e) {
    this.setState({
      currentTab: e.currentTarget.className
    })
  }
}

export default TabBar