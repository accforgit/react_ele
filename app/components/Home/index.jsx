import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {getCateData, getShoplistData} from '../../fetch/home/home.js'
import Head from './head'
import City from '../Common/City'
import Category from './category'
import ShopList from './shoplist'
import LoadMore from '../Common/LoadMore'
import GoToTop from '../Common/GoToTop'

import '../../static/css/Home/style.less'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.listenScroll = this.listenScroll.bind(this)

    this.state = {
      shouldLoad: false,
      showGototop: false,
      showSelectCity: false,
      categoryData: [],
      shoplistData: [],
      hasMore: false,
      isLoadingMore: false,
      page: 0,
      timeoutId: null
    }
  }

  render() {
    return (
      <div id="home-box" className={this.state.showSelectCity ? 'modalMskShow' : ''}>
        <City ref="cityComponent" showSelectCity={this.state.showSelectCity} showSelectCityPage={this.showSelectCityPage.bind(this)}/>
        <Head showSelectCityPage={this.showSelectCityPage.bind(this)}/>
        {
          this.state.categoryData.length>0
          && <Category data={this.state.categoryData}/>
        }
        <h3 className="shop-list-title">推荐商家</h3>
        {
          this.state.shoplistData.length>0
          && <ShopList data={this.state.shoplistData}/>
        }
        {
          this.state.hasMore &&
          <LoadMore
            shouldLoad={this.state.shouldLoad}
            changeShouldLoadState={this.changeShouldLoadState.bind(this)}
            isLoadingMore={this.state.isLoadingMore}
            loadMoreFn={this.loadMoreData.bind(this)}/>
        }
        <GoToTop showGototop={this.state.showGototop}/> 
      </div>
    )
  }

  componentDidMount() {
    // 加载大类别
    this.loadCategoryData()
    // 加载首页 推荐商家 数据
    this.loadFirstPageData()

    window.addEventListener('scroll', this.listenScroll)
  }

  listenScroll() {
    // 减少渲染次数，提升性能
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

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenScroll)
  }

  loadCategoryData() {
    const categoryData = getCateData()
    categoryData.then((res)=>{
      return res.json()
    }).then((json)=>{
      let data = json.data
      if(data && data.length>0) {
        this.setState({
          categoryData: data
        })
      }
    }).catch((ex)=>{
      // if (__DEV__) {
        console.error('首页类别模块获取数据报错, ', ex.message)
      // }
    })
  }

  loadFirstPageData() {
    // const cityName = this.props.cityName
    const shoplistData = getShoplistData()
    this.resultHandle(shoplistData)
  }

  // 加载跟更多数据
  loadMoreData() {
    // const cityName = this.props.cityName
    const page = this.state.page + 1
    this.setState({
      isLoadingMore: true
    })

    const shoplistData = getShoplistData('北京', page)
    const handleResult = this.resultHandle(shoplistData)
    handleResult.then(r=>{
      if(r) {
        this.setState({
          page: page,
          isLoadingMore: false
        })
      }
    })
  }

  resultHandle(result) {
    return result.then(res=>{
      return res.json()
    }).then(json=>{
      let data = json.data
      if(data && data.length>0) {
        this.setState({
          shoplistData: this.state.shoplistData.concat(data),
          hasMore: json.hasMore,
        })
      }
      return true
    }).catch((ex)=>{
      // if (__DEV__) {
        console.error('首页推荐商家模块获取数据报错, ', ex.message)
      // }
      return false
    })
  }

  changeShouldLoadState() {
    this.setState({
      shouldLoad: !this.state.shouldLoad
    })
  }

  // 显示选择切换地址页面
  showSelectCityPage() {
    this.setState({
      showSelectCity: !this.state.showSelectCity
    })
  }
}

export default Home