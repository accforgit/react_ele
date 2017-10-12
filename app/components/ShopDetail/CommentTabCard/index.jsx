import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import RatingBox from './RatingBox'
import CommentBox from './CommentBox'
import {getShopCommentlData} from '@fetch/home/home.js'

import './style.less'

class CommentTabCard extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this.loadCommentData = this.loadCommentData.bind(this)

    this.state = {
      shopInfo : null,
      commentSize: 10,
      commentNumber: 0,
      isUnMount: false
    }
  }
  render() {
    let state = this.state
    let scoreList = this.props.scoreList
    let shopInfo = state.shopInfo
    return (
      <div className="comment-card-box">
        {
          scoreList &&
          <RatingBox scoreList={scoreList}/>
        }
        {
          shopInfo &&
          <CommentBox shopInfo={state.shopInfo} loadCommentData={this.loadCommentData}/>
        }
      </div>
    )
  }

  componentDidMount() {
    this.loadCommentData()
  }

  loadCommentData() {
    let state = this.state
    const shopCommentData = getShopCommentlData(1, state.commentSize, ++state.commentNumber)
    this.resultHandle(shopCommentData)
  }

  resultHandle(result) {
    result.then(res=>{
      return res.json()
    }).then(data=>{
      if(data) {
        console.log(555, data)
        if(data.hasMore) {
          try {
            this.setState({
              shopInfo: data,
            })
          } catch(e) {
            console.log('Error2: ', e);
          }
        }
      }
    }).catch((ex)=>{
      console.log('Catch Error1:', ex);
      // if (__DEV__) {
      //   console.error('商家详情页获取数据报错, ', ex.message)
      // }
    })
  }

}

export default CommentTabCard