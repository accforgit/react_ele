import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import HocRedux from 'util/HocRedux'
import Counter from 'commonComponent/Counter'

import { selectEle, getH, getClientHeight } from 'util'

import './style.less'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this.clearCart = this.clearCart.bind(this)
    this.sholdCartShowDetail = this.sholdCartShowDetail.bind(this)
    this._createSelectProduct = this._createSelectProduct.bind(this)

    let selectProduct = props.selectProduct || []

    this.state = {
      cartSummaryH: 0,
      cartCount: 0,
      screenHeight: 0,
      selectProduct,
      totalCount: 0,
      totalPrice: 0
    }
  }

  componentWillMount() {
    let state = this.state
    this.screenHeight = window.screen.availHeight
    this.getTotal(state.selectProduct, state, true)
  }

  componentWillReceiveProps(newProps) {
    let state = this.state
    let selectProduct = newProps.selectProduct
    state.selectProduct = selectProduct

    this.getTotal(selectProduct, state)
  }

  render() {
    let state = this.state
    let selectProduct = state.selectProduct
    // console.log(123, state.selectProduct, this.props)
    let totalPrice = state.totalPrice
    let totalCount = state.totalCount

    return (
      <footer id="cartBox">
        <div className="cart-summary" onClick={this.sholdCartShowDetail}>
          <div className={totalCount===0 ? "cart-icon-box cart-icon-box-count0" : 'cart-icon-box'} data-total-count={totalCount}></div>
          <div className="cart-pay">
            <p className="cart-price-box lt11 originleft">
              <span className="cart-price">￥{totalPrice}</span>
              <span className="cart-travel-price">配送费￥8</span>
            </p>
            <a href="javascript:;" className="cart-balance">去结算</a>
          </div>
        </div>
        <section className="cart-detail">
          <p className="cart-detail-head">
            <b className="detail-title">购物车</b>
            <a href='javascript:;' className="cart-clear" onClick={this.clearCart}>清空</a>
          </p>
          <ul className="cart-detailList" style={{maxHeight: this.screenHeight*.4 + 'px'}}>
            {
              selectProduct.map(this._createSelectProduct)
            }
          </ul>
        </section>
        <div className={"cart-mask"} onClick={this.sholdCartShowDetail} style={{display: 'none', opacity: 0}}></div>
      </footer>
    )
  }

  componentDidMount() {
    this.state.cartSummaryH = getH('.cart-summary')
  }

  sholdCartShowDetail() {
    if(this.state.totalCount === 0) {
      return
    }
    let cartIcon = selectEle('.cart-icon-box')
    let cartMaskEle = selectEle('.cart-mask')
    let cartMskEleStyle = cartMaskEle.style
    if(cartMskEleStyle.display === 'block') {
      cartMskEleStyle.opacity = 0
      selectEle('.cart-detail').style.bottom = '-50%'
      cartMaskEle.addEventListener('transitionend', function callFn(e) {
        if(e.propertyName === 'opacity') {
          cartMskEleStyle.display = 'none'
          cartMaskEle.removeEventListener('transitionend', callFn)
        }
      })
    } else {
      cartMskEleStyle.display = 'block'
      // 遮罩层的渐变出现
      requestAnimationFrame((e)=>{
        cartMskEleStyle.opacity = .4
        selectEle('.cart-detail').style.bottom = selectEle('.cart-summary').offsetHeight + 'px'
      })
    }
  }

  _createSelectProduct(item, index) {
    let props = this.props
    let shouldChangeDetailMainProd = props.shouldChangeDetailMainProd
    let shopId = props.shopId
    let foodId = item.foodId
    !foodId && foodId!==0 && (foodId = item.foodId)
    let productSummary = {
      foodId,
      shopId,
      foodprice: item.foodprice,
      foodTitle: item.foodTitle,
    }
    return (
      <li className="detail-item" key={`${shopId}-${foodId}`} name={`${shopId}-${foodId}`}>
        <span className="item-title">{item.foodTitle}</span>
        <div className="priceCount">
          <b className="totalprice">{item.foodprice}</b>
          <div className="count">
            <Counter
              {...productSummary}
              shouldChangeDetailMainProd={shouldChangeDetailMainProd}
              callBackFn={props.updateCart}/>
          </div>
        </div>
      </li>
    )
  }

  getTotal(selectProduct, state, init=false) {
    // 商品总数和总价
    let totalPrice = 0
    let totalCount = 0
    selectProduct = selectProduct.filter((item)=> {
      let count = item.count
      if(count > 0) {
        totalCount += count
        totalPrice += count * item.foodprice
        return true
      }
      return false
    })
    if(!init && totalCount === 0 && selectEle('.cart-mask').style.display==='block') {
      this.sholdCartShowDetail()
    }
    state.totalCount = totalCount
    state.totalPrice = totalPrice
  }

  clearCart() {
    let props = this.props
    props.reduxActions.clearCartCount({shopId: props.shopId})
    this.sholdCartShowDetail()
    // 清空购物车
    props.updateCart(false)
  }
}

export default HocRedux(Cart)