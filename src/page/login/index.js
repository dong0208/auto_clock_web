import React from 'react';
import "./index.scss"
import { Form, Input, Button, message, Icon, Checkbox } from 'antd';
import http from "../../utils/http";
import history from '../../utils/history';
import {sessionStorage,localStorage} from '../../utils/storage'

class Login extends React.Component {
  state = {
    submitBtnLoading: false,
    checked: true
  }

  componentDidMount () {
    document.title = "登录"
    document.addEventListener("keydown", this.handleEnterKey);
  }
  componentWillUnmount () {
    document.removeEventListener("keydown", this.handleEnterKey)
  }

  handleEnterKey = (e) => {
    if (e.keyCode === 13) {
      this.login();
    }
  }

  //登陆
  login = () => {
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      } else {
        const { phone, password } = fieldsValue;
        let reg = /^[1-9]{1}[0-9]{10}$/
        if (!reg.test(phone)) {
          message.error("请输入正确手机号");
          return
        }
        this.setState({
          submitBtnLoading: true
        });
        // http({
        //   url: "/sso/app/login",
        //   method: "post",
        //   isFormData: true,
        //   data: {
        //     password,
        //     phone,
        //     type: "loginCenter"
        //   }
        // }).then((res) => {
        //   this.setState({
        //     submitBtnLoading: false
        //   })
        //   sessionStorage.devSet('localSession',res.sessionId)
        //   history.push("/home")
        // }).catch(() => {
        //   this.setState({
        //     submitBtnLoading: false
        //   })
        //   sessionStorage.remove('localSession')
        // });
      }
    });
  }


  onChange = (e)=>{
    this.setState({
      checked: e.target.checked,
    })
  }

  render () {
    const { submitBtnLoading } = this.state;
    const { form, statusToggle, appType } = this.props;
    const { getFieldDecorator } = form;
    return (

      <div className="login-server-page-two">
        <div className="container">  
          <div className="main">
            <img className="icon-logo-header" src="https://imagesize.hknet-inc.com/sp/files/4155d0b3-f094-44cb-891c-78f7fcbd6d74.png"/>
            <div className="welcome">欢迎登录,开发环境!</div>
            <div className="login">
                <Form layout="vertical">
                  <Form.Item>
                    {getFieldDecorator('phone', {
                      rules: [{ required: true, message: '请输入手机号!' }],
                    })(
                      <Input size="large" maxLength={11} className="input" placeholder="手机号" />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: '请输入密码!' }],
                    })(
                      <Input.Password 
                        size="large" 
                        type="password" 
                        className="input" 
                        placeholder="密码" 
                      />
                    )}
                  </Form.Item>
                </Form>
                <Button type="primary" loading={submitBtnLoading} onClick={this.login} className="submit-btn">登录</Button>
              </div>
          </div>
        </div>
        <img className="login-right"  onClick={()=>{window.open("https://www.syoo.cn",'target')}} src="https://imagesize.hknet-inc.com/sp/files/aa122e92-b1b2-491c-ae09-9f9959423d90.png" alt="" />
      </div>
    )
  }
}
export default Form.create({ name: 'login' })(Login);
