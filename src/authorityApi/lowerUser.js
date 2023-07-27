import http from "../utils/newHttp";
import store from '../index'
import {getOperationLog} from '../utils/api'
// 查询下级人员列表
function getLowerUserListApi ({
  page = 1,
  size = 10,
  loginApp = "live_manage",
  userId,
  searchVal,
  business_data
}) {
  const APIJSON = {
    "@token": "aac29b43-eddb-4b0a-8664-ab28763d8bf8",
    "[]": {
      "query": 2,
      "page": page - 1,
      "count": size,
      "operation_user": { // 用户平台信息
        "@schema": "auth",
        "login_app": loginApp,
        "leader_user_id": userId,
        "business_data": business_data,
        "status!": 0,
        '@column': 'user_id,id:operation_user_id'
      },
      'user_account': { // 基本信息
        "@schema": "auth",
        'id@': '/operation_user/user_id',
        '@column': 'mobile_phone,user_name'
      },
      'authority_user_role': { // 角色
        "@schema": "auth",
        'user_id@': '/operation_user/user_id',
        "login_app": loginApp,
        "business_data": business_data,
        '@column': 'role_id,id:authority_user_role_id'
      },
      'authority_role': { // 角色信息
        "@schema": "auth",
        'id@': '/authority_user_role/role_id',
        '@column': 'role_name,menu_ids'
      },
      // "authority_user_data": { // 用户数据权限
      //   "@schema": "auth",
      //   "login_app": loginApp,
      //   "user_id@": '[]/operation_user/user_id',
      //   "@column": "customer_ids"
      // }
    },
    "total@": "/[]/total"
  }
  if (searchVal) {
    APIJSON["[]"].operation_user["user_id{}@"] = {
      "from": "user_account",
      "user_account": {
        "@schema": "auth",
        "@column": "id",
        'mobile_phone$': `%${searchVal}%`,
        'user_name$': `%${searchVal}%`,
        '@combine': 'mobile_phone$,user_name$'
      }
    }
  }
  return http({
    url: "/queryport/get",
    isApijson: true,
    data: APIJSON
  }).then(res => {
    let result = res["[]"] || [];
    result = result.map(item => {
      // let { authority_user_data: { customer_ids } = {} } = item;
      return {
        ...item.operation_user,
        ...item.user_account,
        ...item.authority_user_role,
        ...item.authority_role,
        // customer_ids: customer_ids ? customer_ids.split(",") : []
      }
    })
    return {
      data: result,
      total: res.total
    }
  })
}

// 开通账号-搜索手机号
function searchPhoneApi ({
  phone
}) {
  const APIJSON = {
    "@token": "6fb6a0ed-11ab-460a-9dac-b1288880f3af",
    "user_account[]": {
      "query": 2,
      "page": 0,
      "count": 10,
      "user_account": {
        "@schema": "auth",
        "is_deleted": 0,
        "@column": "mobile_phone,user_name,id:user_id"
      }
    }
  }
  if (phone) {
    APIJSON["user_account[]"]["user_account"]["mobile_phone~"] = phone
  }
  return http({
    url: "/queryport/get",
    data: APIJSON,
    isApijson: true
  }).then(res => {
    let result = res["user_account[]"] || [];
    return result
  })
}


// 管理员修改下级角色
function editLowerUserApi ({
  roleId,
  authority_user_role_id,
}) {
  let APIJSON = {
    "@token": "f7d60f30-f34a-4402-8855-8b16ca8a7e86",
    "id": authority_user_role_id,
    "role_id": roleId
  }
  return http({
    url: "/queryport/put",
    data: APIJSON,
    isApijson: true,
  }).then(() => "修改成功")
}

// 开通账号
async function addLowerUserApi ({
  userId,
  adminType,
  isAllData,
  roleId,
  topUserId,
  business_data,
  operation_user_id,
  loginApp = ["live_manage","live_anchor"],
}) {
  // 判断账号是否已开通
  const APIJSON_1 = {
    "@token": "080998e1-70a6-4728-8684-ae8a6178d4d9",
    "operation_user": {
      "@schema": "auth",
      "login_app{}": loginApp,
      "business_data": business_data,
      "status!": 0,
      "user_id": operation_user_id,
      "@column": "user_id"
    }
  }
  const isHave = await http({
    url: "/queryport/get",
    data: APIJSON_1,
    isApijson: true
  }).then(res => !!res.operation_user);
  if (isHave) throw "用户已开通，请勿重复开通";
  const APIJSON_2 = [
    {
      "id": "添加人员",
      "type": "post",
      "request": {
        "@database": "MYSQL",
        "operation_user": {
          "@schema": "auth",
          "user_id": operation_user_id,
          "leader_user_id": userId,
          "admin_type": adminType,
          "top_user_id": topUserId,
          "is_all_data": isAllData,
          "business_data": business_data,
          "login_app": loginApp
        },
        "tag": "operation_user"
      }
    },
    {
      "id": "绑定角色",
      "type": "post",
      "request": {
        "@database": "MYSQL",
        "authority_user_role": {
          "@schema": "auth",
          "user_id": operation_user_id,
          "role_id": roleId,
          "login_app": loginApp,
          "business_data": business_data,
        }
      }
    }
  ]
  return http({
    url: "/queryport/betch",
    data: APIJSON_2,
    isApijson: true
  }).then(() => "开通成功")
}



// 解绑 删除下级人员
/**
 * operation_user 表 status -1
 * authority_user_role 表 删除用户此平台角色
 */
function deleteLowerUserApi ({ record: { operation_user_id, authority_user_role_id,user_name } }) {
  const {userInfoReducer:{mobilePhone}} = store.getState()
  console.log(user_name,'user_name')
  return http({
    url: "/queryport/betch",
    data: [
      {
        type: 'put',
        request: {
          "@token": "6ac741f5-7b7c-4f4d-94ae-2eb3921ec047",
          operation_user: {
            "@schema":"auth",
            "id": operation_user_id,
            "status":0
          },
        },
        tag: 'operation_user',
      },
      {
        type: 'put',
        request: {
          authority_user_role: {
            "@schema":"auth",
            "id": authority_user_role_id,
            "is_delete": 1
          },
        },
        tag: 'authority_user_role',
      },
      { 
        type: 'post',
        request:{
          ...getOperationLog(mobilePhone,4,16,`人员：${user_name}`,'删除人员')
        }
      }
    ],
    isApijson: true,
  }).then(() => "修改成功")
}

export {
  getLowerUserListApi,
  editLowerUserApi,
  addLowerUserApi,
  deleteLowerUserApi,
  searchPhoneApi
}

/**
 * 只看到自己绑定的人
 */
