import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import LeftMenu from "./components/LeftMenu";
import routeConfig from "./router/config";
import NewGood from './pages/newGood';
import SendLimit from './pages/sendlimit';
import { connect } from 'react-redux';
import ResultPage from "./components/ResultPage";

const NotFound = () => <ResultPage status="404" title="404" subTitle="页面不存在" />

// 把 child 数组形式 解析 层单列
const routeArrayFlat = routeArray => routeArray.reduce((pre, current) => (current.child && current.child.length) ? pre.concat(routeArrayFlat(current.child)) : pre.concat(current), [])

class AppMain extends React.Component {
  render () {
    const { menuList } = this.props;
    return (
      <div className="app-main">
        <div className="left-menu">
          <LeftMenu />
        </div>
        <div className="right-content">
          <Router>
            <Switch>
              {
                routeArrayFlat(menuList).map(({ id, route }) => <Route key={id} exact path={route} component={routeConfig[route]} />)
              }
              {/* 一下路由不在菜单表，需要在此加 */}
              <Route path="/goodsManage/goodsList/newGood/:id/:itemStatus" exact component={NewGood}></Route>
              <Route path="/shopManage/sendLimit" exact component={SendLimit}></Route>
              <Route component={NotFound} />
            </Switch>
          </Router>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ menuReducer }) => {
  return {
    menuList: menuReducer,
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
)(AppMain);