import { getUserShopListApi } from "../../authorityApi/login";

// 更新门店列表
export const getShopListAction = ({ userId }, cb) => dispatch => {
  getUserShopListApi({
    userId
  }).then(shopList => {
    dispatch({
      type: "saveShopList",
      data: shopList
    });
    cb && cb(shopList);
  })
}