import React from 'react';
import { Form, Input, Button, message, Icon } from 'antd';
import "./index.scss";
import http from "../../utils/http";

let timer = null;

class ForgetPassword extends React.Component {
  state = {
    count: 0,
    submitBtnLoading: false,
    passwordInputType: "input",
  }

  componentDidMount() {
    // window.location.reload()
    // this.props.form.resetFields();
    document.title = "忘记密码";
    document.addEventListener("keydown", this.handleEnterKey);
  }
  componentWillUnmount () {
    window.clearInterval(timer);
    document.removeEventListener("keydown", this.handleEnterKey)
  }

  handleEnterKey = (e) => {
    if (e.keyCode === 13) {
      this.login();
    }
  }

  //获取验证码
  getSms = () => {
    let { count } = this.state;
    if (count > 0) {
      return;
    }
    const { getFieldValue } = this.props.form;
    let phone = getFieldValue("phone");
    let reg = /^[1-9]{1}[0-9]{10}$/
    if (!reg.test(phone)) {
      message.error("请输入正确手机号");
      return
    }
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

  inputToPassword = () => {
    this.setState({
      passwordInputType: "password"
    });
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
        window.clearInterval(timer);
      }
    }, 1000)
  }

   // 找回密码
   resetPsd = () => {
    const { form, statusToggle } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      } else {
        this.setState({
          submitBtnLoading: true
        })
        http({
          url: "/sso/account/forget/pwd",
          method: "post",
          data: {
            code: fieldsValue.code,
            phone: fieldsValue.phone,
            password: fieldsValue.newPsd
          },
          isFormData: true
        }).then(() => {
          this.setState({
            submitBtnLoading: false,
          });
          message.success("设置成功");
          statusToggle("Login")
        }).catch(() => {
          this.setState({
            submitBtnLoading: false
          })
        })
      }
    })
  }

  render () {
    const { submitBtnLoading, count, passwordInputType } = this.state;
    const { form, statusToggle } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="forget-password">
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
                rules: [{ required: true, message: '请输入短息验证码!' }],
              })(
                <Input size="large" className="input" placeholder="验证码" />
              )}

              <p onClick={this.getSms}
                className={"code-btn " + (count > 0 ? 'counting' : 'point')}>{count === 0 ? '获取验证码' : `${count}s后重新获取`}</p>
            </div>
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('newPsd', {
              rules: [{ required: true, message: '请输入新密码!' }],
            })(
              <Input.Password size="large" onFocus={this.inputToPassword} type={passwordInputType} className="input" placeholder="新密码" />
            )}
          </Form.Item>
        </Form>
        <div className="login_bottom">
          <Button loading={submitBtnLoading} onClick={this.resetPsd} className="submit-btn" type="primary">提交</Button>
          <div className="back-btn" onClick={() => statusToggle("Login")}>返回登录</div>
        </div>
      </div>
    )
  }
}

export default Form.create({ name: 'ForgetPassword' })(ForgetPassword);