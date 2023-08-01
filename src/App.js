import React from "react";
import "./App.less";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Header from "./components/Header";
import { loginCheckApi } from "./authorityApi/login";
import { goLogin } from "./config";
import { connect } from 'react-redux';
import NotFound from "./pages/notFound";
import routeConfig from "./router/config";
import LeftMenu from "./components/LeftMenu";
import { adminMenuList, normalMenuList } from "./components/menuList";
import PutPassword from "./pages/PutPassword";
const routeArrayFlat = routeArray => routeArray.reduce((pre, current) => (current.child && current.child.length) ? pre.concat(routeArrayFlat(current.child)) : pre.concat(current), [])
class App extends React.Component {
  componentWillMount() {
    // loginCheckApi().then((res) => {
    //   if (res.code == 200) {
    //     const { entry: { userId, type } } = res
    //     this.props.saveUserInfo({
    //       userId,
    //       type
    //     });
    //   }
    // }).catch((err) => {
    //   console.log(err)
    //   goLogin()
    // })
  }
  render() {
    const menuList = Object.create(adminMenuList)
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
const mapStateToProps = ({ userInfoReducer }) => {
  return {
    userInfo: userInfoReducer,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch,
    saveUserInfo: data => dispatch({ type: "saveUserInfo", data }),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
