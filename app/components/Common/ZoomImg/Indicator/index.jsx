import React from 'react'
import PropTypes from 'prop-types'

import './style.less'

function Dot (props) {
  return (
    <span className="indicator-dot" style={{opacity: props.selected ? '1' : '0.3'}} />
  )
}
function Number (props) {
  return (
    <p className="indicator-number">
      <span className="indicatorCurrent">{props.currentIndex+1}</span>&#x2f;
      <span className="indicatorTotal">{props.total}</span>
    </p>
  )
}

export default function IndicatorDots (props) {
  if (props.total < 2) {
    // Hide dots when there is only one dot.
    return <div className="indicator-wrapper"/>
  } else {
    return (
      <div className="indicator-wrapper">
        {
          props.type === 1 ?
          <Number currentIndex={props.index} total={props.total}/> :
          Array.apply(null, Array(props.total)).map((x, i) => {
            return <Dot key={i} selected={props.index === i} />
          })
        }
      </div>
    )
  }
}

IndicatorDots.propTypes = {
  // 指示器的样式：1 数字，2 小圆点
  type: PropTypes.number,
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
}

IndicatorDots.defaultProps = {
  type: 1
}