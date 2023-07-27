import React from 'react';
import { Form, Input, Button, message, Icon, Checkbox } from 'antd';
import http from "../../utils/http";
import { getRequest } from "../../utils/url";
import "./index.scss"
let timer = null;

class Register extends React.Component {
  state = {
    passwordInputType: "input",
    submitBtnLoading: false,
    count: 0,
    checked: true,
  }
  componentWillMount(){
    this.props.form.resetFields();
  }
  componentDidMount () {
    document.title = "注册";
    document.addEventListener("keydown", this.handleEnterKey);
  }
  componentWillUnmount () {
    window.clearInterval(timer);
    document.removeEventListener("keydown", this.handleEnterKey)
  }

  handleEnterKey = (e) => {
    if (e.keyCode === 13) {
      this.register();
    }
  }

  timerCount () {
    let { count } = this.state;
    timer = window.setInterval(() => {
      if (count > 0) {
        count--;
        this.setState({
          count
        });
      } else {
        timer = null;
        window.clearInterval(timer);
      }
    }, 1000)
  }

  // 获取验证码
  getSms = () => {
    let { count } = this.state;
    if (count > 0) {
      return;
    }
    // this.props.form.validateFields((err, fieldsValue) => {
    //   console.log(err, fieldsValue)
    // })
    const { getFieldValue } = this.props.form;
    
    let phone = getFieldValue("phone");
    
    let reg = /^[1-9]{1}[0-9]{10}$/
    if (!reg.test(phone)) {
      message.error("请输入正确手机号");
      return
    }
    console.log(phone)
    http({
      url: `/sso/code/phone/code?phone=${phone}`,
      method: "get",
      data: {
        phone
      }
    }).then(() => {
      this.setState({
        count: 60
      }, this.timerCount)
      message.success("验证码已发送");
    });
  }
  onChange = (e)=>{
    this.setState({
      checked: e.target.checked,
    })
  }

  register = () => {
    if(!this.state.checked){
      message.error("请阅读并同意用户协议、隐私政策")
      return
    }
    const { form, statusToggle } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return
      }
      const { code, phone, password } = fieldsValue;
      const urlQueryObj = getRequest();
      // console.log(urlQueryObj)
      let type="live-operation"
      // console.log(urlQueryObj,type)
      this.setState({
        submitBtnLoading: true
      });
      http({
        url: "/sso/account/register",
        method: "post",
        data: {
          code,
          phone,
          password,
          type: type
        },
        isFormData: true
      }).then(() => {
        this.setState({
          submitBtnLoading: false
        });
        message.success("注册成功，请登录");
        statusToggle("Login")
      }).catch(() => {
        this.setState({
          submitBtnLoading: false
        });
      })
    })
  }

  inputToPassword = () => {
    this.setState({
      passwordInputType: "password"
    });
  }

  render () {
    const { passwordInputType, count, submitBtnLoading } = this.state;
    const { form, statusToggle } = this.props
    const { getFieldDecorator } = form;
    return (
      <div className="register forget-password">
        <Form layout="vertical">
          <Form.Item>
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: '请输入手机号!' }],
            })(
              <Input size="large" maxLength={11} className="input" placeholder="手机号" />
            )}
          </Form.Item>
          <Form.Item>
            <div className="code-box">
              {getFieldDecorator('code', {
                rules: [{ required: true, message: '请输入短信验证码!' }],
              })(
                <Input size="large"  maxLength={6} className="input" placeholder="验证码" />
              )}

              <p onClick={this.getSms} className={"code-btn " + (count > 0 ? 'counting' : 'point')}>{count === 0 ? '获取验证码' : `${count}s后重新获取`}</p>
            </div>
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input.Password  className="input" size="large"  onFocus={this.inputToPassword} type={passwordInputType} placeholder="密码" />
            )}
          </Form.Item>
          {/* <Checkbox checked={this.state.checked}  onChange={this.onChange}>阅读并同意</Checkbox><span onClick={()=>{window.open("https://operation.hknet-inc.com/#/agreement",'target')}} style={{color:'#2663FF',marginLeft:'-6px', cursor: 'pointer'}}>用户协议、隐私政策</span> */}
        </Form>
        <div className="login_bottom">
          <Button loading={submitBtnLoading} onClick={this.register} className="submit-btn" type="primary">注册</Button>
          <div className="back-btn" onClick={() => statusToggle("Login")}><span style={{color:"#909399", marginRight:'8px'}}>已有账号?</span>立即登录</div>
        </div>
      </div>
    )
  }
}
export default Form.create({ name: 'register' })(Register);
