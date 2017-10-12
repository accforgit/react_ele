import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { historyBack } from 'util'
import './style.less'

import Star from 'commonComponent/Star'
import SvgIcon from 'commonComponent/SvgIcon'
import ShopActivities from '../ShopActivities'
import AnimateShow from 'commonComponent/AnimateShow'

import CloseIcon from '@img/svg/close.svg'

class DetailHead extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this.shouldShowMoreActivities = this.shouldShowMoreActivities.bind(this)
    this._createShopActivityMask = this._createShopActivityMask.bind(this)

    this.state = {
      showMoreActivities: false
    }
  }
  render() {
    let data = this.props.data
    return (
      <section className="detail-head">
        <div className="mask-bg" style={{backgroundImage: 'url('+data.bgImg+')'}}></div>  
        <nav className="arrow-back">
          <svg className="back-icon" onClick={historyBack}>
            <use xlinkHref="#arrow-left"></use>
          </svg>
        </nav>
        <div className="head-main">
          <div>
            <img src={data.img} alt={data.title}/>
          </div>
          <div className="head-content">
            <div className="head-summary">
              <h2 className="head-shopname">
                {data.title}
              </h2>
              <p className="head-delivery lt11 originleft">
                <span>{data.delivery[0]}</span>
                <span>{data.delivery[1]}分钟送达</span>
                <span>配送费￥{data.delivery[2]}</span>
              </p>
              <p className="head-notice lt11 originleft text-ellipsis">
                公告：{data.notice}
              </p>
            </div>
          </div>
        </div>
        <div className="head-activities" onClick={this.shouldShowMoreActivities}>
          <p className="activities-content lt12 originleft">
            <span className="tag">{data.promotion[0].type.name}</span>
            <span className="activities-first">{data.promotion[0].detail}</span>
          </p>
          <span className="lt12 originright">{data.promotion.length}个活动</span>
        </div>
        
        <AnimateShow
          shouldShow={this.state.showMoreActivities}
          childrenEle={this._createShopActivityMask(data.promotion)}/>
      </section>
    )
  }

  shouldShowMoreActivities() {
    this.setState({
      showMoreActivities: !this.state.showMoreActivities
    })
  }

  _createShopActivityMask(promotion) {
    return (
      <div className="shop-activity-mask">
        <h2 className="shop-name">吉野家</h2>
        <div><Star starPercent={.85} starSize='1.8rem'/></div>
        <span className="shop-tag">优惠信息</span>
        <ShopActivities activities={promotion}/>
        <span className="shop-tag">商家公告</span>
        <p className="shop-notice">商家公告商家公告商家公告</p>
        <div className="close-box">
          <a href="javascript:;" className="close-icon-box" onClick={this.shouldShowMoreActivities}>
            <SvgIcon
              style={{width: '2rem', height: '2rem', fill: '#fff'}}
              path={CloseIcon}
              className="close-icon"/>
          </a>
        </div>
      </div>
    )
  }
}

export default DetailHead