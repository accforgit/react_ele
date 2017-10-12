import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import CommonHead from '../Common/CommonHead'
import Part1 from './part1'
import PartCommon from './part-common'

import {getDiscoverListData} from '../../fetch/home/home.js'
import './style.less'

import LoadingPage from 'commonComponent/LoadingPage'

class Discover extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this.state = {
      discoverData: null
    }
  }
  render() {
    let discoverData = this.state.discoverData
    return (
      <div className="discover-wrapper">
        <CommonHead title="发现"/>
        {
          discoverData ?
          <div id="discover-box">
            <Part1/>
            <PartCommon title="美食热推" sub_title="你的口味，我都懂得" title_icon="nice" data={discoverData.recommend} type="recommend"/>
            <PartCommon title="天天特价" sub_title="特价商品，一网打尽" title_icon="tag" data={discoverData.special} type="special"/>
            <PartCommon title="限时好礼" sub_title="小积分换豪礼" title_icon="alarm" data={discoverData.present} type="present"/>
          </div> :
          <LoadingPage/>
        }
      </div>
    )
  }

  componentDidMount() {
    const discoverlist = getDiscoverListData()
    discoverlist.then(res=>{
      return res.json()
    }).then(data=>{
      this.setState({
        discoverData: data
      })
    })
  }
}

export default Discover