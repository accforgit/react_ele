import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class SaleItem extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    let {item, type} = this.props
    let linkUrl = type==="recommend" ? "/recommend" : ("/"+type+"/"+item.id)
    return (
      <a className="discover-sale-item" href={linkUrl}>
        {
          !(type==="recommend") && item.discount &&
          <span className="discount">{item.discount}折</span>
        }
        {
          !(type==="recommend") && item.tag &&
          <span className="discount">{item.tag}</span>
        }
        <img className="sale-img" src={item.img} alt={item.name}/>
        <p className="shop-name text-ellipsis">{item.name}</p>
        <p className="shop-price">
          <span className="newprice text-ellipsis">
            {
              type==="present" ?
              (item.price+"积分" ):
              ("￥"+item.price)
            }
          </span>
          {
            !(type==="recommend") && item.oldprice &&
            <del className="oldprice lt12 text-ellipsis">￥{item.oldprice}</del>
          }
        </p>
      </a>
    )
  }
}

export default SaleItem