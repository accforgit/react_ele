import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import HocRedux from 'util/HocRedux'
import { serverInfo } from '@config/index'

import { selectEle } from 'util'

import Counter from 'commonComponent/Counter'

import './style.less'

class DetailMain extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this._createShopMain = this._createShopMain.bind(this)
    this._createShopItem = this._createShopItem.bind(this)

    this.state = {
      data: props.data
    }
  }

  render() {
    let props = this.props
    let data = props.data
    return (
      <div className="shop-main">
        <ul className="menu-category">
          {
            data.map(this._createMenuList)
          }
        </ul>
        <section className="category-container">
          {
            data.map(this._createShopMain)
          }
        </section>
      </div>
    )
  }

  // 左侧菜单
  _createMenuList(item, index) {
    let spe = [
      {name: '热销', imgUrl: `http://${serverInfo.host}:${serverInfo.staticPort}/detail/rexiao.jpeg`},
      {name: '优惠', imgUrl: `http://${serverInfo.host}:${serverInfo.staticPort}/detail/youhui.jpeg`}
    ]
    let catename = item.categoryName
    let speCateType
    for(let i in spe) {
      if(catename === spe[i].name) {
        speCateType = i
      }
    }
    return (
      <li key={index} className={"menu-list" + (typeof speCateType !== 'undefined' ? ' menu-list-spe' : '')} name={index}>
        {
          typeof speCateType !== 'undefined' &&
          <img src={spe[speCateType].imgUrl} alt={catename}/>
        }
        <span>{catename}</span>
      </li>
    )
  }

  // 右侧商品
  _createShopMain(item, index) {
    return (
      <div className="category-item" key={index}>
        <p className="category-title">
          <strong>{item.categoryName}</strong>
          <span className="lt11 originleft">{item.categoryDescription}</span>
        </p>
        <ul className="shop-list-box">
          {
            item.list.map(this._createShopItem)
          }
        </ul>
      </div>
    )
  }

  _createShopItem(item, index) {
    let props = this.props
    let shopId = props.shopId
    let foodId = item.foodId
    // !foodId && foodId !== 0 && (foodId = item.foodId)
    let productSummary = {
      foodId,
      shopId,
      foodprice: item.foodprice,
      foodTitle: item.foodTitle,
    }
    // item.count && console.log(9998989, item.count);
    // console.log(1212123, this.props.reduxState.cartCount)
    return (
      <li className="shop-list" name={`${shopId}-${foodId}`} key={`${shopId}-${foodId}`}>
        <img src={item.img} alt={item.foodTitle}/>
        <div className="shop-detail">
          <div className="shop-title">{item.foodTitle}</div>
          <p className="fooddescription lt11 originleft">{item.fooddescription}</p>
          <p className="foodsaleBox originleft">
            <span className="foodsale">月售{item.foodsale}份</span>
            <span className="foodrating">好评率{item.foodrating}%</span>
          </p>
          <p className="foodprice">￥{item.foodprice}</p>
        </div>
        <div className="cartbtn">
          <Counter
            {...productSummary}
            shouldChangeDetailMainProd={props.shouldChangeDetailMainProd}
            callBackFn={props.updateCart}/>
        </div>
      </li>
    )
  }
}

export default HocRedux(DetailMain)