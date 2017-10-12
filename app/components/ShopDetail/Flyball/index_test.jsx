// 抛物小球运动独立测试

import React from 'react'

import Parabola from 'util/parabola'

import './style.less'

class Ball extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    let props = this.props
    // console.log('componentDidMount')
    this.options = {
      curvature: 0.006,
      speed: 2,
      complete: props.changeFlyBallCount.bind(this, props.id)
    }
    this.parabola = new Parabola(this.container, document.querySelector('.box2'), this.options)
    this.parabola.run()
  }
  componentWillUnmount() {
    this.parabola.stop()
  }
  render() {
    let {x=0, y=0} = this.props
    return (
      <div
        className="flyBall"
        ref={c => this.container = c}
        style={{top: y, left: x}}></div>
    )
  }
}

class FlyBall extends React.Component {
  constructor(props) {
    super(props)

    this.changeFlyBallCount = this.changeFlyBallCount.bind(this)
    this._createFlyBall = this._createFlyBall.bind(this)

    this.state = {
      balls: [
        {show: false, position: {}},
        {show: false, position: {}},
        {show: false, position: {}}
      ],
      // 当小球不够用时，应该被从队列中回收的小球index
      hideBalls: 2
    }
  }

  componentWillReceiveProps(newProps) {
    // console.log('newProps:', newProps)
    if(newProps.source) {
      this.showFlyBall(newProps.source)
    }
  }

  render() {
    let balls = this.state.balls
    return (
      <div className="ballWrapper">
        {
          balls.map(this._createFlyBall)
        }
        <button onClick={this.showFlyBall.bind(this)}>Click</button>
        <div className="box2"></div>
        <div className="box3"></div>
      </div>
    )
  }
  componentDidMount() {
    let that = this
    // document.querySelector('#counter-box').addEventListener('click', (e)=> {
    //   console.log('eeeeeee:', e.target);
    //   this.showFlyBall.bind(that, e)()
    // })
    window.addEventListener('click', (e)=>{
      console.log('eeeeeee:', e);
      this.showFlyBall.bind(that, e)()
    })
  }
  
  showFlyBall(e) {
    // console.log('eee:', e.pageY, e.pageX, this.props.source);
    let balls = this.state.balls
    // 这里的 3，指的是小球的最大数量
    for(let i=3; i--;) {
      if(!balls[i].show) {
        balls[i].show = true
        balls[i].position = {
          x: e.pageX,
          y: e.pageY
        }
        this.setState({
          balls: balls
        })
        return
      }
    }
    // 如果小球用完了，则删除最先发出去的小球
    console.log('over', balls);
    let hideBalls = this.state.hideBalls
    balls[hideBalls].show = false
    hideBalls = hideBalls - 1
    if(hideBalls === -1) {
      hideBalls = 2
    }
    this.setState({
      balls: balls,
      hideBalls: hideBalls
    })
    this.showFlyBall(e)
  }

  changeFlyBallCount(id) {
    let balls = this.state.balls
    balls[id].show = false
    this.setState({
      balls: balls
    })
  }

  _createFlyBall(item, index) {
    if(item.show) {
      return (
        <Ball
          {...item.position}
          key={index}
          id={index}
          changeFlyBallCount={this.changeFlyBallCount}/>
      )
    }
  }
}

export default FlyBall