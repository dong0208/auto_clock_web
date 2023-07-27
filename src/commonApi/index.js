import http from "../utils/http"
//获取接龙小程序分享图(微信分享到群的内嵌图）
const updateShareImg = (params) => {
    let url = "/trade/sequence/getSequenceShareImage"

   
    return http({
        method: "get",
        data: params,
        url: url+"?sequenceId="+params.sequenceId
    })

    
}
/**    
 * url上的参数解析形如 "?/tab=1&x=2"
 * 如果有参数返回值类型Oject
 * 没有返回 null
 */
const getUrlParams = (_str) => {
    let obj = null;
    if(_str){
        let str = _str.substring(1);
        let arr = str.split("&");
        obj = {};
        arr.map(item => {
            obj[item.split("=")[0]] = item.split("=")[1]
        })
        
    }
    return obj;
  }
export {
    updateShareImg,
    getUrlParams

}