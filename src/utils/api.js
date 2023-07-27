import { message } from "antd";
import axios from "axios";
import queryString from "query-string";
import store from '../index'
import http from "./newHttp";
/**
 * 获取当前时间
 */
function getCurrentTimeApi() {
    return new Promise((resolve, reject) => {
        axios({
            url: "https://web.aipaipai-inc.com/queryport/time",
            method: "get",
        }).then(res => {
            let data = res.data;
            if (data.code === 200) {
                resolve(data)
            } else {
                message.error(data.msg);
                reject(data.msg)
            }
        });
    });
}

/**
 * 根据日期范围，解析出每天
 * startDate 2019-05-30
 * endDate 2019-07-09
 * space 天数间隔
 */
function formatDateRangeApi(startDate, endDate, space = 1) {
    let date_all = [], i = 0;
    let startTime = new Date(startDate);
    let endTime = new Date(endDate);

    while ((endTime.getTime() - startTime.getTime()) >= 0) {
        let year = startTime.getFullYear();
        let month = (startTime.getMonth() + 1).toString().length == 1 ? "0" + (startTime.getMonth() + 1).toString() : (startTime.getMonth() + 1).toString();
        let day = startTime.getDate().toString().length == 1 ? "0" + startTime.getDate() : startTime.getDate();
        date_all[i] = year + "-" + month + "-" + day;
        startTime.setDate(startTime.getDate() + space);
        i += 1;
    }
    return date_all;
}


/**
 * 获取前n天
 * 返回
 * {
 *  start: 2019-05-30
 *  end: 2019-07-09
 * }
 */
function getPreRangeDateApi(preDay = 7, space = 1) {
    return new Promise((resolve) => {
        getCurrentTimeApi().then(res => {
            let end = res.time_date.slice(0, 10);
            let dd = new Date(res.time_date);
            dd.setDate(dd.getDate() + (-preDay)); // 获取 preDay 天后的日期
            let y = dd.getFullYear();
            let m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
            let d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
            let start = y + "-" + m + "-" + d;
            resolve({
                start,
                end
            })
        });
    });
}


/***
 * 获取hash路由参数
 */
function getHashUrlQueryApi() {
    let { hash } = window.location;
    hash = hash.slice(2)
    hash = hash.split("?")[1]
    let query = queryString.parse(hash);
    return query;
}

/**    
 * url上的参数解析形如 "?/tab=1&x=2"
 * 如果有参数返回值类型Oject
 * 没有返回 null
 */
const getUrlParams = (_str) => {
    let obj = null;
    if (_str) {
        let str = _str.substring(1);
        let arr = str.split("&");
        obj = {};
        arr.map(item => {
            obj[item.split("=")[0]] = item.split("=")[1]
        })

    }
    return obj;
}

const getOperationLog = (optAccount,clientType,bizType,optTarget,optContent) => {
    //bizType：10、商品，11、直播，12、视频，13、类目，14、主播，15、角色，16、人员，17、预约设置
    return {
        "@operationLog": {
            "companyId": 1,
            "optAccount": optAccount,
            "clientType": clientType,
            "bizType": bizType,
            "optTarget": optTarget,
            "optContent": optContent,
        }
    }
}
const getNewAncorStatus = ()=>{
    const {userInfoReducer:{userId}} = store.getState()
    let APIJSON={
        '@token':'ecdd2065-f613-4105-9144-fe46d675cafc',
        'operation_user':{
            '@schema':'auth',
            user_id:userId,
            login_app:'live_anchor'
        }
    }
    return http({
        url: '/queryport/get',
        method: 'post',
        data:APIJSON,
        isApijson:true
    }).then((res)=>{
        if(res.code==200){
            return res.operation_user
        }else {
            message.error(res.message)
        }
    })
}
export {
    getUrlParams,
    formatDateRangeApi,
    getCurrentTimeApi,
    getPreRangeDateApi,
    getHashUrlQueryApi,
    getOperationLog,
    getNewAncorStatus
}