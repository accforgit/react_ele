import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import ShopActivities from '../ShopActivities'
import ZoomImg from 'commonComponent/ZoomImg'

import './style.less'

class ShopTabCard extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this._createShopImg = this._createShopImg.bind(this)
    this.shouldZoomImg = this.shouldZoomImg.bind(this)

    this.state = {
      // 10000 只是一个标记数，表示当前没有图片需要被放大
      zoomImgIndex: 10000
    }
  }
  render() {
    let props = this.props
    let state = this.state
    let {promotion, shopImgs, shopInfo} = props.shopTabCardInfo

    let zoomImgItem = shopImgs[state.zoomImgIndex]
    let zoomImgParams = {
      shouldZoom: state.zoomImgIndex !== 10000,
      imgs: zoomImgItem ? zoomImgItem.imgs : null,
      textDesc: zoomImgItem ? zoomImgItem.name : null,
      imgClickFn: this.shouldZoomImg
    }

    return (
      <div className="shop-tab-card">
        <section className="description-box">
          <h3 className="desc-title">活动与服务</h3>
          <ShopActivities activities={promotion}/>
        </section>
        <section className="description-box">
          <h3 className="desc-title">商家实景</h3>
          <ul className="shop-desc-box">
            {
              shopImgs.map(this._createShopImg)
            }
          </ul>
        </section>
        <section className="description-box">
          <h3 className="desc-title">商家信息</h3>
          <ul className="shop-desc-box">
            <li className="shop-desc">
              {shopInfo.desc}
            </li>
            <li className="shop-info">
              <span className="shop-info-tag">商家电话</span>
              <span className="shop-info-value">{shopInfo.phone}</span>
            </li>
            <li className="shop-info">
              <span className="shop-info-tag">地址</span>
              <span className="shop-info-value">{shopInfo.address}</span>
            </li>
            <li className="shop-info">
              <span className="shop-info-tag">营业时间</span>
              <span className="shop-info-value">{shopInfo.shopHours}</span>
            </li>
          </ul>
        </section>
        <section className="description-box shop-licence">
          <h3 className="desc-title">营业执照</h3>
          <svg className="right-icon">
            <use xlinkHref="#arrow-right"></use>
          </svg>
        </section>
        <ZoomImg {...zoomImgParams}/>
      </div>
    )
  }

  shouldZoomImg(index=10000) {
    this.setState({
      zoomImgIndex: index
    })
  }

  _createShopImg(item, index) {
    return (
      <li className="shop-desc-item" key={index}>
        <div className="img-wrapper" onClick={this.shouldZoomImg.bind(this, index)}>
          <img className="shop-img" src={item.imgs[0]} alt={item.name} className="shop-img"/>
        </div>
        <span className="img-name">{item.name}({item.imgs.length}张)</span>
      </li>
    )
  }
}

export default ShopTabCard