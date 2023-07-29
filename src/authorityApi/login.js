import http from "../utils/http";

// 获取用户登录信息
function loginCheckApi () {
  return http({
    url: "/xue/web/logincheck",
    method: "post",
  })
}


export {
  loginCheckApi
}