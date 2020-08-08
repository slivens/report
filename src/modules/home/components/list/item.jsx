import React, { Component } from 'react'
import styles from './item.scss'
import { routerShape } from 'react-router'
import moment from 'moment'

export default class Item extends Component {
  static contextTypes = {
    router: routerShape.isRequired
  }
  gotoDetail = house => () => {
    this.context.router.push(`/detail/${house.id}`)
  }
  getTime(timer) {
    const createTime = timer
    const now = new Date().getTime()
    const interval = now - createTime
    const today = new Date(new Date(new Date().toLocaleDateString()).getTime())
    const notToday = createTime < today
    if ((interval) < 60 * 1000) {
      return '刚刚'
    } else if (interval >= 60 * 1000 && interval < 60 * 60 * 1000) {
      return parseInt((interval) / (60 * 1000)) + '分钟前'
    } else if (!notToday) {
      return parseInt((createTime - today) / (60 * 60 * 1000), 10) + '小时前'
    } else {
      return moment(createTime).format('YYYY-MM-DD  HH:mm')
    }
  }

  render() {
    const house = this.props.data
    return (
      <div onClick={this.gotoDetail(house)} className={styles.item}>
        <div className={styles.leftBox}>
          <img src={house.images[0]} onError={e => { e.target.src = require(`../../../../static/images/house.jpg`) }} />
        </div>
        <div className={styles.rightBox}>
          <div className={styles.title}>{house.title}</div>
          <div className={styles.detail}>
            {house.method === 1 ? '整租' : '合租'} |{house.houseInfo.house}室
            {house.houseInfo.hall}厅{house.houseInfo.bathroom}卫 |{house.area}㎡
          </div>
          <div className={styles.description}>{house.description}</div>
          <div className={styles.priceBox}>
            <div className={styles.price}>{house.rent}元/月</div>
            <div className={styles.time}>{this.getTime(house.pubtime)}</div>
          </div>
        </div>
      </div>
    )
  }
}
