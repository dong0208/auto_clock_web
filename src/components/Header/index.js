import * as React from 'react';
import { Dropdown, Menu, Icon } from "antd";
import { Link } from 'react-router-dom';
import "./index.less";
import http from "../../utils/http";
import { goLogin, goUserCenter } from "../../config";
import { connect } from 'react-redux';
import { changeAction } from "../../redux/actions/changeAction";

class Header extends React.Component {
  state = {
    isShowOpenShopDialog: false
  }
  // 退出登录
  loginOut = () => {
    // http({
    //   url: "/sso/app/logout",
    //   method: "post",
    // }).then(() => {
      goLogin()
    // })
  }


  userMenu = () => <Menu>
    {/* <Menu.Item onClick={goUserCenter}>账户设置</Menu.Item> */}
    {/* <Menu.Item onClick={this.showShopOpenDialog}>开通门店</Menu.Item> */}
    <Menu.Item onClick={this.loginOut}>退出登录</Menu.Item>
  </Menu>

  hideShopOpenDialog = () => this.setState({ isShowOpenShopDialog: false })
  showShopOpenDialog = () => this.setState({ isShowOpenShopDialog: true })

  render () {
    const { isShowOpenShopDialog } = this.state;
    const { userInfo: { userName, mobilePhone, avatarUrl },  } = this.props;
    return (
      <div className="app-header">
        <div className='header-menu'></div>

        <div className="user-info">
          <Dropdown overlay={this.userMenu()}>
            <div style={{display: 'flex', cursor: "pointer"}}>
              <img className="user-avater" alt="" src={avatarUrl || "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"} />
              <div className="user-name">{userName || mobilePhone||'hello'}</div>
            </div>
          </Dropdown>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ userInfoReducer, shopInfoReducer, shopListReducer }) => {
  return {
    userInfo: userInfoReducer,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);