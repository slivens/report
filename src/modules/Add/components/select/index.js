import React, { Component } from 'react'
import { Select } from 'fish'
import styles from './style.scss'

const Option = Select.Option

export default class Selects extends Component {
  renderSelect = config => {
    return (
      <div className={styles.selectItem}>
        <label className={styles.label}>{config.label}：</label>
        <Select
          name={config.name}
          placeholder={config.placeholder}
          className={styles.chooseBox}
          dropdownClassName="custom-select"
          defaultValue={config.defaultValue}
          onChange={this.handleChange}
        >
          {config.data &&
            config.data.map(item => (
              <Option key={item.id} value={item.id}>
                {item.value}
              </Option>
            ))}
        </Select>
      </div>
    )
  }
  render() {
    return (
      <div className={styles.selects}>
        {this.renderSelect({
          label: '出租方式',
          placeholder: '选择方式',
          name: 'method',
          data: [
            {
              id: '1',
              value: '整租'
            },
            {
              id: '2',
              value: '合租'
            }
          ]
        })}
        {this.renderSelect({
          label: '租金范围',
          placeholder: '选择租金',
          name: 'rent',
          data: [
            {
              id: '-1',
              value: '选择租金'
            },
            {
              id: '1',
              value: '0~1000'
            },
            {
              id: '2',
              value: '1001~2000'
            },
            {
              id: '3',
              value: '2001~4000'
            },
            {
              id: '4',
              value: '4001~6000'
            },
            {
              id: '5',
              value: '6001以上'
            }
          ]
        })}
        {this.renderSelect({
          label: '出租方式',
          placeholder: '选择户型',
          name: 'method',
          data: [
            {
              id: '1',
              value: '1室'
            },
            {
              id: '2',
              value: '2室'
            },
            {
              id: '3',
              value: '3室'
            },
            {
              id: '4',
              value: '4室'
            },
            {
              id: '5',
              value: '5室'
            }
          ]
        })}
      </div>
    )
  }
}
