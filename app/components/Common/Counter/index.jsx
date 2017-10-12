import React from 'react'
// import PureRenderMixin from 'react-addons-pure-render-mixin'
import HocRedux from 'util/HocRedux'

import './style.less'

class Counter extends React.Component {
  constructor(props) {
    super(props)
    // this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this.addCount = this.addCount.bind(this)
    this.minusCount = this.minusCount.bind(this)

    this.addReduxCount = props.reduxActions.addCartCount
    this.minusReduxCount = props.reduxActions.minusCartCount

    this.state = {
      shopId: props.shopId,
      foodId: props.foodId,
      productCountList: props.reduxState.cartCount,
      count: props.count
    }
  }

  shouldComponentUpdate(newState) {
    let state = this.state
    let foodId = newState.shouldChangeDetailMainProd.foodId

    if( foodId === false && state.count !== 0) {
      // 清空购物车动作
      this.state.count = 0
      return true
    }

    let count = this.getCount()
    this.state.count = count

    if(foodId === this.state.foodId) {
      return true
    } else {
      return false
    }
  }

  componentWillMount() {
    this.state.count = this.getCount()
  }

  render() {
    let count = this.state.count

    return (
      <p className="counter-box" name={this.props.foodId}>
        {
          count>0 &&
          <span className="minusBtn">
            <svg className='minusIcon' onClick={this.minusCount}>
              <use xlinkHref="#cart-minus"></use>
            </svg>
          </span>
        }
        {
          count>0 &&
          <span className="currentCount">{count}</span>
        }
        <span className="addBtn">
          <svg className='addIcon' onClick={this.addCount}>
            <use xlinkHref="#cart-add"></use>
          </svg>
        </span>
      </p>
    )
  }

  addCount() {
    let props = this.props
    let shopId = props.shopId
    let actionData = {
      shopId: props.shopId,
      foodId: props.foodId,
      foodprice: props.foodprice,
      foodTitle: props.foodTitle,
    }
    let newCount = this.getCount() + 1
    // let newCount = props.count + 1
    this.setState({
      count: newCount
    })
    this.addReduxCount({...actionData})

    this.callBackFn(props, actionData, newCount)
  }

  minusCount() {
    let props = this.props
    let actionData = {
      foodId: props.foodId,
      shopId: props.shopId
    }
    let newCount = this.getCount() - 1
    // let newCount = props.count - 1
    this.setState({
      count: newCount
    })
    this.minusReduxCount({...actionData})

    this.callBackFn(props, actionData, newCount)
  }

  getCount() {
    let state = this.state
    let { shopId, foodId } = state
    let productCountList = this.props.reduxState.cartCount
    let prodLen = productCountList.length
    let count = 0

    for(let i=0; i<prodLen; i++) {
      let productInfo = productCountList[i]
      // if(productInfo.foodId === foodId && productInfo.shopId === shopId) {
      if(productInfo.foodId === foodId && productInfo.shopId === shopId) {
        count = productInfo.count
        break
      }
    }
    return count
  }

  callBackFn(props, actionData, newCount) {
    let isCartCounter = props.isCartCounter || false
    let newProps = Object.assign({}, actionData, { newCount, isCartCounter })
    props.callBackFn && props.callBackFn({...newProps})
  }
}

export default HocRedux(Counter)