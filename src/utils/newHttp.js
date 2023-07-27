import ajax from "./ajax-better"
import { httpConfig, queryportConfig, goLogin, apijsonUrlEqualCommon, apijsonUrlImmediateBack } from "../config";
import { message } from "antd";
import { Base64 } from './base64'
import {getDevBaseUrl} from "./http"
function createAjax () {
  return ajax.create({
    baseURL: httpConfig[`api_${process.env.HTTP_ENV}`],//process.env.HTTP_ENV === 'publish'?httpConfig[`api_${process.env.HTTP_ENV}`]:'',
    queryportAppSecert: queryportConfig.s,
    queryportAppkey: queryportConfig.k,
    queryportAppType: queryportConfig.t
  });
}

function http ({
  url,
  method,
  isFormData = false,
  isFileUpload = false,
  data,
  params,
  isApijson = false,
  hideErrorMessage = false,
}) {
  return new Promise((resolve, reject) => {
    createAjax()({
      url,
      method,
      isFormData,
      isFileUpload,
      data,
      params,
      isApijson,
    }).then(res => {
      let { data } = res;
      //解密   
      if ((getDevBaseUrl() == httpConfig.api_publish || httpConfig.encrypt) && isApijson) {
        data = JSON.parse(Base64.decode(data))
      }
      let errMsg
      if (isApijson && !apijsonUrlEqualCommon.includes(url)) {
        if (apijsonUrlImmediateBack.includes(url)) return resolve(data);
        if (data.code === 200 || data.code === 1) {
          resolve(data)
          return;
        }
        errMsg = data.message;
      } else {
        const { status, message: infoMsg, entry } = data
        if (status) {
          if(data.data){
            resolve(data.data);
          }else{
            resolve(entry);
          }
          return;
        }
        errMsg = infoMsg;
      }
      if (data.code === 550) {
        // 未登录，走登录页面
        message.error(errMsg);
        setTimeout(() => {
          goLogin();
        }, 1500);
        return;
      }
      if (errMsg) {
        reject(errMsg)
        if (!hideErrorMessage) message.error(errMsg);
      }
    }).catch(reject)
  })
}

export default http