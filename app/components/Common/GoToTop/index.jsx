import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import 'style/Common/GoToTop/style.less'
import { getScrollTop } from 'util'

class GoToTop extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this.goToTop = this.goToTop.bind(this)
  }

  render() {
    return (
      <a 
        href="javascript:;"
        ref="goToTop"
        id="goToTopBox"
        className={this.props.showGototop ? 'linear-show' : 'linear-hide'}
        onClick={this.goToTop}>
        <svg className="goToTopIcon">
          <use xlinkHref="#back-top"></use>
        </svg>
      </a>
    )
  }

  goToTop() {
    let currentY = getScrollTop()
    // rate
    if(currentY < 1) {
      window.scrollTo(0, 0)
      return
    }
    currentY = currentY - currentY/3
    window.scrollTo(0, currentY)
    requestAnimationFrame(()=> {
      this.goToTop()
    })
  }
}

export default GoToTop