import { observable, action, runInAction } from 'mobx'
import http from "../../utils/http";
import { message } from "antd";
import { goLogin } from "../../config";

class User {
  @observable
  userId = null
  @action("存储userId")
  saveUserId = (userId) => {
    this.userId = userId
  }

  // 用户信息
  @observable
  userInfo = {}

  // 加载用户信息
  @observable
  userInfoLoading = true

  @action("获取用户信息/更新用户信息")
  getUserInfo = () => {
    let APIJSON = {
      "@token": "de9aca10-d668-433a-8eb3-92c9da5c9819",
      "user_account_type": {
        "@schema": "auth",
        "@column": "id,user_id,login_app,auth_code,is_master,status,shop_id",
        "user_id": this.userId,
        "login_app": "shoper",
        "is_deleted": 0
      },
      "user_account": {
        "@schema": "auth",
        "id@": "user_account_type/user_id",
        "@column": "user_name,mobile_phone,password:pass_word",
      },
      "shop": {
        "@schema": "shop",
        "id@": "user_account_type/shop_id",
        "is_delete": 0,
        "@column": "id:shopId,shop_status,shop_name,shop_logo,shop_category,refuse_str,account_money"
      },
      "logistic[]": {
        "page": 0,
        "query": 2,
        "count": 10,
        "logistic": {
          "@schema": "shop",
          "shop_id@": "user_account_type/shop_id",
        }
      }
    }

    http({
      method: "post",
      url: "/queryport/get",
      data: APIJSON,
      isApijson: true
    }).then(res => {
      // 没有找到用户信息
      if (!res.user_account || !res.user_account_type) {
        // goLogin()
        return
      }
      // 账号被冻结
      if (res.user_account_type.status === 2) {
        message.error("你的账号已被主管理员冻结")
        // goLogin()
        return
      }
      runInAction(() => {
        this.userInfo = {
          ...res.user_account,
          ...res.user_account_type,
          ...res.shop,
          shop_status: res.shop && res.shop.shop_status || 0,
          logistic: res["logistic[]"] || []
        };
        this.userInfoLoading = false
      });
    })
  }
}

export default new User();