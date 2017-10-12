/**
 * 源自 https://github.com/atomic-app/react-svg，有自定义改动
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOMServer from 'react-dom/server'

const isBrowser = typeof window !== 'undefined'
const SVGInjector = isBrowser ? require('svg-injector') : undefined

export default class SvgIcon extends Component {

  static defaultProps = {
    callback: () => {},
    each: () => {},
    className: '',
    evalScripts: 'once',
    style: {},
    containerType: 'div',
    containerClassName: 'svg-container'
  }

  static propTypes = {
    // 每一个 svg加载完毕后的回调
    each: PropTypes.func,
    // 所有的 svg加载完毕后的回调
    callback: PropTypes.func,
    // svg class
    className: PropTypes.string,
    // 如果 svg内存在脚本，是否执行：总是执行、只执行一次、从不执行
    evalScripts: PropTypes.oneOf([ 'always', 'once', 'never' ]),
    // svg 路径
    path: PropTypes.string.isRequired,
    // svg样式
    style: PropTypes.object,
    // svg 元素外部包裹元素的类型
    containerType: PropTypes.string,
    // svg 元素外部包裹元素的 class
    containerClassName: PropTypes.string
  }

  refCallback = (container) => {
    if (!container) {
      this.removeSVG()
      return
    }

    this.container = container
    this.renderSVG()
  }

  renderSVG(props = this.props) {
    let container = this.container
    const {
      // each,
      className,
      evalScripts,
      path,
      style,
      callback
    } = props
    
    let each = this.lessDOM.bind(this, props.each)

    const div = document.createElement('div')
    div.innerHTML = ReactDOMServer.renderToStaticMarkup(
      <div>
        <div
          className={className}
          data-src={path}
          style={style}/>
      </div>
    )

    const wrapper = container.appendChild(div.firstChild)

    SVGInjector(wrapper.firstChild, {
      evalScripts,
      each
    }, callback)
  }

  lessDOM(each) {
    // 让最终返回的 DOM元素中 SVG元素只被包裹一层父元素
    let container = this.container
    let containerChild = container.firstChild
    if(containerChild && containerChild.firstChild && containerChild.nodeName.toLowerCase() === 'div') {
      container.replaceChild(containerChild.firstChild, containerChild)
      // let realNode = document.createDocumentFragment()
      // realNode.appendChild(container.firstChild.firstChild)
      // container.replaceChild(realNode, container.firstChild)
    }
    each()
  }

  removeSVG() {
    this.container.removeChild(this.container.firstChild)
  }

  componentWillReceiveProps(nextProps) {
    this.removeSVG()
    this.renderSVG(nextProps)
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    let { containerType, containerClassName } = this.props
    console.log('containerClassName:', containerClassName);
    return React.createElement(containerType, {
      className: containerClassName,
      ref: this.refCallback
    })
  }
}