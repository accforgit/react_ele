import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import {AnimateEle} from 'util'

import ClassifiedDOM from './ClassifiedDOM'
import SortDOM from './SortDOM'
import FilterDOM from './FilterDOM'
import SvgIcon from 'commonComponent/SvgIcon'
import arrowDown from '@img/svg/arrow-down.svg'

import './style.less'

class SelectDropDown extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this.dropDownIcon = this.dropDownIcon.bind(this)
    this._createFilterTab = this._createFilterTab.bind(this)

    this.filterItem = ['分类', '排序', '筛选']

    this.state = {
      // 100 代表默认筛选条件
      filterItemIndex: 100
    }
  }

  render() {
    let state = this.state
    let filterConditionsData = this.props.data

    return (
      <div className="drop-down-wrapper">
        <div className="drop-bg"></div>
        <section className="drop-down-box">
          <div className="filter-tab">
            {
              this.filterItem.map(this._createFilterTab)
            }
          </div>
          <ReactCSSTransitionGroup
            component={AnimateEle}
            transitionName="toggle"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}>
            { this.showDropContent(filterConditionsData) }
          </ReactCSSTransitionGroup>
        </section>
      </div>
    )
  }

  _createFilterTab(item, index) {
    let active = this.state.filterItemIndex === index ? " active" : ''
    return (
      <p className={`tab-item${active}`} onClick={this.changeFilterItemIndex.bind(this, index)} key={index}>
        <span className={"item_"+index}>{item}</span>
        <span className={`drop-icon-box${active}`}>
          { this.dropDownIcon(this.state.filterItemIndex, index) }
        </span>
      </p>
    )
  }

  dropDownIcon(filterItemIndex, currentIndex) {
    return (
      <SvgIcon
        containerType="i"
        path={arrowDown}
        containerClassName="drop-icon-wrapper"
        className='drop-icon'/>
    )
  }

  changeFilterItemIndex(index) {
    index === this.state.filterItemIndex && (index=10)
    this.setState({
      filterItemIndex: index
    })
  }

  showDropContent(filterConditionsData) {
    let filterItemIndex = this.state.filterItemIndex
    if(filterItemIndex === 0) {
      return <ClassifiedDOM data={filterConditionsData.classified}/>
    } else if(filterItemIndex === 1) {
      return <SortDOM data={filterConditionsData.sort}/>
    } else if(filterItemIndex === 2) {
      return <FilterDOM data={filterConditionsData.filter}/>
    }
  }
}

export default SelectDropDown