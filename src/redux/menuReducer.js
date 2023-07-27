// 菜单路由
const initialState = []

function menuReducer (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case "saveMenu":
      return data;
    default:
      return state;
  }
}

export default menuReducer