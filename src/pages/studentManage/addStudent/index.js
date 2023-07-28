import React from "react";
import SelectMapForm from '../selectMapForm/selectMapForm'
import '../index.less'
import { Modal, Form, Select, Button, Input } from 'antd'
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
            console.log(value,'value-------------------')
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
            mobile
        } = this.props.editData
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
                        {getFieldDecorator("mobile", {
                            rules: [
                                { required: true, message: "请输入" },
                                {
                                    pattern: /^1\d{10}$/,
                                    message: '请输入正确手机号',
                                }
                            ],
                            initialValue: isEdit ? mobile : null,
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