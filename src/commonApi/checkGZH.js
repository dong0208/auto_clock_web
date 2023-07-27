/**
 * 小程序、公众号校验统一封装
 */
import http from '../utils/http'
import {message} from "antd"
/**
 * 获取appInfo信息
 */
function getWxAppInfo({ companyId }) {
  let apiJson = {
    '@token': 'ad8e54ca-13bc-4363-a64d-f322c0615b21',
    '[]': {
      wx_app_info: {
        '@schema': 'auth',
        is_deleted: 0,
        company_id: companyId,
        'app_type{}': [2, 3, 4], //微信公众号、微信小程序
      },
    },
  }
  return http({
    url: '/queryport/get',
    data: apiJson,
    isApijson: true,
  })
}

async function checkGZH ({ companyId }) {
  let res = await getWxAppInfo({companyId})
  if (res.code == 200) {
    let wxAppInfoList = res['[]'] || []
    let appTypeArr = [] //添加app_type
    let appInfo = [] 
    let haveErr = 0
    let wx_app_id_list = []
    wxAppInfoList.forEach((item) => {
      appTypeArr.push(item.wx_app_info.app_type)
      appInfo.push({
        authorization: JSON.parse(item.wx_app_info.wx_authorization_info),
        app_type: item.wx_app_info.app_type,
        wx_app_id: item.wx_app_info.wx_app_id,
      })
    })

    if (appTypeArr.indexOf(3) == -1) {
      // 微信小程序是否未授权
      message.error('微信小程序未授权')
      return false
    } 

    if(appTypeArr.indexOf(2) == -1 && appTypeArr.indexOf(4) == -1){
      message.error('微信公众号未授权')
      return false
    }else{//公众号已授权,校验开放平台账号管理权限是否未授权
      appInfo.map((value) => {
        if (value.app_type == 3) {
          let idarr = []
          value.authorization.func_info.map((i) => {
            idarr.push(i.funcscopeCategory.id)
          })
          if (idarr.indexOf('25') == -1) {
            message.error('微信小程序开放平台账号管理权限未授权')
            haveErr += 1
          }
        }

        if (value.app_type == 4 || value.app_type == 2) {
          let idarr = []
          value.authorization.func_info.map((i) => {
            idarr.push(i.funcscopeCategory.id)
          })
          if (idarr.indexOf('24') == -1) {
            message.error('微信公众号开放平台账号管理权限未授权')
            haveErr += 1
          }
        }

        if(value.app_type == 3||value.app_type == 4 || value.app_type == 2){
          wx_app_id_list.push(value.wx_app_id)
        }
      })
      // console.log(haveErr,'haveErr')
      //未授权优先做拦截
      if(haveErr>0){ 
        return false
      }

      //可开启 测试用
      // wx_app_id_list =['wx9027973971835e1c','wx806528b918c89356'] 
      let promise_all = wx_app_id_list.map(id =>
        http({
          url: `/sso/wx/getWxOpenAppId?appId=${id}`,
          method: 'get',
          data: {},
        })
      )         
      await Promise.all(promise_all).then((union_info_list) => {
        // console.log(union_info_list,'union_info_list')
        let union_ids = [... new Set(union_info_list.map(item=>item.open_appid))]
        if(union_ids.length === 1){
          return true
        }else{
          message.error('微信小程序与微信公众号开放平台账号不一致')
          haveErr += 1
        }
      }).catch((err)=>{
          haveErr += 1
      })
      if(haveErr>0){ //
        return false
      }else{
        return true
      }
    }
  }
}

async function checkMiniApp ({ companyId }) {
  let res = await getWxAppInfo({companyId})
  if (res.code == 200) {
    let wxAppInfoList = res['[]'] || []
    let appTypeArr = [] //添加app_type
    let appInfo = [] 
    let haveErr = 0
    let wx_app_id_list = []
    wxAppInfoList.forEach((item) => {
      appTypeArr.push(item.wx_app_info.app_type)
      appInfo.push({
        authorization: JSON.parse(item.wx_app_info.wx_authorization_info),
        app_type: item.wx_app_info.app_type,
        wx_app_id: item.wx_app_info.wx_app_id,
      })
    })
    if (appTypeArr.indexOf(3) == -1) {
      // 微信小程序是否未授权
      message.error('微信小程序未授权')
      return false
    }else{
      return true
    }
  }
}


/**
 * 小程序添加活动模版
 */
// async function addTemplate(){
//   http({
//     url: '/trade/crowdsource/merchant/createMerchantAndGetToken',
//     method: 'post',
//     data: {
//       // companyId: companyId,
//       isBind: 1,
//     },
//     isFormData: true,
//     isApijson: false,
//   }).then(res => {
//     return true
//   }).catch(err => {
//     return false
//   })
// }
export { checkGZH, checkMiniApp }
