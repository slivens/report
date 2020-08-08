import React, { Component } from 'react'
// import ReactDOM from 'react-dom'

import { Form, Select, InputNumber, Radio, Button, Input } from 'fish'
import { connect } from 'react-redux'
import { houseAdd } from '../actions'
import { routerShape } from 'react-router'
import styles from './style.scss'
console.log(styles)

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

@connect(
  state => {
    return {
      houses: state.house.houses
    }
  },
  {
    houseAdd
  }
)
class Add extends Component {
  static contextTypes = {
    router: routerShape.isRequired
  }

  state = {
    house: 1,
    hall: 1,
    bathroom: 1
  }

  removeScriptTag(spinnerList) {
    const reTag = /<(?:.|\s)*?>/g
    let str = JSON.stringify(spinnerList)
    str = str.replace(reTag, '')
    return JSON.parse(str)
  }

  replaceSpecialChars(str) {
    str = str.replace(/&/g, '&amp;')
    str = str.replace(/</g, '&lt;')
    str = str.replace(/>/g, '&gt;')
    return str
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log(values)
        // console.log(this.state)

        // if (!this.handleImageUrlFormat(this.state.images)) return

        if (window.confirm('确认发布？')) {
          const {house, hall, bathroom} = this.state
          const data = Object.assign({}, values)
          data['images'] = values.images.split('\n')
          data['houseInfo'] = {
            house,
            hall,
            bathroom
          }
          data['pubtimer'] = Date.now()
          data['title'] = this.removeScriptTag(values['title'])
          data['title'] = this.replaceSpecialChars(values['title'])
          data['description'] = this.removeScriptTag(values['description'])
          data['description'] = this.replaceSpecialChars(values['description'])
          data['images'] = this.removeScriptTag(values['images']).split('\n')
          data['images'] = this.replaceSpecialChars(values['images']).split('\n')
          console.warn(data)
          this.props.houseAdd(data)
            .then(() => {
              this.context.router.push('/')
            })

          console.log('Received values of form: ', values)
        }
      }
    })
  }

  handleImageUrlFormat = (images) => {
    try {
      const imgs = images.split('\n')
      console.warn(imgs)
      if (imgs.length > 5) {
        alert('最多5张')
      }
      const hasError = imgs.some(img => {
        if (!img.match(/^http(s)?:\/\/(.)+\.(jpg|jpeg|png|gif)(\n)?$/)) {
          return true
        }
      })
      if (hasError) {
        alert('请输入正确的房源图片')
        return false
      }
    } catch (e) {
      alert('请输入正确的房源图片')
      return false
    }
  }

  handleChange = (name) => (value) => {
    this.setState({
      [name]: value
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="出租方式">
          {getFieldDecorator('method', {
            rules: [
              { required: true, message: '请选择出租方式!' }
            ]
          })(
            <RadioGroup>
              <Radio value="1">整租</Radio>
              <Radio value="2">合租</Radio>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="房屋面积"
        >
          {getFieldDecorator('area', { initialValue: 45 })(
            <InputNumber min={1} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="房屋户型"
          hasFeedback
        >
          <Select defaultValue="1" name="house" style={{width: 50}} onChange={this.handleChange('house')}>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
          </Select>
          <span className="ant-form-text">室</span>

          <Select defaultValue="1" name="hall" style={{width: 50}} onChange={this.handleChange('hall')}>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
          </Select>
          <span className="ant-form-text">厅</span>

          <Select defaultValue="1" name="bathroom" style={{width: 50}} onChange={this.handleChange('bathroom')}>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
          </Select>
          <span className="ant-form-text">卫</span>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="租金要求"
        >
          {getFieldDecorator('rent', {
            rules: [
              { required: true, message: '请填入租金要求!' }
            ]
          })(
            <InputNumber min={1} />
          )}
          {/* <span className="ant-form-text"> machines</span> */}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="房源标题"
        >
          {getFieldDecorator('title', {
            rules: [
              { required: true, message: '请填写房屋标题!' }
            ]
          })(
            <Input placeholder="50字以内的中文、英文或数字" />
          )}
          {/* <span className="ant-form-text"> machines</span> */}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="房源描述"
        >
          {getFieldDecorator('description', {
            rules: [
              { required: true, message: '请填写房屋描述!' }
            ]
          })(
            <Input type="textarea" placeholder="300字以内的中文、英文或数字" autosize={{ minRows: 2, maxRows: 10 }} />
          )}
          {/* <span className="ant-form-text"> machines</span> */}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="房源图片"
        >
          {getFieldDecorator('images', {
            rules: [
              { required: true, message: '请填入图片url!' }
            ]
          })(
            <Input type="textarea" placeholder="请输入正确的Url，每行一个图片url，最多5张" autosize={{ minRows: 2, maxRows: 10 }} />
          )}
          {/* <span className="ant-form-text"> machines</span> */}
        </FormItem>

        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit">提交</Button>
          <Button type="primary" onClick={() => this.context.router.push('/')}>取消</Button>
        </FormItem>
      </Form>
    )
  }
}

const AddController = Form.create()(Add)
export default AddController
