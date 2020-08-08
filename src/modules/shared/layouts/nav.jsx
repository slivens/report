import React from 'react'
import { injectIntl } from 'react-intl'
import { Icon, Button } from 'fish'
import HeaderType from './headerType'
import { go, push } from 'react-router-redux/lib/actions'
import { connect } from 'react-redux'
import { routerShape } from 'react-router'
import styles from './nav.scss'
console.log(styles)
@injectIntl
@connect(
  () => {
    return {}
  },
  {
    go,
    push
  }
)
class Nav extends React.Component {
  static contextTypes = {
    router: routerShape.isRequired
  }
  // 返回上一页
  goBack = () => {
    this.context.router.goBack()
  }
  // 渲染头部
  renderHeader = () => {
    const { type } = this.props
    let dom = null
    if (type === HeaderType.HOME) {
      dom = (
        <div className={styles.homeHeader}>
          <h1>租房！</h1>
          <span>
            <Button
              className={styles.btn}
              type="primary"
              onClick={() => this.context.router.push('/add')}
            >
              发布房源
            </Button>
          </span>
        </div>
      )
    } else if (type === HeaderType.ADD) {
      dom = (
        <div className={styles.homdeDefault}>
          <Icon className={styles.iconBack} type="left" onClick={this.goBack} />
          <h1>发布房源</h1>
        </div>
      )
    } else {
      dom = (
        <div className={styles.homdeDefault}>
          <Icon className={styles.iconBack} type="left" onClick={this.goBack} />
          <h1>房源详情</h1>
        </div>
      )
    }
    return <header>{dom}</header>
  }
  render() {
    return <nav>{this.renderHeader()}</nav>
  }
}

export default Nav
