import React from 'react'

import Parabola from 'util/parabola'

import './style.less'

class Ball extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    let props = this.props
    let options = {
      curvature: props.curvature,
      speed: props.speed,
      complete: props.changeFlyBallCount.bind(this, props.id)
    }
    this.parabola = new Parabola(this.container, props.target, options)
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

    this._createFlyBall = this._createFlyBall.bind(this)

    this.state = {
      balls: props.balls
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      balls: newProps.balls
    })
  }

  render() {
    let balls = this.state.balls
    return (
      <div className="ballWrapper">
        {
          balls.map(this._createFlyBall)
        }
      </div>
    )
  }

  _createFlyBall(item, index) {
    let props = this.props
    if(item.show) {
      return (
        <Ball
          {...item.position}
          target={props.target}
          key={index}
          id={index}
          curvature={props.curvature}
          speed={props.speed}
          changeFlyBallCount={props.changeFlyBallCount}/>
      )
    }
  }
}

FlyBall.defaultProps = {
  curvature: 0.004,
  speed: 120
}

export default FlyBall