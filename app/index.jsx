import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { hashHistory, browserHistory } from 'react-router'

import configureStore from './store/configureStore'
import RouteMap from './router/routeMap'

import './static/css/base.less'
import './static/css/common.less'
import './static/css/font.css'

// 创建 Redux 的 store 对象
const store = configureStore()

render(
  <Provider store={store}>
    {RouteMap}
  </Provider>,
  document.getElementById('root')
)