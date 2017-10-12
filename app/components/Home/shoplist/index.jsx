import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import '../../../static/css/Home/shoplist/style.less'

import ShopListItem from './shop-list-item'

class ShopList extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  
  render() {
    return (
      <section id="shop-list-box">
        <ul className="shop-list">
          {
            this.props.data.map((item, index)=>{
              return <ShopListItem data={item} key={index}/>
            })
          }
        </ul>
      </section>
    )
  }
}

export default ShopList