import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class CommonHead extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    return (
      <header id="common-header-box">
        <div id="common-head">
          <div className="back-left" onClick={this.historyBack}>
            <svg className="head-arrow-left">
              <use xlinkHref="#arrow-left"></use>
            </svg>
          </div>
          <h1 className="head-title">
            {this.props.title}
          </h1>
          {
            this.props.rightEle || <span></span>
          }
        </div>
      </header>
    )
  }

  historyBack() {
    history.back()
  }
}

export default CommonHead