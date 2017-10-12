import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Star from 'commonComponent/Star'
import '../style.less'

class RatingBox extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    let scoreList = this.props.scoreList
    return (
      <section className="rating-box">
        <div className="rating-left">
          <p className="score">{scoreList.averageScore}</p>
          <p className="judge-big">综合评价</p>
          <div className="judge-small lt11">高于周边商家{scoreList.contrast}%</div>
        </div>
        <div className="rating-right">
          <div className="tags-text">
            <span className="tag mr">服务态度</span>
            <Star starPercent={scoreList.serviceScore/5}/>
            <span className="score-num ml">{scoreList.serviceScore}</span>
          </div>
          <div className="tags-text">
            <span className="tag mr">菜品评价</span>
            <Star starPercent={scoreList.foodScore/5}/>
            <span className="score-num ml">{scoreList.foodScore}</span>
          </div>
          <div className="tags-text">
            <span className="tag">送达时间</span>
            <span className="time ml lt11 originleft ">{scoreList.foodTime}分钟</span>
          </div>
        </div>
      </section>
    )
  }
  
  _createStar(item, index) {
    return (
      <svg key={index} className="score-star">
        <use xlinkHref="#score-star"></use>
      </svg>
    )
  }
}

export default RatingBox