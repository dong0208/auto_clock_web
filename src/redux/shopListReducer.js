// 店铺列表
const initialState = []

function shopListReducer (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case "saveShopList":
      return data;
    default:
      return state;
  }
}

export default shopListReducer