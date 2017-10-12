import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class Star extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this._createStar = this._createStar.bind(this)
  }
  render() {
    let star = []
    for(let i=0; i<this.props.starCount; i++) {
      star.push(i)
    }
    return (
      <div className="star-wrapper">
        <p className="star-gray">
          {
            star.map(this._createStar)
          }
        </p>
        <p className="star-real" style={{width: this.props.starPercent*100 + '%' || '100%'}}>
          {
            star.map(this._createStar)
          }
        </p>
    </div>
    )
  }

  _createStar(item, index) {
    let starSize = this.props.starSize
    return (
      <svg key={index} className="score-star" style={{width: starSize, height: starSize }}>
        <use xlinkHref="#score-star"></use>
      </svg>
    )
  }
}

Star.defaultProps = {
  // 星星的数量
  starCount: 5,
  // 每个星星的尺寸
  starSize: '.8rem',
  starPercent: 1
}

export default Star