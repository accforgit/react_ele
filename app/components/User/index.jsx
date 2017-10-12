import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import CommonHead from '../Common/CommonHead'

import 'style/User/style.less'

class User extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    return (
      <div id="user-box">
        <CommonHead title="我的"/>
        <section className="user-info-box">
          <div className="user-info">
            <div className="avatar-box">
              <svg className="user-avatar">
                <use xlinkHref="#avatar-default"></use>
              </svg>
            </div>
            <div className="user-name-phone">
              <p className="user-name">多吃点吧</p>
              <p className="user-phone">
                <svg className="phone-icon">
                  <use xlinkHref="#mobile"></use>
                </svg>
                <span className="phone-number">
                  186****8888
                </span>
              </p>
            </div>
          </div>
          <svg className="user-more">
            <use xlinkHref="#arrow-right"></use>
          </svg>
        </section>
        <section className="user-number-box">
          <div className="number-box number-left-box">
            <p className="number-left"><span className="number-left-text">5</span>个</p>
            <p className="number-summary">优惠</p>
          </div>
          <div className="number-box">
            <p className="number-right"><span className="number-right-text">3450</span>分</p>
            <p className="number-summary">积分</p>
          </div>
        </section>
        <ul className="user-list-box">
          <li className="user-list">
            <div className="list-name">
              <svg fill="#4aa5f0" className="aside-icon">
                <use xlinkHref="#order"></use>
              </svg>
              <span className="summary">
                我的订单
              </span>
            </div>
            <svg className="arrow-right">
              <use xlinkHref="#arrow-right"></use>
            </svg>
          </li>
          <li className="user-list">
            <div className="list-name">
              <svg fill="#fc7b53" className="aside-icon">
                <use xlinkHref="#point"></use>
              </svg>
              <span className="summary">
                积分商城
              </span>
            </div>
            <svg className="arrow-right">
              <use xlinkHref="#arrow-right"></use>
            </svg>
          </li>
          <li className="user-list">
            <div className="list-name">
              <svg fill="#ffc636" className="aside-icon">
                <use xlinkHref="#vip"></use>
              </svg>
              <span className="summary">
                饿了么会员卡
              </span>
            </div>
            <svg className="arrow-right">
              <use xlinkHref="#arrow-right"></use>
            </svg>
          </li>
          <li className="user-list">
            <div className="list-name">
              <svg fill="#4aa5f0" className="aside-icon">
                <use xlinkHref="#service"></use>
              </svg>
              <span className="summary">
                服务中心
              </span>
            </div>
            <svg className="arrow-right">
              <use xlinkHref="#arrow-right"></use>
            </svg>
          </li>
          <li className="user-list">
            <div className="list-name">
              <svg fill="#3cabff" className="aside-icon">
                <use xlinkHref="#download"></use>
              </svg>
              <span className="summary">
                下载饿了么APP
              </span>
            </div>
            <svg className="arrow-right">
              <use xlinkHref="#arrow-right"></use>
            </svg>
          </li>
        </ul>
      </div>
    )
  }
}

export default User