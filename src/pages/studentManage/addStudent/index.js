import React from "react";
import SelectMapForm from '../selectMapForm/selectMapForm'
import '../index.less'
import {connect} from 'react-redux'
import { Modal, Form, Select, Button, Input,Checkbox,Radio } from 'antd'
import {submitStudentApi,editStudentApi} from './api'
import { message } from "antd";
import history from "../../../utils/history";
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
            const {userInfo:{userId},isEdit,editData} = this.props
            console.log(value)
            if(!err){
                let obj = {
                    country:'中国',
                    createId:userId,
                    ...value,
                    ...value.address_mark,
                    area:value.address_mark.district,
                    clockAm:value.clockAm?1:0,
                    clockPm:value.clockPm?1:0,
                    weeks:value.weeks.length>0?JSON.stringify(value.weeks):null
                }
                if(isEdit){
                    editStudentApi({
                        ...obj,
                        id:editData.id
                    }).then((res)=>{
                        if(res.code==200){
                            const { cancelVisible } = this.props
                            message.success('修改成功')
                            cancelVisible()
                        }
                    })
                }else {
                    submitStudentApi(obj).then((res)=>{
                        if(res.code==200){
                            const { cancelVisible } = this.props
                            message.success('添加成功')
                            cancelVisible()
                        }
                    })
                }
                
            }
        });
    }
    handleCancel = () => {
        const { cancelVisible } = this.props
        cancelVisible()
    }
    goPushKey = ()=>{
        history.push('https://www.pushplus.plus/','_black')
    }
    render() {
        const { visible ,isEdit} = this.props
        const { getFieldDecorator,getFieldValue } = this.props.form;
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
            address,
            pushKey
        } = this.props.editData
    
        const optionsWeeks = [
            { value: 1, label: '周一' },
            { value: 2, label: '周二' },
            { value: 3, label: '周三' },
            { value: 4, label: '周四' },
            { value: 5, label: '周五' },
            { value: 6, label: '周六' },
            { value: 7, label: '周日' },
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
                        })(<Input placeholder="请输入" disabled={isEdit?true:false} />)}
                    </FormItem>
                    <FormItem label="密码:">
                        {getFieldDecorator("password", {
                            rules: [
                                { required: true, message: "请输入" },
                            ],
                            initialValue: isEdit ? password : null,
                        })(<Input.Password placeholder="请输入" />)}
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
                    <FormItem label="微信推送token:">
                        {getFieldDecorator("pushKey", {
                            rules: [
                                { required: false, message: "请输入" },
                            ],
                            initialValue: isEdit ? pushKey : null,
                        })(<Input placeholder="请输入" />)}
                        <a href='https://www.pushplus.plus/' target="_blank">https://www.pushplus.plus/</a>
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
                            initialValue: isEdit ? weeks?JSON.parse(weeks):[] : [],
                        })(<Checkbox.Group
                            options={optionsWeeks}
                          />)}
                    </FormItem>
                    <FormItem label="打卡上午:">
                        {getFieldDecorator("clockAm", {
                            rules: [
                                { required: false, message: "请输入" },
                                {
                                    validator:function (rule, value, callback){
                                        const weeksValue = getFieldValue('weeks')
                                        if(weeksValue.length==0){
                                            callback('请选择打卡日期')
                                        }
                                        callback()
                                    }
                                }
                            ],
                            valuePropName: "checked",
                            initialValue: isEdit ? clockAm==0?false:true : false,
                        })(<Checkbox/>)}
                        <span style={{marginLeft:'30px'}}>8:00-9:00</span>
                    </FormItem>
                    <FormItem label="打卡下午:">
                        {getFieldDecorator("clockPm", {
                            rules: [
                                {
                                    validator: (rule, value, callback)=>{
                                        const weeksValue = getFieldValue('weeks')
                                        if(weeksValue.length==0){
                                            callback('请选择打卡日期')
                                        }
                                        callback()
                                    }
                                }
                            ],
                            initialValue: isEdit ? clockPm==0?false:true : false,
                            valuePropName: "checked"
                        })(<Checkbox/>)}
                        <span style={{marginLeft:'30px'}}>18:00-19:00</span>
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

const mapStateToProps = ({ userInfoReducer }) => {
    return {
      userInfo: userInfoReducer,
    }
}
export default connect(
    mapStateToProps,
  )(Form.create()(AddStudent));
