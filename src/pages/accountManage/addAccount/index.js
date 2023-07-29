import React from "react";
import { Modal, Form, Select, Input } from 'antd'
import { connect } from 'react-redux'
import { submitAccountApi, editAccountApi } from './api'
import './index.less'
import { message } from "antd";
import { Switch } from "antd";
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
class AddAccount extends React.Component {
    state = {
    }
    handleOk = () => {
        this.props.form.validateFields(async (err, value) => {
            const { userInfo: { userId }, isEdit, editData } = this.props
            let res = {}
            if (isEdit) {
                const { createId, id } = editData
                try {
                    res = await editAccountApi({
                        ...value,
                        accountStatus: value.accountStatus ? 1 : 0,
                        createId,
                        id
                    })
                } catch (err) {
                    console.log(err)
                }
            } else {
                res = await submitAccountApi({
                    ...value,
                    type: 1,
                    createId: userId,
                    accountStatus: value.accountStatus ? 1 : 0
                })
            }

            if (res.code == 200) {
                message.success(isEdit ? '修改成功' : '添加成功')
                this.props.cancelVisible && this.props.cancelVisible()
            }
        });
    }
    handleCancel = () => {
        const { cancelVisible } = this.props
        cancelVisible()
    }
    render() {
        const { visible, isEdit,
            editData: {
                phone,
                gongClockDays,
                zhiClockDays,
                password,
                accountStatus
            } } = this.props
        const { getFieldDecorator } = this.props.form;
        console.log(this.props.editData)
        return <div>
            <Modal
                title="添加账号"
                visible={visible}
                maskClosable={false}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                centered={true}
                width={600}
                bodyStyle={{ height: 600, overflowY: 'scroll' }}
            >
                <Form {...formItemLayout} colon={false} className="account-modal">
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
                        })(<Input placeholder="请输入" disabled={isEdit ? true : false} />)}
                    </FormItem>
                    <FormItem label="密码:">
                        {getFieldDecorator("password", {
                            rules: [
                                { required: true, message: "请输入" },
                            ],
                            initialValue: isEdit ? password : null,
                        })(<Input type="password" placeholder="请输入" />)}
                    </FormItem>
                    <FormItem label="账号状态:">
                        {getFieldDecorator("accountStatus", {
                            rules: [
                                { required: true, message: "请输入" },
                            ],
                            initialValue: isEdit ? accountStatus == 0 ? false : true : null,
                            valuePropName: "checked"
                        })(<Switch />)}
                    </FormItem>
                    <FormItem label="剩余天数(工学云):">
                        {getFieldDecorator("gongClockDays", {
                            rules: [
                                { required: true, message: "请输入" },
                                {
                                    pattern: /^[0-9]*[1-9][0-9]*$/,
                                    message: '请输入正整数',
                                }
                            ],
                            initialValue: isEdit ? gongClockDays : null,
                        })(<Input placeholder="请输入" />)}
                    </FormItem>
                    <FormItem label="剩余天数(职校家园):">
                        {getFieldDecorator("zhiClockDays", {
                            rules: [
                                { required: true, message: "请输入" },
                                {
                                    pattern: /^[0-9]*[1-9][0-9]*$/,
                                    message: '请输入正整数',
                                }
                            ],
                            initialValue: isEdit ? zhiClockDays : null,
                        })(<Input placeholder="请输入" />)}
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
)(Form.create()(AddAccount));
