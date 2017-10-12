import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import 'style/Home/shoplist/style.less'

class ShopListItem extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this.goShopDetail = this.goShopDetail.bind(this)
    this.activityRotate = this.activityRotate.bind(this)

    this.state = {
      shouldExpand: false
    }
  }
  
  render() {
    let data = this.props.data
    let range = data.range
    range = range>1000 ? range = (range/1000).toFixed(2)+'km' : range+'m'
    return (
      <li className="list-item" onClick={this.goShopDetail.bind(this, data.id)}>
        {
          data.isNewSale &&
          <p className="new-sale">
            <span>新店</span>
          </p>
        }
        <div className="item-left">
          <img src={data.img} alt={data.title}/>
        </div>
        <div className="item-right">
          <div className="sale-title">
            <h3 className="shopname">
              {
                data.isBrand &&
                <span className="brandSale"></span>
              }
              <span>{data.title}</span>
            </h3>
            <p className="bpz lt11 originright">
              {
                data.tags.map((item, index)=>{
                  return <i className="bao" key={index}>{item.name}</i>
                })
              }  
            </p>
          </div>
          <div className="item-rating">
            <div>
              <section className="rating-box">
                <p className="mask-rating">
                  {
                    [1,2,3,4,5].map((item, index)=>{
                      return (
                        <svg className="svg-rating" key={index}>
                          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#rating-star"></use>
                        </svg>
                      )
                    })
                  }
                </p>
                <p className="fill-rating">
                  {
                    [1,2,3,4,5].map((item, index)=>{
                      return (
                        <svg className="svg-rating" key={index}>
                          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#rating-star"></use>
                        </svg>
                      )
                    })
                  }
                </p>
              </section>
              <span className="rating-score lt12">{data.ratingScore}</span>
              <span className="sale-count lt12">月售{data.monthSaleCount}单</span>
            </div>
            <p className="zf lt11 originright">
              {
                data.labels.map((item, index)=>{
                  return <span className={'zf_'+item.id} key={index}>{item.name}</span>
                })
              }
            </p>
          </div>
          <div className="price-distance">
            <section className="price lt12 originleft">
              <span className="start-price">¥{data.startPrice}起送</span>
              <span className="slash"></span>
              <span className="freight-price">配送费¥{data.freightPrice}</span>
              <span className="slash"></span>
              <span className="average-price">¥{data.averagePrice}/人</span>
            </section>
            <section className="distance lt12 originright">
              <span className="range">{range}</span>
              <span className="slash"></span>
              <span className="time">{data.time}分钟</span>
            </section>
          </div>
          <div className="promotion">
            <div className="promotion-detail">
              {
                data.promotion.map(this._createActivity)
              }
            </div>
            {
              data.promotion.length>2 &&
              <div className="promotion-summary lt11 originleft" onClick={this.activityRotate}>
                <span className="promotion-arrow">{data.promotion.length}个活动</span>
                <span className={!this.state.shouldExpand ? "promotion-arrow promotion-more" : "promotion-arrow promotion-more activityRotate"}></span>
              </div>
            }
          </div>
        </div>
      </li>
    )
  }

  goShopDetail(id, e) {
    this.context.router.push('/ShopDetail/' + id)
  }

  _createActivity(item, index) {
    let expand = index>1
    return (
      <p className='promotion-item text-ellipsis' key={index} style={expand ? {display: 'none'} : {}}>
        <i className={'promotion-icon_' + item.type.id}>
          {item.type.name}
        </i>{item.detail}
      </p>
    )
  }

  activityRotate(e) {
    // 阻止事件冒泡
    e.stopPropagation()
    
    let isArrowEle = this.getPromotionArrow(e.target, e.target.className)
    if(isArrowEle) {
      let { arrowTarget, arrowClassName } = isArrowEle
      // 如果是点击展开更多商家优惠活动
      let promotionItem = arrowTarget.parentNode.parentNode.querySelectorAll(".promotion-item")
      let len = promotionItem.length
      for(let i=0; i<len; i++) {
        if(i>1) {
          if(promotionItem[i].getAttribute('style')) {
            promotionItem[i].setAttribute('style', '')
          } else {
            promotionItem[i].setAttribute('style', 'display:none')
          }
        }
      }
  
      if(arrowClassName.includes('activityRotate')) {
        arrowTarget.className = 'promotion-arrow promotion-more'
      } else {
        arrowTarget.className = 'promotion-arrow promotion-more activityRotate'
      }
    }
  }

  getPromotionArrow(target, className) {
    let arrowTarget = null
    if(className.includes('promotion-arrow')) {
      if(className.includes('promotion-more')) {
        arrowTarget = target
      } else {
        arrowTarget = target.nextElementSibling
        className = arrowTarget.className
      }
    } else if(className.includes('promotion-summary')) {
      arrowTarget = target.querySelector('.promotion-more')
      className = arrowTarget.className
    }
    return { arrowTarget, arrowClassName: className }
  }
}

ShopListItem.contextTypes = {
  router: React.PropTypes.object
}

export default ShopListItem