import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import HocRedux from 'util/HocRedux'
import SvgIcon from 'commonComponent/SvgIcon'
import filterAverage from '@img/svg/filter-sort.svg'
import filterHot from '@img/svg/filter-hot.svg'
import filterMoney from '@img/svg/filter-money.svg'
import filterClock from '@img/svg/filter-clock.svg'
import filterSortSelect from '@img/svg/filter-sort-select.svg'

import './style.less'

class SortDOM extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this._createSortItem = this._createSortItem.bind(this)
    this.setSortCondition = this.setSortCondition.bind(this)

    this.sortCondition = props.data
    this.sortSvgIcon = [filterAverage, filterHot, filterMoney, filterClock]
    this.sortSvgIconName = ['filter-average', 'filter-hot', 'filter-money', 'filter-clock']

    this.state = {
      currentIndex: 1000
    }
  }

  componentWillMount() {
    this.state.currentIndex = this.props.reduxState.filterSearch.sortIndex
  }

  render() {
    return (
      <ul className="dropdown-detail sort-wrapper">
        { this.sortCondition.map(this._createSortItem) }
      </ul>
    )
  }

  _createSortItem(item, index) {
    let isCurrent = this.state.currentIndex === index
    let active = isCurrent ? ' active' : ''
    return (
      <li className={`sort-item${active}`} key={index} onClick={this.setSortCondition.bind(this, index)}>
        <SvgIcon
          containerType="span"
          path={this.sortSvgIcon[index]}
          containerClassName="sort-icon-wrapper"
          className={`sort-icon ${this.sortSvgIconName[index]}`}/>
        <span className="sort-tag">{item.name}</span>
        {
          isCurrent &&
          <SvgIcon
            containerType="span"
            path={filterSortSelect}
            containerClassName="sort-select-icon-wrapper"
            className='sort-select-icon'/>
        }
      </li>
    )
  }

  setSortCondition(currentIndex) {
    this.props.reduxActions.sortCondition(currentIndex)
    this.setState({
      currentIndex
    })
  }
}

export default HocRedux(SortDOM)