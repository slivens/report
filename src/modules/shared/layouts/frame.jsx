import React from 'react'
import Nav from './nav'
import HeaderType from './headerType'
import style from './frame.scss'
class Frame extends React.Component {
  static propTypes = {
    children: React.PropTypes.element
  }

  constructor(props) {
    super(props)
    this.state = {
      headerType: this.getHeaderType(props)
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    this.setState({
      headerType: this.getHeaderType(nextProps)
    })
  }
  getHeaderType = (props) => {
    let headerType = null
    if (props.location.pathname === '/') {
      headerType = HeaderType.HOME
    } else if (props.location.pathname === '/add') {
      headerType = HeaderType.ADD
    } else {
      // 如果有其他类型的头部可以继续拓展
      headerType = HeaderType.WITHBACK
    }
    return headerType
  }

  render() {
    return (
      <div className={style.frame}>
        <div className={style.header}>
          <Nav type={this.state.headerType} />
        </div>
        <div className={style.container}>{this.props.children}</div>
      </div>
    )
  }
}

export default Frame
