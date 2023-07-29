import React from 'react';
import "./index.scss"
import { Form, Input, Button, message, Icon, Checkbox } from 'antd';
import http from "../../utils/http";
import history from '../../utils/history';
import {sessionStorage,localStorage} from '../../utils/storage'
import ForgetPassword from "../forgetPassword";
import Register from "../register";
import { getRequest, IsURL } from "../../utils/url";


class Login extends React.Component {
  state = {
    submitBtnLoading: false,
    checked: true,
    isLogin:true
  }
  componentWillMount () {
    const urlQueryObj = getRequest();
    this.redirectUrl = urlQueryObj.redirectUrl;
    this.appType = urlQueryObj.appType; // 必传
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
    // const { form } = this.props;
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
        http({
          url: "/xue/web/login",
          method: "post",
          isFormData: true,
          data: {
            password,
            phone,
          }
        }).then((res) => {
          if(res.code==200){
            this.setState({
              submitBtnLoading: false
            })
            sessionStorage.devSet('localSession',res.entry.sessionId)
            history.push("/student/manage")
          }
          
          
        }).catch(() => {
          this.setState({
            submitBtnLoading: false
          })
          sessionStorage.remove('localSession')
        });
      }
    });
  }


  onChange = (e)=>{
    this.setState({
      checked: e.target.checked,
    })
  }
  statusToggle = type => {
    this.setState({
      isLogin: false,
      isForgetPassword: false,
      isRegiter: false,
      [`is${type}`]: true,
    },()=>{
      this.props.form.resetFields();
    })
  }
   // 账户设置提交后处理
   handleUserCenterSubmit = ({
    type
  }) => {
    if (type === "changePassword") {
      this.service = "login"; // 此时应用服务状态是登录 
      this.setState({
        showLogin: true,
        showUserCenter: false
      });
    } else if (type === "domainConfig") {
      window.location.replace("/");
    }
  }
  render () {
    const { submitBtnLoading ,isLogin,isForgetPassword,isRegiter} = this.state;
    // const { form, statusToggle, appType } = this.props;
    const { form, statusToggle } = this.props;
    const { getFieldDecorator } = form;
    return (

      <div className="login-server-page-two">
        <div className="container">  
          <div className="main">
          { isLogin &&   <div className="welcome">欢迎登录</div>}
            { isForgetPassword &&   <div className="welcome">找回密码</div>}
            { isRegiter &&  <div className="welcome">欢迎注册</div>}
            {isLogin&&<div>
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
        </div>
        <div className="login_bottom">
          <Button type="primary" loading={submitBtnLoading} onClick={this.login} className="submit-btn">登录</Button>
        </div></div>}
          </div>
        </div>
      </div>
    )
  }
}
export default Form.create({ name: 'login' })(Login);
