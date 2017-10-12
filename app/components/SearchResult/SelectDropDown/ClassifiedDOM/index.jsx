import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import HocRedux from 'util/HocRedux'

import './style.less'

class ClassifiedDOM extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this._createDrop = this._createDrop.bind(this)

    this.state = {
      currentIndex: 0
    }
  }

  componentWillMount() {
    this.state.currentIndex = this.props.reduxState.filterSearch.classifiedIndex
  }

  render() {
    console.log('filterConditionsData:', this.props, this.props.data)
    let state = this.state
    let data = this.props.data
    return (
      <div className="dropdown-detail classified-wrapper">
        <ul className="drop-left">
          { data.map(this._createDrop) }
        </ul>
        {
          state.currentIndex ?
          <ul className="drop-right">
            { data[state.currentIndex].children.map(this._createDrop) }
          </ul> : null
        }
      </div>
    )
  }

  _createDrop(item, index) {
    return (
      <li
        className="drop-item"
        key={`${item.title}-${index}`}
        onClick={item.type === 1 ? this.changeCurrentIndex.bind(this, index) : ()=>{}}>
        <span className="cate-title">{item.title}</span>
        <span className="cate-count">{item.count}</span>
      </li>
    )
  }

  changeCurrentIndex(currentIndex) {
    this.props.reduxActions.classifiedCondition(currentIndex)
    this.setState({
      currentIndex
    })
  }
}

export default HocRedux(ClassifiedDOM)