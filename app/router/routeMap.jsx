import React from 'react'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'

import App from '../components'
import Home from '../components/Home'
import Discover from '../components/Discover'
import Order from '../components/Order'
import User from '../components/User'

if (typeof require.ensure !== 'function') {
  require.ensure = (dependencies, callback)=> {
    callback(require)
  }
}

const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;

const Search = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../components/Common/Search').default)
  }, 'Search')
}
const SearchResult = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../components/SearchResult').default)
  }, 'SearchResult')
}

const ShopDetail = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../components/ShopDetail').default)
  }, 'ShopDetail')
}
const NotFound = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../components/404'))
  }, '404')
}

const RouterMap = (
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home}/> 
      <Route path='/Home' component={Home}/>
      <Route path='/Discover' component={Discover}/>
      <Route path='/Order' component={Order}/>
      <Route path='/User' component={User}/>
      <Route path='/Search' getComponent={Search}/>
      <Route path='/SearchResult/:key' getComponent={SearchResult}/>
      <Route path='/ShopDetail/:shopId' getComponent={ShopDetail}/>
      <Route path='*' getComponent={NotFound}/>
    </Route>
  </Router>
)

export default RouterMap