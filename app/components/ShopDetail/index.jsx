import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import HocRedux from 'util/HocRedux'
import LoadingPage from 'commonComponent/LoadingPage'
import LocalStorage from 'util/localStore.js'
import { localStorageKey } from '@config/index'

import {
  selectEle,
  getRecursiveEle,
  scrollAnimate,
  isEqualArray,
  bindScope } from 'util'

import {getShopDetailData} from '@fetch/home/home.js'
import './style.less'

import DetailHead from './DetailHead'
import Cart from './Cart'
import FlyBall from './Flyball'
import DetailMain from './DetailMain'
import CommentTabCard from './CommentTabCard'
import ShopTabCard from './ShopTabCard'

class ShopDetail extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    bindScope(this, [
      'changeTabCard',
      'changeRightMenu',
      'changeLeftMenu',
      'updateCart',
      'changeFlyBallCount',
      'initCart',
      'setCount',
      'tabCardShowStyle'
    ])
    this.state = {
      shopDetailData: null,
      scoreList: null,
      selectProduct: [],
      mailHeight: 0,
      shopMainHeight: 0,
      listenerEvent: null,
      currentTabCardIndex: 0,
      currentMenuList: null,
      cacheMenuHeight: {
        leftMenu: [],
        rightShop: [],
        rightChangeValue: []
      },
      ballsTarget: null,
      shouldChangeDetailMainProd: null,
      // 抛物小球
      balls: [
        {show: false, position: {}},
        {show: false, position: {}},
        {show: false, position: {}},
        {show: false, position: {}},
        {show: false, position: {}}
      ]
      // 当小球不够用时，应该被从队列中回收的小球index
      // hideBalls: 2
    }
  }

  componentWillMount() {
    this.initCart()
  }

  componentDidUpdate() {
    // 因为 componentDidMount 用于获取数据，然后才渲染页面，无法获取元素，所以移到这里
    if(!this.state.listenerEvent && selectEle('.detail-head')) {
      let state = this.state
      state.listenerEvent = true

      let shopMainHeight = window.screen.height - selectEle('.detail-head').offsetHeight - selectEle('.detail-tab').offsetHeight
      // 不包括 购物车 DOM
      let mailHeight = shopMainHeight - selectEle('#cartBox').offsetHeight
      this.setState({
        shopMainHeight,
        mailHeight
      })
      let menuListBox = document.getElementsByClassName('menu-category')[0]
      state.currentMenuList = 0

      this.getMenuHeight()
      menuListBox.getElementsByClassName('menu-list')[0].className += ' menu-list-active'
      menuListBox.addEventListener('touchend', this.changeRightMenu)
      selectEle('.category-container').onscroll = this.changeLeftMenu
    }
  }

  render() {
    let state = this.state
    let data = state.shopDetailData
    let shopId = data && data.id

    return (
      <div id="detail-box">
        {
          data ?
          <div className="detail-wrapper">
            <DetailHead data={data}/>
            <div className="detail-tab">
              <div className="tab-card goods-tab" onClick={this.changeTabCard.bind(this, 0)}>
                <span className={0 === state.currentTabCardIndex ? 'tab-active' : ''}>商品</span>
              </div>
              <div className="tab-card comment-tab" onClick={this.changeTabCard.bind(this, 1)}>
                <span className={1 === state.currentTabCardIndex ? 'tab-active' : ''}>评价</span>
              </div>
              <div className="tab-card shop-tab" onClick={this.changeTabCard.bind(this, 2)}>
                <span className={2 === state.currentTabCardIndex ? 'tab-active' : ''}>店铺</span>
              </div>
            </div>
            <section className="goods-tab-card" style={this.tabCardShowStyle(0, state.mailHeight)}>
              <DetailMain
                mailHeight={state.mailHeight}
                shouldChangeDetailMainProd={state.shouldChangeDetailMainProd}
                shopId={shopId}
                updateCart={this.updateCart}
                data={data.product}/>
              <Cart
                shouldChangeDetailMainProd={state.shouldChangeDetailMainProd}
                selectProduct={state.selectProduct}
                shopId={shopId}
                updateCart={this.updateCart}/>
              <FlyBall
                changeFlyBallCount={this.changeFlyBallCount}
                balls={state.balls}
                target={state.ballsTarget}
                curvature={0.004}
                speed={200}/>
            </section>
            {
              <section className="comment-tab-card" style={this.tabCardShowStyle(1)}>
                <CommentTabCard scoreList={state.scoreList}/>
              </section>
            }
            <section className="shop-tab-card" style={this.tabCardShowStyle(2)}>
              <ShopTabCard shopTabCardInfo={data}/>
            </section>
          </div> :
          <LoadingPage/>
        }
      </div>
    )
  }

  componentDidMount() {
    this.loadDetailData()
  }

  componentWillUnmount() {
    // 卸载页面之前，将选择的商品信息存储到 localStorage
    this.productStorage()
  }

  tabCardShowStyle(cardIndex, height) {
    let state = this.state
    return {
      display: state.currentTabCardIndex === cardIndex ? 'block' : 'none',
      height: (height ? height : state.shopMainHeight) + 'px'
    }
  }

  initCart() {
    let state = this.state
    let props = this.props
    let shopId = props.params.shopId
    let reduxSelectProduct = props.reduxState.cartCount || []
    let selectProducts = LocalStorage.getItem(localStorageKey.PRODUCTS)
    
    // console.log(78789, selectProducts, shopId);
    if(!selectProducts) {
      return
    }
    selectProducts = JSON.parse(selectProducts)
    selectProducts.forEach((item)=>{
      if(shopId === item.shopId) {
        state.selectProduct = item.data
        item.data.forEach(item1=>{
          this.setCount(shopId, item1)
        })
      }
    })
  }

  setCount(shopId, item1) {
    let { foodId, foodprice, foodTitle, count } = item1
    let actionData = { shopId, foodId, foodprice, foodTitle, count }
    this.props.reduxActions.addCartCount({...actionData})
  }

  productStorage() {
    let state = this.state
    let props = this.props
    let shopId = props.params.shopId
    // 离开页面的时候，将购物车中商品信息存入 localStorage
    let products = LocalStorage.getItem(localStorageKey.PRODUCTS)
    if (!products) {
      if(state.selectProduct.length !== 0) {
        LocalStorage.setItem(localStorageKey.PRODUCTS, JSON.stringify([{shopId, data: state.selectProduct}]))
      }
      return
    }
    products = JSON.parse(products)
    let isExist = products.some((item, index)=> {
      if(item.shopId === shopId) {
        let selectProduct = state.selectProduct
        // 如果当前店铺 shopId下已经没有 selectProduct数据了，则删除当前店铺数据结构，否则，进行赋值操作
        selectProduct.length === 0 ? products.splice(index, 1) : (item.data = selectProduct)
        LocalStorage.setItem(localStorageKey.PRODUCTS, JSON.stringify(products))
        return true
      }
      return false
    })
    if(!isExist && state.selectProduct.length !== 0) {
      products.push({shopId, data: state.selectProduct})
      LocalStorage.setItem(localStorageKey.PRODUCTS, JSON.stringify(products))
    }
  }

  loadDetailData() {
    const shopDetailData = getShopDetailData(this.props.params.shopId)
    this.resultHandle(shopDetailData)
  }

  resultHandle(result) {
    result.then(res=>{
      return res.json()
    }).then(data=>{
      if(data) {
        let { averageScore, foodScore, foodTime, serviceScore, contrast } = data
        let scoreList = {
          averageScore,
          foodScore,
          foodTime,
          serviceScore,
          contrast
        }
        this.setState({
          scoreList,
          shopDetailData: data
        }, ()=> {
          this.addBtnListener()
        })
      }
    }).catch((ex)=>{
      console.log(ex);
      // if (__DEV__) {
      //   console.error('商家详情页获取数据报错, ', ex.message)
      // }
    })
  }

  // 监听添加商品按钮
  addBtnListener() {
    selectEle('.category-container').addEventListener('click', (e)=>{
      let showBallPoint = null
      let target = e.target
      let nodeName = target.nodeName
      let parentNode = target.parentNode
      if((parentNode.nodeName.toLowerCase() === 'svg' && parentNode.className.baseVal === 'addIcon') ||
        (nodeName.toLowerCase() === 'svg' && target.className.baseVal === 'addIcon') ||
        (nodeName.toLowerCase() === 'span' && target.className.indexOf('addBtn') !== -1))
      {
        showBallPoint = true
      }
      if(showBallPoint) {
        this.setState({
          ballsTarget: selectEle('.cart-icon-box')
        })
        this.showFlyBall(e)
      }
    })
  }

  getMenuHeight() {
    let state = this.state
    let menuCount = state.shopDetailData.product.length
    let leftMenu = selectEle('.menu-list', true)
    let rightShop = selectEle('.category-item', true)
    let eleHeight, rightFirstShop = null
    for(let i=0; i<menuCount; i++) {
      state.cacheMenuHeight.leftMenu.push(leftMenu[i].offsetTop)
      state.cacheMenuHeight.rightShop.push(rightShop[i].offsetTop)
      rightFirstShop === null && (rightFirstShop = rightShop[i].offsetTop)
      state.cacheMenuHeight.rightChangeValue.push(-(rightShop[i].offsetTop - rightFirstShop*2))
    }
  }

  // 左侧变化，右侧切换类别
  changeRightMenu(e) {
    let state = this.state
    // 点击左侧改变右侧，停掉右侧滚动监听事件
    selectEle('.category-container').onscroll = null
    let menuListBox = document.getElementsByClassName('menu-category')[0]
    let liEle = getRecursiveEle(e.target)
    let currentLiEle = menuListBox.getElementsByClassName('menu-list')[state.currentMenuList]
    currentLiEle.className = currentLiEle.className.replace(/\smenu-list-active/, '')
    state.currentMenuList = liEle.getAttribute('name')

    let cateContainer = selectEle('.category-container')
    let targetScrollTop = state.cacheMenuHeight.rightShop[state.currentMenuList] - state.cacheMenuHeight.rightShop[0]
    scrollAnimate(cateContainer, cateContainer.scrollTop, targetScrollTop, 10, rightShopScrollEvent.bind(this))
    liEle.className += ' menu-list-active'

    // 恢复右侧监听事件
    function rightShopScrollEvent() {
      console.log('rightShop')
      selectEle('.category-container').onscroll = this.changeLeftMenu
    }
  }
  // 右侧变化，左侧切换类别
  changeLeftMenu() {
    let state = this.state
    let cateOffsetH = Math.ceil(selectEle('.category-item').getBoundingClientRect().top)
    // let rightShopInfo = state.cacheMenuHeight.rightShop
    let rightChangeValue = state.cacheMenuHeight.rightChangeValue
    let len = rightChangeValue.length

    for(let i=0; i<len; i++) {
      if(cateOffsetH<rightChangeValue[i] && (i+1===len ? true : cateOffsetH>rightChangeValue[i+1] )) {
        let menuListBox = selectEle('.menu-category')
        let menuListItems = menuListBox.querySelectorAll('.menu-list')
        state.currentMenuList !== i &&
        (menuListItems[state.currentMenuList].className =
          menuListItems[state.currentMenuList].className.replace(/\smenu-list-active/, ''))

        state.currentMenuList !== i && (menuListItems[i].className += ' menu-list-active')
        state.currentMenuList = i
        break
      }
    }
  }

  updateCart(productInfo) {
    if(productInfo) {
      let state = this.state
      let selectProduct = state.selectProduct
      let foodId = productInfo.foodId
      let shopId = productInfo.shopId
      let len = selectProduct.length
      let isExist = false
      for(let i=0; i<len; i++) {
        if(selectProduct[i].foodId === foodId) {
          isExist = true
          selectProduct[i].count = productInfo.newCount
          break
        }
      }
      if(!isExist) {
        selectProduct.push({
          foodId: foodId,
          count: 1,
          foodTitle: productInfo.foodTitle,
          foodprice: productInfo.foodprice
        })
      }
  
      selectProduct = selectProduct.filter((item)=> {
        return item.count > 0
      })
  
      this.setState({
        // 用于强制 Counter刷新重绘
        shouldChangeDetailMainProd: {foodId},
        selectProduct: Object.assign([], selectProduct)
      })
    } else {
      this.setState({
        // 用于强制 Counter刷新重绘
        shouldChangeDetailMainProd: {foodId: false},
        selectProduct: []
      })
    }
  }

  changeTabCard(index) {
    this.setState({
      currentTabCardIndex: index
    })
  }

  showFlyBall(e) {
    let state = this.state
    // console.log('eee:', e.pageY, e.pageX, this.props.source);
    let balls = state.balls
    // 这里的 5，指的是小球的最大数量
    for(let i=5; i--;) {
      if(!balls[i].show) {
        balls[i].show = true
        balls[i].position = {
          x: e.pageX,
          y: e.pageY
        }
        this.setState({
          balls: Object.assign([], balls)
        })
        // 找到了一个可以使用的小球，直接退出不再继续循环寻找
        break
      }
    }
  }

  changeFlyBallCount(id) {
    let state = this.state
    let balls = state.balls
    balls[id].show = false
    this.setState({
      balls: Object.assign([], state.balls)
    })
  }
}

export default HocRedux(ShopDetail)