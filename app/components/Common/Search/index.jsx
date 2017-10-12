import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    return (
      <div id="search-box">
        <header className="search-head">
          <svg className="head-arrow-left" onClick={this.historyBack}>
            <use xlinkHref="#arrow-left"></use>
          </svg>
          <form className="form-box">
            <input type="search" className="search-input" placeholder="请输入商品名称" autoFocus/>
          </form>
          <button className="searchBtn" type="submit">搜索</button>
        </header>
        <section className="hot-search">
          <h2>热门搜索</h2>
          <ul>
            <li className="hot-search-list">披萨</li>
            <li className="hot-search-list">魏家凉皮</li>
            <li className="hot-search-list">麦当劳</li>
            <li className="hot-search-list">咖喱饭</li>
            <li className="hot-search-list">我的菜</li>
            <li className="hot-search-list">周黑鸭</li>
            <li className="hot-search-list">必胜客</li>
            <li className="hot-search-list">蛋包饭</li>
            <li className="hot-search-list">凉面</li>
            <li className="hot-search-list">星巴克</li>
          </ul>
        </section>
      </div>
    )
  }

  historyBack() {
    history.back()
  }
}

export default Search