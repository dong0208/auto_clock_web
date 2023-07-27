import http from "../utils/newHttp";

// 获取门店详情
function getShopDetailApi ({
  shopId
}) {
  const APIJSON = {
    "shop": {
      "@schema": "shop",
      "id": shopId,
      "@column": "id:shopId,company_id,shop_status:shopStatus,shop_name:shopName,shop_logo:shopLogo,shop_category,refuse_str,account_money"
    },
    "logistic[]": { // 配送信息
      "page": 0,
      "query": 2,
      "count": 10,
      "logistic": {
        "@schema": "shop",
        "shop_id": shopId,
      }
    }
  }
  return http({
    url: "/queryport/get",
    data: APIJSON,
    isApijson: true
  }).then(res => ({
    ...res.shop,
    logistic: res["logistic[]"] || []
  }))
}

export {
  getShopDetailApi
}