import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'
import Slider from 'react-slick'

import '../../../static/css/Home/category/style.less'
import '../../../static/css/slick.css'

class Category extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

    this.state = {
      index: 0, 
    }
  }
  
  render() {
    let data = this.props.data
    let swipeCount = data.length
    let swipeStep = []
    for(let i=0; i<swipeCount; i+=8) {
      swipeStep.push(i)
    }
    let opt = {
      auto: 10000,
      callback: (index)=> {
        this.setState({
          index: index,
        })
      }
    }
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    } 
    return (
      <section id="categoryBox">
        <Slider {...settings}>
          {
            swipeStep.map((step, k)=>{
              return <div className="carousel-item" key={k} id={step}>
                <div className="cate-item">
                  {data.slice(step,step+8).map((item, index)=>{
                    return (
                      <Link to={"/SearchResult/"+item.category} key={index+'_f'}>
                        <img src={item.img} alt=""/>
                        <span>{item.title}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            })
          }
        </Slider>
      </section>
    )
  }

}

export default Category