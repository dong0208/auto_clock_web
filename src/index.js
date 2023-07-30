import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router,Route,Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reduxStore from "./redux";
import LocalLogin from "./pages/login/index"
import PutPassword from './pages/PutPassword';
let store = createStore(reduxStore, applyMiddleware(thunk));

ReactDOM.render(
  <ConfigProvider locale={zh_CN}>
    <Provider store={store}>
      <Router>
      <Switch>
        <Route exact path="/login" component={LocalLogin} ></Route>
        <App />
        </Switch>
      </Router>
    </Provider>
  </ConfigProvider>, document.getElementById('root')
);

serviceWorker.unregister();
export default store