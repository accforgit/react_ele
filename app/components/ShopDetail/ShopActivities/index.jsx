import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class ShopActivities extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    let activities = this.props.activities
    return (
      <ul className="activity-list">
        {
          activities.map(this._createActivities)
        }
      </ul>
    )
  }
  _createActivities(item, index) {
    return (
      <li className="activity-item" key={index}>
        <span className={"activity-icon activity-type-" + item.type.id}>{item.type.name}</span>
        <p className="activity-desc">{item.detail}</p>
      </li>
    )
  }
}

export default ShopActivities