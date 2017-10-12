/**
 * 源自https://github.com/amio/re-carousel，有自定义改动
 */

import React from 'react'
import PropTypes from 'prop-types'

import './style.less'

class Carousel extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      frames: [].concat(props.frames || props.children || []),
      current: 0,
      move: false,
      winW: null,
      winH: null
    }

    this.mounted = false
    this.suitPrefix = ''
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.autoSlide = this.autoSlide.bind(this)
    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)

    if (props.loop === false && props.auto) {
      console.warn('[re-carousel] Auto-slide only works in loop mode.')
    }
  }

  componentWillMount() {
    this.state.winW = document.body.clientWidth
    this.state.winH = document.body.clientHeight
    this.suitPrefix = getsuitablePrefix('transform')
  }

  componentDidMount () {
    this.mounted = true
    this.prepareAutoSlide()

    // Hide all frames
    for (let i = 1; i < this.state.frames.length; i++) {
      this.refs['f' + i].style.opacity = 0
    }
  }

  componentWillUnmount () {
    this.mounted = false
    this.clearAutoTimeout()
  }

  onTouchStart (e) {
    if (this.state.frames.length < 2) return
    if (!this.refs.wrapper) return

    this.clearAutoTimeout()
    this.updateFrameSize()
    this.prepareSiblingFrames()

    const { pageX, pageY } = (e.touches && e.touches[0]) || e
    this.setState({
      startX: pageX,
      startY: pageY,
      deltaX: 0,
      deltaY: 0
    })

    this.refs.wrapper.addEventListener('touchmove', this.onTouchMove, {passive: true})
    this.refs.wrapper.addEventListener('mousemove', this.onTouchMove, {passive: true})
    this.refs.wrapper.addEventListener('touchend', this.onTouchEnd, true)
    this.refs.wrapper.addEventListener('mouseup', this.onTouchEnd, true)
  }

  onTouchMove (e) {
    if (e.touches && e.touches.length > 1) return

    let state = this.state

    state.move = true
    this.clearAutoTimeout()
    
    const { pageX, pageY } = (e.touches && e.touches[0]) || e
    let deltaX = pageX - state.startX
    let deltaY = pageY - state.startY

    if(Math.abs(deltaX) > state.winW || Math.abs(deltaY) > state.winH) return
    
    this.setState({
      deltaX: deltaX,
      deltaY: deltaY
    })

    // when reach frames edge in non-loop mode, reduce drag effect.
    if (!this.props.loop) {
      if (state.current === state.frames.length - 1) {
        deltaX < 0 && (deltaX /= 3)
        deltaY < 0 && (deltaY /= 3)
      }
      if (state.current === 0) {
        deltaX > 0 && (deltaX /= 3)
        deltaY > 0 && (deltaY /= 3)
      }
    }

    this.moveFramesBy(deltaX, deltaY)
  }

  onTouchEnd () {
    if (!this.state.move) return
    
    this.state.move = false
    const direction = this.decideEndPosition()
    direction && this.transitFramesTowards(direction)

    // cleanup
    this.refs.wrapper.removeEventListener('touchmove', this.onTouchMove)
    this.refs.wrapper.removeEventListener('mousemove', this.onTouchMove)
    this.refs.wrapper.removeEventListener('touchend', this.onTouchEnd, true)
    this.refs.wrapper.removeEventListener('mouseup', this.onTouchEnd, true)

    setTimeout(() => this.prepareAutoSlide(), this.props.duration)
  }

  decideEndPosition () {
    const { deltaX = 0, deltaY = 0, current, frames } = this.state
    const { axis, loop, minMove } = this.props

    switch (axis) {
      case 'x':
        if (loop === false) {
          if (current === 0 && deltaX > 0) return 'origin'
          if (current === frames.length - 1 && deltaX < 0) return 'origin'
        }
        if (Math.abs(deltaX) < minMove) return 'origin'
        return deltaX > 0 ? 'right' : 'left'
      case 'y':
        if (loop === false) {
          if (current === 0 && deltaY > 0) return 'origin'
          if (current === frames.length - 1 && deltaY < 0) return 'origin'
        }
        if (Math.abs(deltaY) < minMove) return 'origin'
        return deltaY > 0 ? 'down' : 'up'
      default:
    }
  }

  moveFramesBy (deltaX, deltaY) {
    const { prev, current, next } = this.state.movingFrames
    const { frameWidth, frameHeight } = this.state
    let suitPrefix = this.suitPrefix

    switch (this.props.axis) {
      case 'x':
        translateXY(current, deltaX, 0, 0, suitPrefix)
        if (deltaX < 0) {
          translateXY(next, deltaX + frameWidth, 0, 0, suitPrefix)
        } else {
          translateXY(prev, deltaX - frameWidth, 0, 0, suitPrefix)
        }
        break
      case 'y':
        translateXY(current, 0, deltaY, 0, suitPrefix)
        if (deltaY < 0) {
          translateXY(next, 0, deltaY + frameHeight, 0, suitPrefix)
        } else {
          translateXY(prev, 0, deltaY - frameHeight, 0, suitPrefix)
        }
        break
      default:
    }
  }

  prepareAutoSlide () {
    if (this.state.frames.length < 2) return

    this.clearAutoTimeout()
    this.updateFrameSize(() => {
      this.prepareSiblingFrames()
    })

    // auto slide only avalible in loop mode
    if (this.mounted && this.props.loop && this.props.auto) {
      const slideTimeoutID = setTimeout(this.autoSlide, this.props.interval)
      this.setState({ slider: slideTimeoutID })
    }
  }

  // auto slide to 'next' or 'prev'
  autoSlide (rel) {
    this.clearAutoTimeout()

    switch (rel) {
      case 'prev':
        this.transitFramesTowards(this.props.axis === 'x' ? 'right' : 'down')
        break
      case 'next':
      default:
        this.transitFramesTowards(this.props.axis === 'x' ? 'left' : 'up')
    }

    // prepare next move after animation
    setTimeout(() => this.prepareAutoSlide(), this.props.duration)
  }

  next () {
    const { current, frames } = this.state
    if (!this.props.loop && current === frames.length - 1) return false
    this.autoSlide('next')
  }

  prev () {
    if (!this.props.loop && this.state.current === 0) return false
    this.autoSlide('prev')
  }

  clearAutoTimeout () {
    clearTimeout(this.state.slider)
  }

  updateFrameSize (cb) {
    if(!this.refs.wrapper) {
      return
    }
    const { width, height } = window.getComputedStyle(this.refs.wrapper)
    this.setState({
      frameWidth: parseFloat(width.split('px')[0]),
      frameHeight: parseFloat(height.split('px')[0])
    }, cb)
  }

  prepareSiblingFrames () {
    let state = this.state
    const refs = this.refs
    let suitPrefix = this.suitPrefix

    const siblings = {
      current: refs['f' + this.getFrameId()],
      prev: refs['f' + this.getFrameId('prev')],
      next: refs['f' + this.getFrameId('next')]
    }

    if (!this.props.loop) {
      state.current === 0 && (siblings.prev = undefined)
      state.current === state.frames.length - 1 && (siblings.next = undefined)
    }

    this.setState({ movingFrames: siblings })

    // prepare frames position
    translateXY(siblings.current, 0, 0, 0, suitPrefix)
    if (this.props.axis === 'x') {
      translateXY(siblings.prev, -state.frameWidth, 0, 0, suitPrefix)
      translateXY(siblings.next, state.frameWidth, 0, 0, suitPrefix)
    } else {
      translateXY(siblings.prev, 0, -state.frameHeight, 0, suitPrefix)
      translateXY(siblings.next, 0, state.frameHeight, 0, suitPrefix)
    }

    return siblings
  }

  getFrameId (pos) {
    const { frames, current } = this.state
    const total = frames.length
    switch (pos) {
      case 'prev':
        return (current - 1 + total) % total
      case 'next':
        return (current + 1) % total
      default:
        return current
    }
  }

  transitFramesTowards (direction) {
    let state = this.state
    let suitPrefix = this.suitPrefix

    const { prev, current, next } = state.movingFrames
    const { duration, axis } = this.props

    let newCurrentId = state.current
    switch (direction) {
      case 'up':
        translateXY(current, 0, -state.frameHeight, duration, suitPrefix)
        translateXY(next, 0, 0, duration)
        newCurrentId = this.getFrameId('next')
        break
      case 'down':
        translateXY(current, 0, state.frameHeight, duration, suitPrefix)
        translateXY(prev, 0, 0, duration)
        newCurrentId = this.getFrameId('prev')
        break
      case 'left':
        translateXY(current, -state.frameWidth, 0, duration, suitPrefix)
        translateXY(next, 0, 0, duration)
        newCurrentId = this.getFrameId('next')
        break
      case 'right':
        translateXY(current, state.frameWidth, 0, duration, suitPrefix)
        translateXY(prev, 0, 0, duration)
        newCurrentId = this.getFrameId('prev')
        break
      default: // back to origin
        translateXY(current, 0, 0, duration)
        if (axis === 'x') {
          translateXY(prev, -state.frameWidth, '-50%', duration, suitPrefix)
          translateXY(next, state.frameWidth, '-50%', duration, suitPrefix)
        } else if (axis === 'y') {
          translateXY(prev, '-50%', -state.frameHeight, duration, suitPrefix)
          translateXY(next, '-50%', state.frameHeight, duration, suitPrefix)
        }
    }

    this.setState({ current: newCurrentId })
  }

  render () {
    const { frames, current } = this.state
    const props = this.props
    const { widgets, axis, loop, auto, interval } = props

    return (
      <div
        ref='wrapper'
        className="slider-wrapper"
        style={props.style}
        onTouchStart={this.onTouchStart}
        onMouseDown={this.onTouchStart} >
        {
          frames.map((frame, i) => {
            return <div className="slider-item-box" ref={'f' + i} key={i}>{frame}</div>
          })
        }
        {
          widgets && [].concat(widgets).map((Widget, i) => (
            <Widget
              key={i}
              index={current}
              total={frames.length}
              prevHandler={this.prev}
              nextHandler={this.next}
              axis={axis} loop={loop} auto={auto} interval={interval} />
          ))
        }
        { props.frames && props.children }
      </div>
    )
  }
}

Carousel.propTypes = {
  axis: PropTypes.oneOf(['x', 'y']),
  auto: PropTypes.bool,
  loop: PropTypes.bool,
  interval: PropTypes.number,
  duration: PropTypes.number,
  widgets: PropTypes.arrayOf(PropTypes.func),
  frames: PropTypes.arrayOf(PropTypes.element),
  style: PropTypes.object,
  minMove: PropTypes.number
}

Carousel.defaultProps = {
  axis: 'x',
  auto: false,
  loop: false,
  interval: 5000,
  duration: 300,
  minMove: 42
}

function translateXY (el, x, y, duration = 0, prefix='') {
  if (!el) return

  el.style.opacity = '1'
  
  if(prefix) {
    el.style[`${prefix.slice(1, -1)}TransitionDuration`] = duration + 'ms'
    el.style[`${prefix.slice(1, -1)}Transform`] = `${prefix}translate(${x}px, ${y}px) ${prefix}translateZ(0)`
  } else {
    el.style.transitionDuration = duration + 'ms'
    el.style.transform = `translate(${x}px, ${y}px)`
  }
}

// 获取兼容可用的 样式属性名前缀
function getsuitablePrefix(name) {
  let allPrefix = ['', '-webkit-', '-moz-', '-ms-', '-o-']
  let len = allPrefix.length
  let allStyle = document.body.style

  for (let i = 0; i < len; i++) {
    if (allPrefix[i] + name in allStyle) {
      return allPrefix[i]
    }
  }
  return null
}


export default Carousel