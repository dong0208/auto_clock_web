import http from "../utils/http";
import store from '../index'
import {getOperationLog} from '../utils/api'
// 查询角色列表 通用
async function getRoleListApi ({
  loginApp = "live_manage",
  userId,
  admin_type,
  page = 1,
  size = 10,
  role_name
}) {
  const APIJSON_LOWER = { // 查询下级人员
    "operation_user[]": {
      'query': 2,
      "page": 0,
      "count": 0,
      "operation_user": {
        "@schema": "auth",
        'login_app': loginApp,
        '@column': 'user_id'
      },
    },
    "total@": "/operation_user[]/total"
  }
  if (admin_type === 0) { // 普通用户 自己和第一下级
    APIJSON_LOWER["operation_user[]"].operation_user["leader_user_id"] = userId
  } else if (admin_type === 1) { // 管理员 自己和所有下级
    APIJSON_LOWER["operation_user[]"].operation_user["top_user_id"] = userId
  }
  const lowerUserIdList = await http({
    url: "/queryport/get",
    isApijson: true,
    data: APIJSON_LOWER
  }).then(res => {
    let lowerUserIdList = (res['operation_user[]'] || []).map(user => user.user_id).concat(userId);
    return lowerUserIdList;
  })

  // 查询人员角色
  const APISJON_ROLE = {
    "[]": {
      'query': 2,
      "page": page - 1,
      "count": size,
      "authority_role": {
        "@schema": "auth",
        'login_app': loginApp,
        "is_delete": 0,
        'createrid{}': lowerUserIdList,
        '@order': 'gmt_create-',
        '@column': 'id,role_name,menu_ids,createrid,gmt_create'
      },
      "user_account": {
        "@schema": "auth",
        'id@': '/authority_role/createrid',
        '@column': 'nickname'
      },
      'authority_user_role[]': {
        'query': 1,
        "page": 0,
        "count": 0,
        'authority_user_role': {
          "@schema": "auth",
          'role_id@': '[]/authority_role/id',
          "is_delete": 0,
        }
      },
      "userTotal@": "/authority_user_role[]/total"
    },
    "total@": "/[]/total"
  }
  if (role_name) {
    APISJON_ROLE["[]"].authority_role['role_name~'] = role_name
  }

  return http({
    url: "/queryport/get",
    isApijson: true,
    data: APISJON_ROLE
  }).then(res => {
    let result = res["[]"] || [];
    result = result.map(item => ({
      ...item.authority_role,
      ...item.user_account,
      userTotal: item.userTotal,
      gmt_create: item.authority_role.gmt_create.slice(0, 16),
    }))
    return {
      data: result,
      total: res.total
    }
  })
}

// 查询自己创建的角色
async function getSelfRoleListApi ({
  loginApp = "live_manage",
  // business_data, // shopId
  userId,
  page = 1,
  size = 10,
  role_name
}) {
  const APISJON_ROLE = {
    "@token": "287fdb9c-9131-4cb3-8383-b56c28358e72",
    "[]": {
      "query": 2,
      "page": page - 1,
      "count": size,
      "authority_role": {
        "@schema": "auth",
        "is_delete": 0,
        'createrid': userId,
        '@order': 'gmt_create-',
        // "business_data": business_data,
        "login_app": loginApp,
        '@column': 'id,role_name,menu_ids,gmt_create'
      },
      'authority_user_role[]': { // 角色下人员数量
        'query': 2,
        "page": 0,
        "count": 0,
        'authority_user_role': {
          "@schema": "auth",
          'role_id@': '[]/authority_role/id',
          "login_app": loginApp,
          "is_delete": 0,
        }
      },
      "userTotal@": "/authority_user_role[]/total"
    },
    "total@": "/[]/total"
  }
  if (role_name) {
    APISJON_ROLE["[]"].authority_role['role_name$'] = `%${role_name}%`;
  }

  return http({
    url: "/queryport/get",
    isApijson: true,
    data: APISJON_ROLE
  }).then(res => {
    let result = res["[]"] || [];
    result = result.map(item => ({
      ...item.authority_role,
      userTotal: item.userTotal,
      gmt_create: item.authority_role.gmt_create.slice(0, 19),
    }));
    return {
      data: result,
      total: res.total
    }
  })
}


// 删除角色 roleId
async function deleteRoleApi ({ record: { id: roleId,role_name } }) {
  const {userInfoReducer:{mobilePhone}} = store.getState()
  // 先查询该角色下是否存在人员
  const APIJSON_ROLE_USER = {
    "@token": "36e9febc-3f3b-4aa6-a9bb-abd990f5d98f",
    "[]": {
      'query': 2,
      "page": 0,
      "count": 0,
      "authority_user_role": {
        "@schema": "auth",
        role_id: roleId,
        "is_delete": 0
      },
    },
    "total@": "/[]/total"
  }
  const roleIdTotal = await http({
    url: "/queryport/get",
    isApijson: true,
    data: APIJSON_ROLE_USER
  }).then(res => res.total)
  if (roleIdTotal > 0) {
    throw "请先将该角色下的人员更换至其他角色！"
  }

  const APIJSON_DELETE_ROLE = {
    "@token": "8c6cffd9-3e33-4062-8e67-ccbe517c2f18",
    "id": roleId,
    ...getOperationLog(mobilePhone,4,15,`角色：${role_name}`,'删除角色')
  }
  return http({
    url: "/queryport/put",
    isApijson: true,
    data: APIJSON_DELETE_ROLE
  }).then(() => "删除成功")
}


// 添加角色
async function addRoleApi ({
  business_data,
  loginApp = "live_manage",
  role_name,
  userId,
  menu_ids
}) {
  const {userInfoReducer:{mobilePhone}} = store.getState()
  // 先查询是否存在相同名字的角色
  let APIJSON_SAME = {
    "@token": "d35a0b7b-85e4-4510-9936-52ec2c7744d6",
    "authority_role[]": {
      'query': 2,
      "page": 0,
      "count": 0,
      "authority_role": {
        "@schema": "auth",
        "is_delete": 0,
        "role_name": role_name,
        "createrid": userId,
        "login_app": loginApp,
        "business_data": business_data
      },
    },
    "total@": "/authority_role[]/total"
  }
  const sameTotal = await http({
    url: "/queryport/get",
    isApijson: true,
    data: APIJSON_SAME
  }).then(res => res.total)

  if (sameTotal > 0) {
    throw "此角色名称已存在，请重新命名"
  }

  const APIJSON_ADD = {
    "@token": "893a1ef3-9f60-4609-88b5-42134020518c",
    "login_app": loginApp,
    "role_name": role_name,
    "menu_ids": menu_ids,
    "createrid": userId,
    "business_data": business_data,
    ...getOperationLog(mobilePhone,4,15,`角色：${role_name}`,'添加角色')
  }
  return http({
    url: "/queryport/post",
    isApijson: true,
    data: APIJSON_ADD
  }).then(() => "创建成功")
}

// 编辑角色
function editRoleApi ({
  role_name,
  menu_ids,
  id
}) {
  const {userInfoReducer:{mobilePhone}} = store.getState()
  const APIJSON = {
    "@token": "ec5c13f3-5997-4d59-8aa8-56bd67f4aa09",
    "id": id,
    "role_name": role_name,
    "menu_ids": menu_ids,
    ...getOperationLog(mobilePhone,4,15,`角色：${role_name}`,'编辑角色')
  }
  return http({
    url: "/queryport/put",
    isApijson: true,
    data: APIJSON
  }).then(() => "修改成功")
}


export {
  getRoleListApi,
  getSelfRoleListApi,
  deleteRoleApi,
  addRoleApi,
  editRoleApi
}


/**
  * 角色列表查询
  * 普通用户：看到自己创建的角色和第一下级
  * 管理员：看到自己和所有下级
  * 超级管理员：看到所有
  *
  *
  */