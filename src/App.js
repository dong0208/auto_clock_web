import React from 'react';
import "./App.less";
import { Spin, Icon ,message, Input} from "antd";
import { loginCheckApi } from "./authorityApi/login";
import { goLogin } from "./config";
import { connect } from 'react-redux';
import LeftMenu from "./components/LeftMenu";
import Header from "./components/Header";
import { changeAction } from "./redux/actions/changeAction";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from "./pages/notFound";
import routeConfig from "./router/config";
import specialOffer from "./pages/market/specialOffer"
import activityList from './pages/market/activityList';
import activityConfig from './pages/market/activityConfig';
import Addactive from "./pages/market/specialOffer/components/addActive"
import CouponsSort from "./pages/commodityCategory/components/CouponsSort"
import NewBrand from './pages/brandlandingPage/components/newBrand'
import LiveItem from './pages/liveManagement/components/liveItem';
import UploadVideo from './pages/video/components/UploadVideo/index'
import ApplyJoin from './pages/ApplyJoin/index'
import history from './utils/history'
import http from './utils/newHttp';
// import { createHashHistory } from "history"; 
// const history = createHashHistory();
const routeArrayFlat = routeArray => routeArray.reduce((pre, current) => (current.child && current.child.length) ? pre.concat(routeArrayFlat(current.child)) : pre.concat(current), [])

class App extends React.Component {
state={
  authorInfoStatus:'',
}
  componentWillMount () {
    // 1. 首先登录检查，没有登录跳登录平台
    loginCheckApi().then(res => {
      console.log(res,'res')
      const userId = res.userId;
      // 已登录，保存用户信息
      this.props.saveUserInfo({
        userId:res.userId,
        userName: res.userName,
        mobilePhone: res.mobilePhone,
        avatarUrl: res.avatarUrl
      });
    
      this.props.dispatch(changeAction({ userId: res.userId }))   
      // this.getId(res.userId)    
      // this.props.hidePageLoading();
      // 没有登录跳登录平台
    }).catch((res) => {
      history.push("/login")
    })
   
  }
  // getId =(userId)=>{
  //   console.log(userId,"id")
  //   let APIJSON ={
  //     "@token":"40b3c478-6329-409f-915f-cdf4125fe51e",
  //     "[]": {
  //       "author_info": {
  //         "@schema": "zhibo",
  //         "is_deleted":0,
  //         "ownBy":userId
  //       },
  //       "operation_user":{
  //         "@schema": "auth",
  //         "business_data@":"[]/author_info/id",
  //         "login_app":"live_anchor",
  //         "@column":"status"
  //       }
  //     },
  //     "total@": "/[]/total"
  //   }
  //   http({
  //       url: '/queryport/get',
  //       isApijson: true,
  //       data: APIJSON
  //     }).then((res)=>{
  //       console.log(res)
  //       if(res.code==200){

  //         if(res["[]"]&&res["[]"].length>0){
  //           this.setState({
  //             authorInfoStatus:true,
  //           },()=>{
  //             console.log(this.state.authorInfoStatus,"状态")
  //           })
            
  //         }else{
  //           this.setState({
  //             authorInfoStatus:false,
  //           },()=>{
  //             console.log(this.state.authorInfoStatus,"状态")
  //           })
  //         }
  //       }
  //     })
    
  // }

  render () {
    const { pageLoading, menuList ,userInfo,authorInfoStatus} = this.props;
    console.log(userInfo)
    // if (pageLoading) return <div className="page-loading"><Spin /></div>;
    // if((userInfo.login_app&&userInfo.status ==3)|| (userInfo.login_app&&userInfo.status == 4)) return <ApplyStatus />
    // if (!userInfo.status) return <Join />
    
    return (
      <div className="app-wrapper">
        <div className="app-main">
          <div className="left-menu">
            <LeftMenu />
          </div>
          <div className="right_wrapper">
            <Header />
            <div className="right-content">
              <Input size='large'/>
            </div>
            {/* <div className="app-footer"> <Icon type="copyright" />2022 诸暨市公益直播项目</div> */}
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ shopInfoReducer, userInfoReducer, shopListReducer, pageLoadingReducer, menuReducer }) => {
  return {
    shopInfo: shopInfoReducer,
    userInfo: userInfoReducer,
    shopList: shopListReducer,
    menuList: menuReducer,
    pageLoading: pageLoadingReducer
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch,
    saveUserInfo: data => dispatch({ type: "saveUserInfo", data }),
    hidePageLoading: data => dispatch({ type: "hidePageLoading", data }),
    saveShopList: data => dispatch({ type: "saveShopList", data }),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
// 审核详情
function ApplyStatus() {
  return (
    <div className="app-wrapper2">
      <Header />
      <div className="apply-status-box">
        <Router>
          <Switch>
            <Route path="/" component={ApplyJoin} />
          </Switch>
        </Router>
      </div>
    </div>
  )
}

// 开通
function Join() {
  console.log("开通")
  return (
    <div className="app-wrapper2">
      <Header />
      <div className="apply-status-box">
        <Router>
          <Switch>
            <Route exact path="/" component={ApplyJoin} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    </div>
  )
}
