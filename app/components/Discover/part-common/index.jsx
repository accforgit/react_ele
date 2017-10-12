import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

import SaleItem from './sale-item'

class PartCommon extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    let {title, sub_title, title_icon, data, type} = this.props
    return (
      <section className="part-common">
        <div className="activity-header">
          <div className="activity-title">
            <span className="line left"></span>
            <svg className="activity-icon" id={title_icon}>
              <use xlinkHref={"#"+title_icon}></use>
            </svg>
            <h3>{title}</h3>
            <span className="line right"></span>
          </div>
          <div className="activity-sub-title lt12">
            {sub_title}
          </div>
        </div>
        <div className="list-item">
          {
            data.map((item, index)=>{
              return <SaleItem key={index} item={item} type={type}/>
            })
          }
        </div>
        <div className="more">
          <a href={"/"+type+"/more"}>查看更多</a>
          <svg className="more-icon">
            <use xlinkHref="#tab_found_next_page"></use>
          </svg>
        </div>
      </section>
    )
  }
}

export default PartCommon