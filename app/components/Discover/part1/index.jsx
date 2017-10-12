import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

import { serverInfo } from '@config/index'

class Part1 extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    return (
      <section id="part1">
        <div className="list3">
          <a href="/shopmall" className="shopmall">
            <div className="title">
              <p className="main-title">积分商城</p>
              <p className="sub-title">0元好物在这里</p>
            </div>
            <img src={`//${serverInfo.host}:${serverInfo.staticPort}/discover/shopmall.jpeg`} alt="积分商城"/>
          </a>
          <a href="/dainty" className="dainty">
            <div className="title">
              <p className="main-title">美味爆料</p>
              <p className="sub-title">冰爽没事吃吃吃</p>
            </div>
            <img src={`//${serverInfo.host}:${serverInfo.staticPort}/discover/dainty.jpeg`} alt="美味爆料"/>
          </a>
          <a href="/commend4reward" className="commend4reward">
            <div className="title">
              <p className="main-title">推荐有奖</p>
              <p className="sub-title">5元现金拿不停</p>
            </div>
            <img src={`//${serverInfo.host}:${serverInfo.staticPort}/discover/commend4reward.jpeg`} alt="推荐有奖"/>
          </a>
        </div>
        <div className="list1">
          <a href="/activity">
            <img className="activity-img" src={`//${serverInfo.host}:${serverInfo.staticPort}/discover/activity.jpeg`} alt=""/>
          </a>
        </div>
      </section>
    )
  }
}

export default Part1