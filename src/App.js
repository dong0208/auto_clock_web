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
import menuList from "./components/menuList";
const routeArrayFlat = routeArray => routeArray.reduce((pre, current) => (current.child && current.child.length) ? pre.concat(routeArrayFlat(current.child)) : pre.concat(current), [])
class App extends React.Component {
  componentWillMount() {
    // goLogin()
  }
  render() {
    return <div className="app-wrapper">
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
                    console.log(id,route,'-----------------')
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
