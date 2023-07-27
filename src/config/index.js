import { createHashHistory } from "history"; 
const history = createHashHistory();
/**
 * 本地请求正式库: 需将httpConfig 和 loginConfig 对应的日常地址修改为gray的请求地址
 * 本地停用加密模式: httpConfig.encrypt 设为false
 */

const httpConfig = {
  api_daily: "http://daily.hknet-inc.com",
  api_gray: "https://gray.hknet-inc.com",
  api_publish: "https://web.hknet-inc.com",
  encrypt: false
}

const queryportConfig = {
  queryportAppSecert: "5f799f787c15c374ed1addcd91894215",
  queryportAppkey: "12610511",
  queryportAppType: "operator",
}

const loginConfig = {
  daily: "http://dailym.hknet-inc.com/hknet/login/index.html?appType=operator&service=login",
  gray: "https://graym.hknet-inc.com/hknet/login/index.html?appType=operator&service=login",
  publish: "https://m.hknet-inc.com/hknet/login/index.html?appType=operator&service=login",
}
const userCenterConfig = {
  daily: "http://dailym.hknet-inc.com/hknet/login/index.html?appType=operator&service=userCenter",
  gray: "https://graym.hknet-inc.com/hknet/login/index.html?appType=operator&service=userCenter",
  publish: "https://m.hknet-inc.com/hknet/login/index.html?appType=operator&service=userCenter"
}

function goLogin () {
  const redirectUrl = window.encodeURIComponent(window.location.href);
  const { host } = window.location;
  if(host.includes("localhost")){//本地登录兼容
    history.push("/login")
  }else{
    window.location.replace(loginConfig[`${process.env.HTTP_ENV}`] + `&redirectUrl=${redirectUrl}`);
  }
}

function goUserCenter () {
  const redirectUrl = window.encodeURIComponent(window.location.href);
  window.location.href = userCenterConfig[`${process.env.HTTP_ENV}`] + `&redirectUrl=${redirectUrl}`;
}

// 门店平台地址
const sellerUrlConfig = {
  daily: "http://daily.seller.hknet-inc.com",
  gray: "http://gray.seller.hknet-inc.com",
  publish: "http://seller.hknet-inc.com"
}

const { NODE_ENV, HTTP_ENV: httpEnv } = process.env;
const isEnvDevelopment = NODE_ENV === 'development';

const itemCookCompany=[7,10605]
export {
  httpConfig,
  queryportConfig,
  goLogin,
  goUserCenter,
  sellerUrlConfig,
  isEnvDevelopment,
  httpEnv,
  itemCookCompany
}