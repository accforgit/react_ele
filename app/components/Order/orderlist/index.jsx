import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import '../../../static/css/Order/orderlist/style.less'
import {formatTime} from 'util'

class OrderList extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    let data = this.props.data
    let orderState = data.orderState
    orderState = orderState===1 ? '正在进行中' : '订单已完成'

    let time = data.time
    let format_time = formatTime(time)
    let isOffset = format_time.isOffset

    if(isOffset) {
      let {fullYear, month, date, hour, minute} = format_time
      time = fullYear + '-' + month + '-' + date + ' ' + hour + ':' + minute
    } else {
      let { offsetHours, offsetMinutes} = format_time
      time = offsetHours + '小时' + offsetMinutes + '分钟前'
    }

    let products = data.products
    if(products.length>1) {
      products = products[0] + '等' + products.length + '件商品'
    }
    return (
      <a className="order-list">
        <div className="order-content">
          <div className="order-left">
            <img src={data.img} alt={data.title}/>
          </div>
          <div className="order-right">
            <div className="first">
              <div className="shop-title">
                <p className="title-text text-ellipsis">
                  {data.title}
                </p>
                <svg className="order-arrow-right">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </div>
              <span className="order-state">
                {orderState}
              </span>
            </div>
            <p className="second originleft lt12">
              {time}
            </p>
            <div className="third">
              <p className="products text-ellipsis">
                {products}
              </p>
              <span className="price">￥{data.price}</span>
            </div>
          </div>
        </div>
        <div className="order-btn-group">
          <button className="another">再来一单</button>
          {
            data.commentState===0 &&
            <button className="goToComment">评价得180积分</button>
          }
        </div>
      </a>
    )
  }
}

export default OrderList