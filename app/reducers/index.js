import { combineReducers } from 'redux'
import userInfo from './userinfo'
import cartCount from './cartCount'
import commonInfo from './commoninfo'
import filterSearch from './filterSearch'

export default combineReducers({
	commonInfo,
	userInfo,
	cartCount,
	filterSearch
})