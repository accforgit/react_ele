import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class LoadMore extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  componentWillReceiveProps(props) {
    this.shouldLoadMore && this.shouldLoadMore(props)
  }

  render() {
    let isLoadingMore = this.props.isLoadingMore
    return (
      <div className="load-more" ref="wrapper">
        { 
          isLoadingMore &&
          <svg className="loading-flower">
            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#loading"></use>
          </svg>
        }
        {
          isLoadingMore
          ? <span>正在加载...</span>
          : <span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>
        }
      </div>
    )
  }

  componentDidMount() {
    this.shouldLoadMore(this.props)
  }

  shouldLoadMore(flag) {
    if(flag.shouldLoad) {
      const loadMoreFn = flag.loadMoreFn
      const wrapper = this.refs && this.refs.wrapper
      wrapper && this.autoLoadMore.bind(this, wrapper, loadMoreFn)()
      flag.changeShouldLoadState()
    }
  }

  autoLoadMore(wrapper, loadMoreFn) {
    console.log('loadMore')
    const top = wrapper.getBoundingClientRect().top
    const windowHeight = window.screen.height
    if(top && top<windowHeight - 6) {
      // 当 '加载更多' 四个字出现在可视区域内时,
      // 自动执行 获取更多函数，实现自动下拉加载效果
      loadMoreFn()
    }
  }

  loadMoreHandle() {
    this.props.loadMoreFn()
  }
}

export default LoadMore