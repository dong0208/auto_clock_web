// import ajax from "ajax-better";
import ajax from "./ajax-better"
import { httpConfig, goLogin  } from "../config";
import { message } from "antd";

export function getDevBaseUrl () {
  let HTTP_ENV = process.env.HTTP_ENV;
  if (HTTP_ENV === "daily") {
    return httpConfig.api_daily
  } else if (HTTP_ENV === "publish") {
    return httpConfig.api_publish
  } else if (HTTP_ENV === "gray") {
    return httpConfig.api_gray
  }
}
function createAjax ({
  publish,
}) {
  return ajax.create({
    baseURL: publish ? httpConfig.api_publish : getDevBaseUrl(),
  });
}

function http ({
  url,
  method,
  isFormData = false,
  isFileUpload = false,
  data,
  params,
  hideErrorMessage = false,
  publish = false, // 是否调用线上 apijson
  ShowErrMsg = true,//是否提示错误信息，默认是true
}) {
  return new Promise((resolve, reject) => {
    createAjax({
      publish,
    })({
      url,
      method,
      isFormData,
      isFileUpload,
      data,
      params,
    }).then(res => {
      let { data } = res;
      //解密
    //   if ((getDevBaseUrl() == httpConfig.api_publish || httpConfig.encrypt) && isApijson && (!url.includes("/excel/submitExportTask"))) {
    //     data = JSON.parse(Base64.decode(data))
    //   }
        let errMsg
        const { status, message: infoMsg, entry } = data
        if (status) {
          resolve(entry);
          return;
        }
        errMsg = infoMsg;
      if (data.code === 550) {
        // 未登录，走登录页面
        message.error(errMsg);
        setTimeout(()=>{
          goLogin();
        },4000);
        return ;
      }
      if (errMsg) {
        reject(errMsg)
        if(ShowErrMsg){
          if (!hideErrorMessage) message.error(errMsg);
        }
      }
    }).catch(reject)
  })
}

export default http