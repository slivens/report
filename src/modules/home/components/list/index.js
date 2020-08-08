import React, { Component } from 'react'
import styles from './style.scss'
import Item from './item'
export default class HouseList extends Component {
  render() {
    return (
      <div className={styles.list}>
        {this.props.houses.map(item => (
          <Item data={item} />
        ))}
      </div>
    )
  }
}
