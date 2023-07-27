// 功能权限列表
const initialState = []

function authorityListReducer (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case "saveAuthorityList":
      return data;
    default:
      return state;
  }
}

export default authorityListReducer