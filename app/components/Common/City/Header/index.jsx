import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { hashHistory} from 'react-router'

import './style.less'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      <div id="common-header" style={{position: this.props.showSelectCity ? 'fixed' : 'absolute'}}>
        <div className="title">
          <svg className="arrow-left" onClick={this.backHome.bind(this)}>
            <use xlinkHref="#arrow-left"></use>
          </svg>
          <h1>{this.props.title}</h1>
        </div>
        <input ref={(input) => { this.textInput = input }} className="city-input" type="search" placeholder="请输入地址"/>
      </div>
    )
  }

  clickHandle() {
    const backRouter = this.props.backRouter
    if(backRouter) {
      hashHistory.push(backRouter)
    } else {
      window.history.back()
    }
  }

  backHome() {
    this.props.backHome()
  }
}

export default Header