import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import HocRedux from 'util/HocRedux'

class FilterDOM extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this.setClass = this.setClass.bind(this)

    this.state = {
      distribution: 1000,
      avarage: 1000,
      activities: 1000,
      shopAttr: {}
    }
  }

  componentWillMount() {
    this.state = Object.assign(this.state, this.props.reduxActions.filterCondition)
  }

  render() {
    let data = this.props.data
    let state = this.state
    return (
      <div className="dropdown-detail filter-wrapper">
        <dl className="distribution">
          <dt className="filter-title">配送方式</dt>
          <dd className="filter-desc">
            {
              data.distribution.map((item, index)=> {
                return <a href="javascript:;" key={`distribution-${index}`} className={this.setClass(index, state.distribution)} onClick={this.selectFilter.bind(this, index, 'distribution')}>{item.name}</a>
              })
            }
          </dd>
        </dl>
        <dl className="avarage-consume">
          <dt className="filter-title">人均消费</dt>
          <dd className="filter-desc">
            {
              data.average.map((item, index)=> {
                return (<a href="javascript:;" key={`avarage-${index}`} className={this.setClass(index, state.avarage)} onClick={this.selectFilter.bind(this, index, 'average')}>
                  {
                    index === 0 ? `￥${item}以下` : (
                      index === data.average-1 ? `￥${item}以上` : `￥${item}`
                    )
                  }
                </a>)
              })
            }
          </dd>
        </dl>
        <dl className="discount-activity">
          <dt className="filter-title">优惠活动</dt>
          <dd className="filter-desc">
            {
              data.activities.map((item, index)=> {
                return (
                  <a href="javascript:;" key={`discount-${index}`} className={this.setClass(index, state.activities)} onClick={this.selectFilter.bind(this, index, 'activities')}>
                    <i className="discount-tag">{item.tag}</i>
                    <span className="discount-desc">{item.name}</span>
                  </a>
                )
              })
            }
          </dd>
        </dl>
        <dl className="shop-attr">
          <dt className="filter-title">商家属性（可多选）</dt>
          <dd className="filter-desc">
            {
              data.goodsAttributes.map((item, index)=> {
                return (
                  <a href="javascript:;" key={`shopAttr-${index}`} className={this.setClass(index, state.shopAttr[index])} onClick={this.selectFilter.bind(this, index, 'shopAttr')}>
                    <i className="shop-tag">{item.tag}</i>
                    <span className="shop-desc">{item.name}</span>
                  </a>
                )
              })
            }
          </dd>
        </dl>
        <section className="filter-confirm">
          <a href="javascript:;" className="clear-filter">清空</a>
          <a href="javascript:;" className="confirm-filter">确认</a>
        </section>
      </div>
    )
  }

  selectFilter(index, type) {
    let stateAttr, state = this.state
    console.log('state:', state[type], index, type)

    if(type !== 'shopAttr') {
      stateAttr = index === state[type] ? 1000 : index
    } else {
      stateAttr = Object.assign({}, state[type])
      stateAttr = index === state[type][index] ? 1000 : index
    }
    this.setState({
      [type]: stateAttr
    })
  }

  setClass(index, currentIndex) {
    console.log(index, currentIndex);
    return index === currentIndex ? 'active filter-select' : 'filter-select'
  }
}

export default HocRedux(FilterDOM)