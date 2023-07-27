import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, Icon } from 'antd';
import "./index.less";
class HomePage extends PureComponent {
  constructor(props) {
    super(props);
    this.selectShopId = undefined;
  }
  state = {
    shopList: [],
  }
  componentDidMount() {
  }
  render(){
    return(
      <div className="content-main">
        <Breadcrumb>
          <Breadcrumb.Item>欢迎来首页    <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" /></Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}
const mapStateToProps = ({ companyInfoReducer, userInfoReducer }) => {
  return {
    companyInfo: companyInfoReducer,
    userInfo: userInfoReducer
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch,
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);