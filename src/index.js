import React from 'react';
import ReactDOM from 'react-dom';// import './index.less';
import App from './App';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reduxStore from "./redux/reducer";
let store = createStore(reduxStore, applyMiddleware(thunk));
ReactDOM.render(
  <LocaleProvider locale={zh_CN}>
    <Provider store={store}>
      <App />
    </Provider>
  </LocaleProvider>,
  document.getElementById('root')
);