import React, { Component } from 'react'
import styles from './style.scss'
import { Carousel } from 'fish'
import { connect } from 'react-redux'
import { houseDetail } from '../actions'

@connect(
  state => {
    return {
      houses: state.house.houses,
      loading: state.house.loading
    }
  },
  {
    houseDetail
  }
)
export default class Detail extends Component {
  state = {
    detail: null
  }
  componentDidMount() {
    this.props.houseDetail(this.props.params).then(res => {
      this.setState({
        detail: res.payload.data
      })
    })
    // console.log(this.props.params)
  }
  render() {
    console.log(this.state.detail)
    const { detail } = this.state
    if (!this.state.detail) {
      return null
    } else {
      return (
        <div className={styles.detail}>
          <Carousel>
            {detail.images.map(item => {
              return (
                <div>
                  <img
                    onError={e => {
                      e.target.src = require(`../../static/images/house.jpg`)
                    }}
                    src={item}
                  />
                </div>
              )
            })}
          </Carousel>
          <div className={styles.houseContent}>
            <div className={styles.title}>
              {detail.title}
            </div>

            <div className={styles.detail}>
              <div className={styles.priceBox}>
                <div className={styles.left}>
                  <div className={styles.price}>{detail.rent}元/月 ({detail.method === 1 ? '整租' : '合租'})</div>

                </div>
              </div>

              <div className={styles.houseInfo}>
                {detail.houseInfo.house}室{detail.houseInfo.hall}厅
                {detail.houseInfo.bathroom}卫
              </div>
              <div className={styles.area}>
                {detail.area}㎡
              </div>
            </div>
            <div className={styles.descriptionBox}>
              <span className={styles.descriptionTitle}>房屋描述:</span>
              <div className={
                styles.description
              } >
                {detail.description}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
