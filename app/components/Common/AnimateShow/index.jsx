import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { AnimateEle } from 'util'

import './style.less'

class AnimateShow extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    let props = this.props
    let { shouldShow, childrenEle } = props
    return (
      <ReactCSSTransitionGroup
        component={AnimateEle}
        transitionName="fade"
        transitionEnterTimeout={150}
        transitionLeaveTimeout={150}>
        {
          shouldShow &&
          <div className="animate-show-wrapper">
            { childrenEle }
          </div>
        }
      </ReactCSSTransitionGroup>
    )
  }
}

export default AnimateShow