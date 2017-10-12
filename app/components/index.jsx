import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

// import LocalStorage from 'util/localStore.js'
// import { localStorageKey } from '@config/index'
import { initRem } from 'util'
import { addressInfoInit } from 'util/siteInit'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as commonInfoActionsFromOtherFile from '../actions/commoninfo.js'

import TabBar from './TabBar'
import SvgDOM from 'commonComponent/SvgDOM'
import LoadingPage from 'commonComponent/LoadingPage'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this.state = {
      showTab: false,
      initDone: true
    }
  }

  componentWillReceiveProps(newProps) {
    this.shouldShowTab()
  }
  componentWillMount() {
    initRem()
    this.initStorage()
    this.shouldShowTab()
  }
  componentWillUpdate() {
    // this.shouldShowTab()
    // 不能在这里修改 state
  }
  
  render() {
    return (
      <div>
        <SvgDOM/>
        {
          this.state.initDone ?
          this.props.children :
          <LoadingPage/>
        }
        {
          this.state.showTab && <TabBar/>
        }
      </div>
    )
  }

  componentDidMount() {
  }

  shouldShowTab() {
    // 是否显示底部 tab切换栏
    // let showTabPage = ['/', '/Home', '/Discover', '/Order', '/User']
    let showTabPage = ['#/?', '#/Home?', '#/Discover?', '#/Order?', '#/User?']
    let len = showTabPage.length
    let hash = window.location.hash

    this.state.showTab = showTabPage.some((item)=>{
      return hash.indexOf(item) === 0
    })
  }

  initStorage() {
    // 网站所需的 localStorage初始化
    let addressInfo = addressInfoInit()
    addressInfo.then(res=>{
      // 将城市信息存储到 Redux中，方便全局调用
      const actions = this.props.commonInfoActions
      actions.updateAddressInfo(res)
      console.log('address 666:', this.props)
      this.setState({
        initDone: true
      })
    })
  }
}

let mapStateToProps = (state)=>{
  return {
    reduxState: state
  }
}
let mapDispatchToProps = (dispatch)=>{
  return {
    commonInfoActions: bindActionCreators(commonInfoActionsFromOtherFile, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)