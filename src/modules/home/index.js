import React, { Component } from 'react'
import styles from './home.scss'
import Selects from './components/select'
import HouseList from './components/list'
import { connect } from 'react-redux'
import { houseGet, setLoading, refreshData } from '../actions'
import { Spin } from 'fish'

@connect(
  state => {
    return {
      houses: state.house.houses,
      loading: state.house.loading
    }
  },
  {
    houseGet,
    setLoading,
    refreshData
  }
)
export default class Home extends Component {
  state = {
    method: -1,
    rent: -1,
    maxRent: -1,
    minRent: -1,
    houseCount: -1,
    limit: 5,
    offset: 0,
    height: 'auto',
    listPrompt: '请求完成'
  }
  ticking = false
  constructor(props) {
    super()
    props.refreshData()
    console.log('xxxx')
  }

  componentDidMount() {
    let dom = document
    if (window.screen.availHeight && this.refs.ref.offsetTop) {
      this.setState({
        height: window.screen.availHeight - this.refs.ref.offsetTop
      })
      dom = this.refs.ref
    }
    dom.addEventListener('scroll', this.handScroll, {
      passive: true
    })
    this.handleGetData({ newData: true })
  }
  componentWillUnmount() {
    let dom = document
    if (window.screen.availHeight && this.refs.ref.offsetTop) {
      dom = this.refs.ref
    }
    dom.removeEventListener('scroll', this.handScroll, { passive: true })
  }

  // 滚动处理函数
  handScroll = e => {
    const { clientHeight, scrollTop, scrollHeight } = e.target
    if (!this.ticking) {
      this.ticking = true
      requestAnimationFrame(() => {
        if (this.oldScrollTop > scrollTop) {
        } else if (scrollHeight - scrollTop - clientHeight <= 60) {
          this.handleGetData()
        }
        this.oldScrollTop = scrollTop
        this.ticking = false
      })
    }
  }
  // 用户选择
  handleChange = (key, value) => {
    this.props.refreshData()
    const params = {

      offset: 0
    }
    if (key === 'rent') {
      params.maxRent = value.max
      params.minRent = value.min
    } else {
      params[key] = value
    }

    this.setState(params, () => {
      this.handleGetData()
    })
  }

  // 请求数据
  handleGetData = () => {
    console.log(this.state)
    const { offset, limit, houseCount, method, maxRent, minRent } = this.state
    // if (this.props.loading) {
    //   return
    // }
    const params = {
      offset,
      limit,
      houseCount,
      method,
      maxRent,
      minRent
    }

    this.props
      .houseGet(params)
      .then(res => {
        const length = res.payload.data.length
        this.props.setLoading(false)
        if (!length || length === 0) {
          this.setState({listPrompt: '没有更多的数据了'})
          return
        }
        this.setState({
          offset: offset + length
        })
      })
  }
  render() {
    const { loading } = this.props
    return (
      <div className={styles.home}>
        <Selects handleChange={this.handleChange} />
        <div
          ref={'ref'}
          className={styles.listBox}
          style={{ height: this.state.height }}
        >
          <HouseList {...this.props} />
          <div className={styles.loadingMore} onClick={this.handleGetData}>
            {loading ? <Spin /> : <span>{this.state.listPrompt}</span>}
          </div>
        </div>
      </div>
    )
  }
}
