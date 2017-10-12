import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Header from './Header'
import CityList from './CityList'

import './style.less'

class City extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this.state = {
      showSelectCity: false,
    }
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      showSelectCity: newProps.showSelectCity
    })
  }
  render() {
    let showSelectCity = this.state.showSelectCity
    let animationClass = showSelectCity ? 'rightToLeftInClass' : 'leftToRightOutClass'
    return (
      <div ref="transitionMask" id="select-city-box" className={animationClass}>
        <Header backHome={this.backHome.bind(this)} title='选择收货地址' showSelectCity={showSelectCity}/>
        <CityList showSelectCityPage={this.props.showSelectCityPage} showSelectCity={showSelectCity}/>
      </div>
    )
  }

  componentDidMount() {
    // 组件初始化的时候，不需要动画动作，所以直接将组件元素的动画类删去
    this.refs.transitionMask.className = 'init-transition-mask'
  }

  backHome() {
    this.props.showSelectCityPage()
  }
}

export default City
