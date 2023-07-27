import http from "../utils/http";

// 获取用户登录信息
function loginCheckApi () {
  return http({
    url: "/sso/app/logincheck",
    method: "post",
    hideErrorMessage: true
  });
}

// 查询用户平台主数据(门店)列表
function getUserShopListApi ({ userId, loginApp = "jishi-topbusiness" }) {
  const APIJSON = {
    "@token": "75cc8f30-9857-454e-82d6-71e87abcb42b",
    "[]": {
      "query": 2,
      "page": 0,
      "count": 100,
      "operation_user": {
        "@schema": "auth",
        "login_app": loginApp,
        "status": 1,
        "user_id": userId,
        "@column": "business_data", // business_data 在商家平台指shopId
        "business_data{}@": { // 并且门店没有被删除
          "from": "shop",
          "shop": {
            "@schema": "shop",
            "@column": "id",
            "is_delete": 0
          }
        }
      },
      "shop": {
        "@schema": "shop",
        "id@": "/operation_user/business_data",
        "is_delete": 0,
        "@column": "shop_name,shop_logo,id:shop_id,shop_status"
      }
    }
  }
  return http({
    url: "/queryport/get",
    data: APIJSON,
    isApijson: true
  }).then(res => {
    let result = res["[]"] || [];
    result = result.map(item => ({
      // ...item.operation_user,
      ...item.shop
    }))
    return result;
  })
}

// 检查用户在门店系统有没有此门店
function isHaveThisShopInShopPlatformApi ({ shopId, userId }) {
  const APIJSON = {
    "@token": "75cc8f30-9857-454e-82d6-71e87abcb42b",
    "operation_user": {
      "@schema": "auth",
      "login_app": "SHOP",
      "status": 1,
      "user_id": userId,
      "@column": "business_data", // business_data 在商家平台指shopId
      "business_data{}@": { // 并且门店没有被删除
        "from": "shop",
        "shop": {
          "@schema": "shop",
          "@column": "id",
          "is_delete": 0,
          "id": shopId
        }
      }
    },
    "shop": {
      "@schema": "shop",
      "id": shopId,
      "@column": "shop_name,shop_logo,id:shop_id,shop_status"
    }
  }
  return http({
    url: "/queryport/get",
    data: APIJSON,
    isApijson: true
  }).then(res => ({ status: !!res.operation_user, from: "SHOP", shopList: res.shop ? [res.shop]: [] }))
}

// 查询用户云管家平台有没有此门店数据
function isHaveThisShopInOperationApi ({ userId, shopId }) {
  const APIJSON = {
    "@token": "c8d19502-e908-463d-88e1-c8aef39c8f21",
    "operation_user": {
      "@schema": "auth",
      "login_app": "operation",
      "status": 1,
      "user_id": userId,
      "@column": "business_data", // business_data 在运营平台指 companyId
      "business_data{}@": {
        "from": "shop",
        "shop": {
          "@schema": "shop",
          "is_delete": 0,
          "id": shopId,
          "@column": "company_id"
        }
      }
    },
    "shop": {
      "@schema": "shop",
      "id": shopId,
      "@column": "shop_name,shop_logo,id:shop_id,shop_status"
    }
  }
  return http({
    url: "/queryport/get",
    data: APIJSON,
    isApijson: true
  }).then(res => ({ status: !!res.operation_user, from: "operation", shopList: res.shop ? [res.shop]: [] }))
}

// 传进来shopId时查询用户有没有这个店
function isHaveThisShopApi ({ userId, shopId }) {
  return isHaveThisShopInShopPlatformApi({ userId, shopId }).then(shopPlatformEntry => {
    if (shopPlatformEntry.status) return shopPlatformEntry;
    return isHaveThisShopInOperationApi({ userId, shopId })
  })
}


export {
  loginCheckApi,
  getUserShopListApi,
  isHaveThisShopInShopPlatformApi,
  isHaveThisShopInOperationApi,
  isHaveThisShopApi
}