import React from 'react';
import "./index.scss"
import { Form, Input, Button, message, Icon, Checkbox } from 'antd';
import http from "../../utils/http";
import history from '../../utils/history';
import { connect } from 'react-redux';

class PutPassword extends React.Component {
  state = {
    submitBtnLoading: false,
    checked: true,
    isLogin: true
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
        const { password } = fieldsValue;
        this.setState({
          submitBtnLoading: true
        });
        const { userInfo: { userId } } = this.props
        console.log(this.props)
        http({
          url: "/xue/web/updatePassword",
          method: "post",
          isFormData: true,
          data: {
            id: userId,
            password,
          }
        }).then((res) => {
          if (res.code == 200) {
            this.setState({
              submitBtnLoading: false
            })
            history.push("/student/manage")
          }


        }).catch(() => {
          this.setState({
            submitBtnLoading: false
          })
        });
      }
    });
  }




  render() {
    const { submitBtnLoading } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (

      <div className="put-passward">
        <div className="container">
          <div className="main">
            <div className="login">
              <Form layout="vertical">
                <Form.Item label="新密码:">
                  {getFieldDecorator("password", {
                    rules: [
                      { required: true, message: "请输入" },
                    ],
                  })(<Input.Password
                    size="large"
                    type="password"
                    className="input"
                    placeholder="请输入新密码"
                  />)}
                </Form.Item>
                {/* <Form.Item label="新密码">
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
                  </Form.Item> */}
              </Form>
            </div>
            <div className="login_bottom">
              <Button type="primary" loading={submitBtnLoading} onClick={this.login} className="submit-btn">登录</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ userInfoReducer }) => {
  return {
    userInfo: userInfoReducer,
  }
}
export default connect(
  mapStateToProps,
)(Form.create()(PutPassword));
