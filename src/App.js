import React from "react";
import "./App.less";
import { HashRouter as Router, Route, Switch ,} from 'react-router-dom';
import Header from "./components/Header";
import { loginCheckApi } from "./authorityApi/login";
import { goLogin } from "./config";
import { connect } from 'react-redux';
import NotFound from "./pages/notFound";
import routeConfig from "./router/config";
import LeftMenu from "./components/LeftMenu";
import { adminMenuList, normalMenuList } from "./components/menuList";
import PutPassword from "./pages/PutPassword";
import { Spin} from 'antd'
const routeArrayFlat = routeArray => routeArray.reduce((pre, current) => (current.child && current.child.length) ? pre.concat(routeArrayFlat(current.child)) : pre.concat(current), [])
class App extends React.Component {
  componentWillMount() {
    loginCheckApi().then((res) => {
      if (res.code == 200) {
        const { entry: { userId, type,mobilePhone } } = res
        this.props.saveUserInfo({
          userId,
          type,
          mobilePhone
        });
        this.props.hidePageLoading()
      }
    }).catch((err) => {
      console.log(err)
      goLogin()
    })
  }
  render() {
    const {userInfo:{type},pageLoading} = this.props
    const menuList = Object.create(type==0?adminMenuList:normalMenuList)
    if(pageLoading){return <div className="page-loading"><Spin/></div>}
    return <div className="app-wrapper">
        
        <Route exact path='/put/password' component={PutPassword}></Route>
        <div className="app-main">
            <div className="left-menu">
              <LeftMenu />
            </div>
            <div className="right_wrapper">
              <Header />
              <div className="right-content">
                <Router>
                  <Switch>
                    {
                      routeArrayFlat(menuList).map(({ id, route }) => {
                        return <Route key={id} exact path={route} component={routeConfig[route]} />
                      })
                    }
                    <Route component={NotFound} />
                  </Switch>
                </Router>
              </div>
            </div>
        </div>
    </div>
  }
}
const mapStateToProps = ({ userInfoReducer,pageLoadingReducer }) => {
  return {
    userInfo: userInfoReducer,
    pageLoading: pageLoadingReducer
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch,
    saveUserInfo: data => dispatch({ type: "saveUserInfo", data }),
    hidePageLoading: data => dispatch({ type: "hidePageLoading", data }),
    saveDomainInfo: data => dispatch({ type: "saveDomainInfo", data }),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
