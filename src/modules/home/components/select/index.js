import React, { Component } from 'react'
import { Select } from 'fish'
import styles from './style.scss'

const Option = Select.Option

const rentData = [
  {
    id: '-1',
    value: '选择租金'
  },
  {
    id: '1',
    value: '0~1000',
    min: 0,
    max: 1000
  },
  {
    id: '2',
    value: '1001~2000',
    min: 1001,
    max: 2000
  },
  {
    id: '3',
    value: '2001~4000',
    min: 2001,
    max: 4000
  },
  {
    id: '4',
    value: '4001~6000',
    min: 4001,
    max: 6000
  },
  {
    id: '5',
    value: '6001以上',
    min: 6001
  }
]

export default class Selects extends Component {
  handleChange = config => v => {
    console.log(v)
    if (config.name === 'rent') {
      const findOne = rentData.find(item => item.id === v)
      console.log(findOne)
      this.props.handleChange(config.name, findOne)
    } else {
      this.props.handleChange(config.name, v)
    }
  }
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
          onChange={this.handleChange(config)}
        >
          {config.data &&
            config.data.map(item => (
              <Option key={item.id} value={item.id}>{item.value}</Option>
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
              id: '-1',
              value: '选择方式'
            },
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
          data: rentData
        })}
        {this.renderSelect({
          label: '房屋户型',
          placeholder: '选择户型',
          name: 'houseCount',
          data: [
            {
              id: '-1',
              value: '选择户型'
            },
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
