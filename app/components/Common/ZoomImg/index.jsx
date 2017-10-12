import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Carousel from '../Carousel'
import IndicatorDots from './Indicator'

import {AnimateEle} from 'util'

import './style.less'

class ZoomImg extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this._createShopZoomImg = this._createShopZoomImg.bind(this)
  }
  render() {
    let props = this.props
    let { shouldZoom, imgs, textDesc } = props
    return (
      <ReactCSSTransitionGroup
        component={AnimateEle}
        transitionName="fade"
        transitionEnterTimeout={150}
        transitionLeaveTimeout={150}>
        {
          shouldZoom &&
          <div className="zoomImgWrapper">
            {
              textDesc &&
              <p className="zoomType">{textDesc}</p>
            }
            <Carousel
              widgets={[IndicatorDots]}
              loop>
              {
                imgs.map(this._createShopZoomImg)
              }
            </Carousel>
          </div>
        }
      </ReactCSSTransitionGroup>
    )
  }

  _createShopZoomImg(item, index) {
    return (
      <img key={index} className="zoomImg" onClick={()=> {this.props.imgClickFn()}} src={item} alt="img"/>
    )
  }
}

export default ZoomImg