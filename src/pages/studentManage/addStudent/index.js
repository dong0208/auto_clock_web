import React from "react";
import SelectMapForm from '../selectMapForm/selectMapForm'
import '../index.less'
import { Modal, Form, Select, Button, Input,Checkbox,Radio } from 'antd'
import {submitStudentApi} from './api'
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 20 },
        sm: { span: 16 },
    },
};
class AddStudent extends React.Component {
    state = {
    }
    handleOk = () => {
        this.props.form.validateFields((err, value) => {
            let obj = {
                createId:1000,
                ...value,
                ...value.address_mark,
                area:value.address_mark.district,
                clockAm:value.clockAm?1:0,
                clockPm:value.clockPm?1:0,
                weeks:value.weeks.length>0?value.weeks.join(','):null
            }
            submitStudentApi(obj).then((res)=>{
                console.log(res,'res-------------')
            })
        });
    }
    handleCancel = () => {
        const { cancelVisible } = this.props
        cancelVisible()
    }
    render() {
        const { visible ,isEdit} = this.props
        const { getFieldDecorator } = this.props.form;
        const {
            longitude,
            latitude,
            province, 
            city,
            district,
            mapAddress,
            phone,
            password,
            clockDays,
            appType,
            weeks,
            clockAm,
            clockPm,
            address
        } = this.props.editData
        const optionsWeeks = [
            { value: '1', label: '周一' },
            { value: '2', label: '周二' },
            { value: '3', label: '周三' },
            { value: '4', label: '周四' },
            { value: '5', label: '周五' },
            { value: '6', label: '周六' },
            { value: '7', label: '周日' },
        ]
        return <div>
            <Modal
                title="添加学生"
                visible={visible}
                maskClosable={false}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                centered={true}
                width={800}
                bodyStyle={{ height: 600, overflowY: 'scroll' }}
            >
                <Form className="modal-form" {...formItemLayout} colon={false}>
                    <FormItem label="手机号:">
                        {getFieldDecorator("phone", {
                            rules: [
                                { required: true, message: "请输入" },
                                {
                                    pattern: /^1\d{10}$/,
                                    message: '请输入正确手机号',
                                }
                            ],
                            initialValue: isEdit ? phone : null,
                        })(<Input placeholder="请输入" />)}
                    </FormItem>
                    <FormItem label="密码:">
                        {getFieldDecorator("password", {
                            rules: [
                                { required: true, message: "请输入" },
                            ],
                            initialValue: isEdit ? password : null,
                        })(<Input placeholder="请输入" />)}
                    </FormItem>
                    <FormItem label="打卡类型:">
                        {getFieldDecorator("appType", {
                            rules: [
                                { required: true, message: "请输入" },
                            ],
                            initialValue: isEdit ? appType : null,
                        })(<Radio.Group >
                            <Radio value={1}>工学云</Radio>
                            <Radio value={2}>职校家园</Radio>
                          </Radio.Group>)}
                    </FormItem>
                    <FormItem label="剩余天数:">
                        {getFieldDecorator("clockDays", {
                            rules: [
                                { required: true, message: "请输入" },
                                {
                                    pattern: /^[0-9]*[1-9][0-9]*$/,
                                    message: '请输入正整数',
                                }
                            ],
                            initialValue: isEdit ? clockDays : null,
                        })(<Input placeholder="请输入" />)}
                    </FormItem>
                    <FormItem label="打卡日期:">
                        {getFieldDecorator("weeks", {
                            // rules: [
                            //     { required: true, message: "请输入" },
                            // ],
                            initialValue: isEdit ? weeks?weeks.split(','):null : null,
                        })(<Checkbox.Group
                            options={optionsWeeks}
                          />)}
                    </FormItem>
                    <FormItem label="打卡上午:">
                        {getFieldDecorator("clockAm", {
                            // rules: [
                            //     { required: true, message: "请输入" },
                            // ],
                            initialValue: isEdit ? clockAm==0?false:true : null,
                        })(<Checkbox/>)}
                        <span style={{marginLeft:'30px'}}>8:00-9:00</span>
                    </FormItem>
                    <FormItem label="打卡上午:">
                        {getFieldDecorator("clockPm", {
                            // rules: [
                            //     { required: true, message: "请输入" },
                            // ],
                            initialValue: isEdit ? clockPm==0?false:true : null,
                        })(<Checkbox/>)}
                        <span style={{marginLeft:'30px'}}>16:00-17:00</span>
                    </FormItem>
                    <FormItem label="详细地址:">
                        {getFieldDecorator("address", {
                            rules: [
                                { required: true, message: "请输入" },
                            ],
                            initialValue: isEdit ? address : null,
                        })(<Input placeholder="请输入" />)}
                    </FormItem>
                    <FormItem label="地址标记:">
                        {getFieldDecorator("address_mark", {
                            rules: [{ required: true, message: "请输入" }],
                            initialValue: isEdit
                                ? {
                                    longitude,
                                    latitude,
                                    province,
                                    city,
                                    district,
                                    mapAddress,
                                }
                                : { longitude: null, latitude: null },
                        })(<SelectMapForm />)}
                    </FormItem>

                </Form>

            </Modal>
        </div>
    }
}
export default Form.create()(AddStudent)