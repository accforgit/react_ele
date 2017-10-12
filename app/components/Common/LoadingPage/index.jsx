import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class LoadingPage extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this.animationStart = this.animationStart.bind(this)

    this.state = {
      iconIndex: 0,
      iconBgp: [0, 34, 67, 100]
    }
  }
  render() {
    let { iconIndex, iconBgp } = this.state
    return (
      <div className="loading-page-wrapper">
        <div className="loading-page-bounce">
          <div className="loading-page-box" style={{backgroundPosition: `0 ${iconBgp[iconIndex]}%`}}></div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.animationStart()
  }

  animationStart() {
    let state = this.state
    let iconLen = state.iconBgp.length
    let iconBounceBox = document.querySelector('.loading-page-bounce')
    let iconIndex = 0
    iconBounceBox.addEventListener('animationiteration', ()=>{
      ++iconIndex
      iconIndex === iconLen && (iconIndex = 0)
      this.setState({
        iconIndex
      })
    })
  }
}

export default LoadingPage