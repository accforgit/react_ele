import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import CommonHead from '../Common/CommonHead'
import SelectDropDown from './SelectDropDown'
import { getDropDownData } from '@fetch/home/home.js'

import './style.less'

class SearchResult extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this.state = {
      headTitle: '',
      filterConditionsData: null
    }
  }

  componentWillMount() {
    this.setHeadTitle()
  }
  
  render() {
    let props = this.props
    let state = this.state
    return (
      <div className="search-result-wrapper">
        {
          state.headTitle &&
          <CommonHead title={state.headTitle}/>
        }
        {
          state.filterConditionsData &&
          <SelectDropDown data={state.filterConditionsData}/>
        }
      </div>
    )
  }

  componentDidMount() {
    const dropDownData = getDropDownData(this.props.params.shopId)
    this.resultHandle(dropDownData)
  }

  resultHandle(result) {
    result.then(res=>{
      return res.json()
    }).then(data=>{
      console.log('getDropDownData: ', data)
      if(data) {
        this.setState({
          filterConditionsData: data
        })
      }
    }).catch((ex)=>{
      console.log(ex);
      // if (__DEV__) {
      //   console.error('商家详情页获取数据报错, ', ex.message)
      // }
    })
  }

  setHeadTitle() {
    let categoryTitle = [
      '美食', '下午茶', '商超便利', '果蔬生鲜', '新店特惠', '大牌必吃', '川湘菜', '预订早餐',
      '医药健康', '汉堡薯条', '包子粥店', '地方菜系', '披萨意面', '麻辣烫'
    ]
    let len = categoryTitle.length
    let searchParams = this.props.params.key
    if(searchParams.indexOf('cate_') === -1) return
    let cateType = parseInt(searchParams.split('_')[1])

    for(let i=0; i<len; i++) {
      if(cateType === i) {
        this.setState({
          headTitle: categoryTitle[i]
        })
        break
      }
    }
  }
}

export default SearchResult