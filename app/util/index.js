import React from 'react'

// 选择器
const selectEle = (selector, selectAll = false, parentEle = document)=> {
  return selectAll ?
          parentEle.querySelectorAll(selector) :
          parentEle.querySelector(selector)
}

const historyBack = ()=> {
  history.back()
}

// 用于生成缓动动画 的 React DOM
const AnimateEle = (props)=> {
  const childrenArray = React.Children.toArray(props.children)
  return childrenArray[0] || null
}

// 重置 rem
const initRem = (base = 31.25)=> {
  let docEle = document.documentElement

  let fn = ()=> {
    let width = docEle.clientWidth
    width && (docEle.style.fontSize = (width / base) + 'px')
  }
  window.addEventListener('resize', fn, true)
  // document.addEventListener('load', fn)
  fn()
}

// 获取元素高度
const getH = (ele)=> {
  return selectEle(ele).getBoundingClientRect().height
}

// 递归循环得到元素指定父节点
const getRecursiveEle = (ele, typeName="nodeName", value='li')=> {
  if(ele[typeName].toLowerCase() === value ) {
    return ele
  } else {
    if(ele.nodeName.toLowerCase() === 'body') {
      return ele
    }
    ele = ele.parentNode
    return getRecursiveEle(ele, typeName, value)
  }
}

// 滚动动画
const scrollAnimate = (ele, oldY, newY, rate=6, callBack)=> {
  // ++ 是为了让目标区块的边界越过界线一点
  newY++
  let step = Math.abs(newY - oldY)/rate
  let timer = requestAnimationFrame(function fn(){
    step = Math.abs(newY - oldY)/rate
    if(newY > oldY) {
      oldY += step
      oldY > newY - 1 && (oldY = newY)
    } else if(newY < oldY) {
      oldY -= step
      oldY < newY + 1 && (oldY = newY)
    } else {
      // 恢复右侧滚动监听事件
      callBack()
      return
    }

    ele.scrollTop = oldY
    timer = requestAnimationFrame(fn)
  })
}

// 时间格式化
const formatTime = (time)=>{
  let formatTime = new Date(time)
  let nowTime = new Date()
  let offset = nowTime - formatTime

  if(offset > 86399000) {
    // 如果时间差超过了 24小时
    let fullYear = formatTime.getFullYear()
    let month = '' + (formatTime.getMonth() + 1)
    let date = '' + formatTime.getDate()
    let hour = '' + formatTime.getHours()
    let minute = '' + formatTime.getMinutes()

    month.length<2 && (month = '0' + month)
    date.length<2 && (date = '0' + date)
    hour.length<2 && (hour = '0' + hour)
    minute.length<2 && (minute = '0' + minute)

    return {fullYear, month, date, hour, minute, isOffset: true}
  } else {
    let offsetHours = Math.floor(offset/1000/60/60)
    let offsetMinutes = Math.floor((offset-offsetHours*60*60*1000)/1000/60)
    return {offsetHours, offsetMinutes, isOffset: false}
  }
}

// 比较购物车数组内容是否相等，以便决定是否重绘update
const isEqualArray = (arr1, arr2)=> {
  let len = arr1.length
  if(len !== arr2.length) {
    return false
  }
  return arr1.every((item,index)=> {
    return item.count === arr2[index].count
  })
}

const getClientHeight = () => {
  // 获取当前可视范围的高度
  let clientHeight = 0
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
  } else {
    clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
  }
  return clientHeight
}
const getScrollHeight = () => {
  // 获取文档完整的高度，包括超出屏幕可以滚动显示的部分
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
}

const getScrollTop = () => {
  // 获取滚动条距离顶部的距离
  let scrollTop = 0
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop
  } else if (document.body) {
    scrollTop = document.body.scrollTop
  }
  return scrollTop
}

// 为组件内函数绑定上下文
const bindScope = (that, fnNameList) => {
  Object.prototype.toString.call(fnNameList).slice(8, -1) === 'Array'
  ? fnNameList.forEach(fnName=>{
    that[fnName] = that[fnName].bind(that)
  })
  : that[fnNameList] = that[fnNameList].bind(that)
}

// 在页面中动态插入 script标签
const loadScript = (url, func, clear=false)=> {
  let script = document.createElement('script')
  let bodyEle = document.body
  script.src = url
  script.onload = script.onreadystatechange = function(){
    if(!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
      func && typeof func === 'function' && func()
      clear ? bodyEle.removeChild(script) : (script.onload = script.onreadystatechange = null)
    }
  }
  bodyEle.appendChild(script)
}

// 自定义jsonp
const selfJsonp = (url, callback, cb='cb')=>{
  let cbname = cb + new Date().getTime()
  window[cbname] = (data)=>{
    callback(data)
    delete window[cbname]
  }
  url += url.indexOf('?') === -1 ? '?' : '&'
  url += (cb + '=' + cbname)
  loadScript(url, null, true)
}

export {
  selectEle,
  getH,
  getRecursiveEle,
  historyBack,
  AnimateEle,
  initRem,
  formatTime,
  scrollAnimate,
  isEqualArray,
  getClientHeight,
  getScrollHeight,
  getScrollTop,
  bindScope,
  loadScript,
  selfJsonp
}