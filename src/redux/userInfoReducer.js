// 用户信息相关
const initialState = {
  userId: null,
  userName: null, // 用户名
  mobilePhone: null, // 手机号
  avatarUrl: null, // 头像
  admin_type: null, // 管理员类型 number
  is_all_data: null, // bool
  top_user_id: null,
  leader_user_id: null,
  login_app:null,
  status:null,
  reject_str:null,
  business_data:null
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