// 门店信息
const initialState = {
  shopId: null,
  shopName: null,
  shopLogo: null,
  shopStatus: null
}

function shopInfoReducer (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case "saveShopInfo":
      return Object.assign({}, state, data)
    default:
      return state;
  }
}

export default shopInfoReducer