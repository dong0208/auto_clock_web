import { getShopDetailApi } from "../../authorityApi/shop";

export const updateShopInfoAction = ({ shopId }) => dispatch => {
  getShopDetailApi({ shopId }).then(shopInfo => dispatch({
    type: "saveShopInfo",
    data: shopInfo
  }))
}