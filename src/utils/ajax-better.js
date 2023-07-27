import axios from 'axios';
import * as qs from 'qs';
import md5 from "js-md5";
import { Base64 } from './base64'
import {getDevBaseUrl} from "./http"
import { httpConfig } from "../config/index";
import {sessionStorage,localStorage} from './storage'

const wrapInterceptors = (http, { isApijson, requestInterceptors, responseInterceptors, requestData, other }) => {
  // 请求拦截
  http.interceptors.request.use(req => {
    // get请求
    if (req.method === "get" && !isApijson && !requestData.params) {
      req.params = { ...req.data }
    }
    if(isApijson){
      req.headers['Content-Type'] = 'application/json'
    }
    // 兼容本地获取不到cookie
    const { host } = window.location;
    if(host.includes("localhost")){
      req.headers['sessionId'] = sessionStorage.get("localSession")
    }

    if (requestInterceptors) requestInterceptors({ ...req, isApijson });
    return req;
  });
  // 响应拦截
  http.interceptors.response.use(res => {
    const { data } = res;
    return Promise.resolve({ data });
  }, (error) => {
    return Promise.reject(JSON.stringify(error))
  });
  return http;
}
function axiosInstance ({ isApijson, baseURL, other, requestInterceptors, responseInterceptors, requestData }) {
  return wrapInterceptors(axios.create({
    baseURL,
    timeout: 30000,
    withCredentials: true,
  }), { isApijson, requestInterceptors, responseInterceptors, other, requestData });
}


function ajaxBetter ({
  url,
  method,
  isFormData = false,
  isFileUpload = false,
  data,
  params,
  isApijson = false,

  queryportAppSecert,
  queryportAppkey,
  queryportAppType,
  baseURL,

  ...other
}, requestInterceptors, responseInterceptors) {
  return new Promise((resolve, reject) => {
    let requestData = {
      url,
      method,
      data,
      params
    }
    if (method === "post" && isFormData) {
      requestData.data = qs.stringify({ ...data });
    }

    if (method === "post" && isFileUpload) {
      let formData = new FormData()
      for (let props in requestData.data) {
        formData.append(props, requestData.data[props])
      }
      requestData.data = formData
    }
    if (isApijson) {
      // 加密
      let sercerData = JSON.stringify(requestData.data)
      if (getDevBaseUrl() == httpConfig.api_publish || httpConfig.encrypt) {
        sercerData = requestData.data = Base64.encode(JSON.stringify(requestData.data))
      }
      const sign = md5(`${queryportAppSecert}:${sercerData}:${queryportAppSecert}`);
      
      requestData.url = `${url}?appkey=${queryportAppkey}&sign=${sign}${queryportAppType ? `&appType=${queryportAppType}`: ""}${ getDevBaseUrl() == httpConfig.api_publish || httpConfig.encrypt ? '&encryptType=default':''}`;
      requestData.method = method || "post";
    }
    axiosInstance({ isApijson, requestInterceptors, responseInterceptors, baseURL, requestData, other })(requestData).then(resolve).catch(reject)
  });
}

ajaxBetter.create = function ({
  queryportAppSecert,
  queryportAppkey,
  queryportAppType,
  baseURL
}, requestInterceptors) {
  return function () {
    return ajaxBetter({
      ...arguments[0],
      queryportAppSecert,
      queryportAppkey,
      queryportAppType,
      baseURL
    }, requestInterceptors)
  }
}



export default ajaxBetter;