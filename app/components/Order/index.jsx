import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import CommonHead from '../Common/CommonHead'
import OrderList from './orderlist'
import LoadMore from '../Common/LoadMore'
import {getOrderListData} from '../../fetch/home/home.js'
import 'style/Order/style.less'

class Order extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this.listenScroll = this.listenScroll.bind(this)

    this.state = {
      orderlist: [],
      hasMore: false,
      isLoadingMore: false,
      shouldLoad: false,
      page: 0,
      timeoutId: null
    }
  }
  render() {
    let orderlist = this.state.orderlist
    return (
      <div id="order-box">
        <CommonHead title="订单"/>
        {
          orderlist.length>0 &&
          orderlist.map((item, index)=>{
            return <OrderList key={index} data={item}/>
          })
        }
        {
          this.state.hasMore &&
          <LoadMore
            shouldLoad={this.state.shouldLoad}
            changeShouldLoadState={this.changeShouldLoadState.bind(this)}
            isLoadingMore={this.state.isLoadingMore}
            loadMoreFn={this.loadMoreData.bind(this)}/>
        }
      </div>
    )
  }

  componentDidMount() {
    this.loadFirstPageData()

    window.addEventListener('scroll', this.listenScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenScroll)
  }

  listenScroll() {
    let timeoutId = this.state.timeoutId
    if(this.state.isLoadingMore) {
      return
    }
    if(timeoutId) {
      clearTimeout(timeoutId)
    }
    this.state.timeoutId = setTimeout(()=>{
      if(document.body.scrollTop > 300) {
        this.setState({
          showGototop: true
        })
      } else {
        this.state.showGototop && this.setState({ showGototop: false })
      }
      this.setState({
        shouldLoad: true
      })
    }, 50)
  }

  loadMoreData() {
    const page = this.state.page + 1
    this.setState({
      isLoadingMore: true
    })

    const orderListData = getOrderListData(1, page)
    const handleResult = this.resultHandle(orderListData)
    handleResult.then(r=>{
      if(r) {
        this.setState({
          page: page,
          isLoadingMore: false
        })
      }
    })
  }

  loadFirstPageData() {
    const orderListData = getOrderListData(1)
    this.resultHandle(orderListData)
  }

  changeShouldLoadState() {
    this.setState({
      shouldLoad: !this.state.shouldLoad
    })
  }

  resultHandle(orderListData) {
    return orderListData.then(res=>{
      return res.json()
    }).then(obj=>{
      let data = obj.data
      this.setState({
        orderlist: this.state.orderlist.concat(data),
        hasMore: obj.hasMore
      })
      return true
    }).catch(ex=>{
      // if (__DEV__) {
        console.error('订单页订单列表获取数据报错, ', ex.message)
      // }
      console.log(ex)
      return false
    })
  }
}

export default Order