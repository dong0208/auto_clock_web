// 用户信息相关
const initialState = {
  userId: 1000,
  type:0,  //用户类型。0.管理员，1分级管理员
  mobilePhone:'18860366762'
}

function userInfoReducer (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case "saveUserInfo":
      return Object.assign({}, state, data)
    default:
      return state;
  }
}

export default userInfoReducer