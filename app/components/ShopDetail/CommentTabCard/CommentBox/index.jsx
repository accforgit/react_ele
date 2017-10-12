import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Star from 'commonComponent/Star'

import { selectEle } from 'util'
import ZoomImg from 'commonComponent/ZoomImg'

import '../style.less'

class CommentBox extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this._createCommentTag = this._createCommentTag.bind(this)
    this._createCommentList = this._createCommentList.bind(this)
    this.listenerScroll = this.listenerScroll.bind(this)
    this.shouldZoomImg = this.shouldZoomImg.bind(this)

    let shopInfo = props.shopInfo
    let tags = this.tagsComputed(shopInfo.commentList)

    this.state = {
      // 所有评论
      commentList: shopInfo.commentList,
      // 符合当前标签的评论
      curretCommentList: shopInfo.commentList,
      // 10000 只是一个标记数，表示当前没有图片需要被放大
      zoomImgIndex: 10000,
      currentTagIndex: 0,
      hasMore: true,
      tags
    }
  }

  componentWillReceiveProps(newProps) {
    let state = this.state
    !newProps.shopInfo.hasMore && (state.hasMore = false)
    state.commentList = state.commentList.concat(newProps.shopInfo.commentList)
    this.commentListComputed(state.currentTagIndex)
  }

  render() {
    let props = this.props
    let state = this.state

    let zoomImgItem = state.curretCommentList[state.zoomImgIndex]
    let zoomImgParams = {
      shouldZoom: state.zoomImgIndex !== 10000,
      imgs: zoomImgItem ? zoomImgItem.commentImgs : null,
      textDesc: zoomImgItem ? '商品评价' : null,
      imgClickFn: this.shouldZoomImg
    }
    return (
      <section className="comment-list-wrapper">
        <ul className="comment-tags">
          {
            state.tags.map(this._createCommentTag)
          }
        </ul>
        {
          state.curretCommentList &&
          <ul className="comment-list-box">
            {
              state.curretCommentList.map(this._createCommentList)
            }
          </ul>
        }
        <ZoomImg {...zoomImgParams}/>
      </section>
    )
  }

  componentDidMount() {
    this.listenerScroll()
  }
  changeTag(index) {
    this.setState({
      currentTagIndex: index
    })
    this.commentListComputed(index)
  }

  listenerScroll() {
    const that = this
    let loadCommentData = this.props.loadCommentData
    let commentTabCard = selectEle('.comment-tab-card')
    let commentCardBox = selectEle('.comment-card-box')

    let commentTabCardHeight = parseInt(commentTabCard.style.height)

    let timer = null
    commentTabCard.addEventListener('scroll', function shouldLoad() {
      if(!that.state.hasMore) {
        commentTabCard.removeEventListener('scroll', shouldLoad)
      }
      if(timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(()=>{
        if(commentCardBox.clientHeight - commentTabCardHeight - commentTabCard.scrollTop < 2) {
          loadCommentData()
        }
      }, 20)
    })
  }

  shouldZoomImg(index=10000) {
    this.setState({
      zoomImgIndex: index
    })
  }

  tagsComputed(commentList) {
    // 评论标签
    let len = commentList.length
    let tags = [
      {name: '全部', count: len},
      {name: '满意', count: 0},
      {name: '不满意', count: 0},
      {name: '有图', count: 0}
    ]
    for(let i = len; i--;) {
      let comment = commentList[i]
      let score = comment.score
      comment.tag = 0
      if(score < 3) {
        // 不满意
        tags[2].count++
      } else {
        // 满意
        tags[1].count++
      }
      if(comment.commentImgs && comment.commentImgs.length > 0) {
        // 有图
        tags[3].count++
      }
    }

    return tags
  }

  commentListComputed(index) {
    let commentList = this.state.commentList
    let curretCommentList = []
    let len = commentList.length

    if(index === 0) {
      curretCommentList = commentList
    } else {
      for(let i=len; i--;) {
        let comment = commentList[i]
        let score = comment.score
        let imgLen = (comment.commentImgs && comment.commentImgs.length) || 0
        if (index === 1) {
          score > 2 && curretCommentList.push(comment)
        } else if(index === 2) {
          score < 3 && curretCommentList.push(comment)
        } else {
          imgLen > 0 && curretCommentList.push(comment)
        }
      }
    }
    this.setState({
      curretCommentList
    })
  }

  _createCommentTag(item, index) {
    let className = this.state.currentTagIndex===index ? "comment-tag tag1 active" : 'comment-tag tag1'
    // 不满意
    if(index === 2) {
      className = this.state.currentTagIndex===index ? "comment-tag tag2 active" : 'comment-tag tag2'
    }
    return (
      <li key={index} className={className} onClick={this.changeTag.bind(this, index)}>{item.name}({item.count})</li>
    )
  }

  _createCommentList(item, index) {
    return (
      <li className="comment-list" key={index}>
        <img src={item.userAvatar} alt={item.userName} className="user-avatar"/>
        <div className="comment-main">
          <p className="user-name">{item.userName}</p>
          <div className="comment-star">
            <Star starPercent={item.score/5}/>
          </div>
          <p className="comment-text">{item.commentText}</p>
          {
            item.commentImgs.length > 0 &&
            <div className="comment-img-wrapper">
              {
                item.commentImgs.map((k, v)=>{
                  return (
                    <div className="img-box" key={v} onClick={this.shouldZoomImg.bind(this, index)}>
                      <img src={k} alt="img" className="comment-img"/>
                    </div>
                  )
                })
              }
            </div>
          }
          <p className="recommend-list">
            {
              item.recommendGoods.map((k, v)=> {
                return <span key={v} className="recommend-tag">{k}</span>
              })
            }
          </p>
        </div>
      </li>
    )
  }
}

export default CommentBox