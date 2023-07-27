import { createHashHistory } from "history"; 
const history = createHashHistory();

const httpConfig = {
  api_daily: "https://daily.hknet-inc.com",
  api_publish: "https://web.qejs.tencent-cloud.com",
  encrypt: false
}

const queryportConfig = {
  s: "5f799f787c15c374ed1addcd91894215",//queryportAppSecert
  k: "12610511",//queryportAppkey
  t: "shoper"//queryportAppType
}

const loginConfig = {
  daily: "https://dailym.hknet-inc.com/hknet/login/index.html?appType=topbusiness&service=login",
  publish: "https://pages.qejs.tencent-cloud.com/hknet/jishi-login/index.html?appType=topbusiness&service=login",
}
const userCenterConfig = {
  daily: "https://dailym.hknet-inc.com/hknet/login/index.html?appType=topbusiness&service=userCenter",
  publish: "https://pages.qejs.tencent-cloud.com/hknet/jishi-login/index.html?appType=topbusiness&service=userCenter"
}

function goLogin () {
  const redirectUrl = window.encodeURIComponent(window.location.href);
  const { host } = window.location;
  if(host.includes("localhost")){//本地登录兼容
    history.push("/login")
  }else{
    // window.location.replace(loginConfig[`${process.env.HTTP_ENV}`] + `&redirectUrl=${redirectUrl}`);
    history.push("/login")
  }
}

function goUserCenter () {
  const redirectUrl = window.encodeURIComponent(window.location.href);
  window.location.href = userCenterConfig[`${process.env.HTTP_ENV}`] + `&redirectUrl=${redirectUrl}`;
}

const { NODE_ENV, HTTP_ENV: httpEnv } = process.env;
const isEnvDevelopment = NODE_ENV === 'development';

const operatorUrlConfig = {
  daily: "https://dailym.hknet-inc.com/hknet/jishi-operation/index.html",
  publish: "https://pages.qejs.tencent-cloud.com/hknet/jishi-operation/index.html"
}

// apijson请求返回结构处理同普通请求
const apijsonUrlEqualCommon = ["/queryport/excel/submitExportTask", "/queryport/excel/download"]

// apijson直接返回不判断结果
const apijsonUrlImmediateBack = ["/queryport/betch", "/queryport/detect"]
export {
  httpConfig,
  queryportConfig,
  goLogin,
  goUserCenter,
  isEnvDevelopment,
  httpEnv,
  operatorUrlConfig,
  apijsonUrlEqualCommon,
  apijsonUrlImmediateBack
}