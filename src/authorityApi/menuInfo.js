import http from "../utils/http";

// 转成 menuList 数据
function handleMenuData (authorityList) {
  let menuItemList = authorityList.filter(menu => !menu.notRoute);
  return menuItemList.map(item => ({
    ...item,
    child: handleMenuData(item.child)
  }))
}

// 获取功能权限
async function getMenuInfoApi ({
  // loginApp = "jishi-topbusiness",
  userId
}) {
let sum =0
let authorityList=[]
  let LiveauthorityList = [
    {
      "id": "226", 
      "first_name": "视频管理", 
      "route": "/videoManage", 
      "level": 1, 
      "is_admin": 0, 
      "sort": 1, 
      "icon": "play-circle",
      "child": [
        { "id": "227", "second_name": "直播管理", "first_name": "", "route": "/video/videoManage", "level": 2, "is_admin": 0, "last_id": 226, "sort": 1, "child": [], "name": "视频管理" },],
      "name": "视频管理"
    },
    {
      "id": "254",
      "name": "商品管理",
      "route": "/couponManagement", 
      "level": 1, 
      "is_admin": 0, 
      "sort": 1, 
      "icon": "credit-card",
      "child": [
        { "id": "255", "name": "商品管理", "route": "/couponManagement/couponManagement", "level": 2, "is_admin": 0, "last_id": 254, "sort": 1, "child": [],}
      ],
    },
    {
      "id": "274",
      "name": "直播管理",
      "route": "/liveManagement", 
      "level": 1, 
      "is_admin": 0, 
      "sort": 1, 
      "icon": "video-camera",
      "child": [
        { "id": "275", "name": "直播管理", "route": "/liveManagement/liveManagement", "level": 2, "is_admin": 0, "last_id": 254, "sort": 1, "child": [],},
        { "id": "276", "name": "预约管理", "route": "/reserveManagement/reserveManagement", "level": 2, "is_admin": 0, "last_id": 254, "sort": 1, "child": [],},
        { "id": "277", "name": "直播回放", "route": "/reserveManagement/LivePlayback", "level": 2, "is_admin": 0, "last_id": 254, "sort": 1, "child": [],},

      ],
    },
    // {
    //   "id": "226", 
    //   "first_name": "商家管理", 
    //   "route": "/company", 
    //   "level": 1, 
    //   "is_admin": 0, 
    //   "sort": 1, 
    //   "icon": "shop",
    //   "child": [
    //     { "id": "227", "second_name": "品牌管理", "first_name": "", "route": "/company/companyList", "level": 2, "is_admin": 0, "last_id": 226, "sort": 1, "child": [], "name": "品牌管理" },
    //     { "id": "247", "second_name": "品牌落地页管理", "first_name": "", "route": "/company/brandlandingPage", "level": 2, "is_admin": 0, "last_id": 226, "sort": 2, "child": [], "name": "品牌落地页管理" }],
    //   "name": "商家管理"
    // },
    // {
    //   "id": "240", 
    //   "first_name": "营销管理", 
    //   "route": "marketing", 
    //   "level": 1, 
    //   "is_admin": 0, 
    //   "sort": 5, 
    //   "icon": "profile",
    //   "active_icon": "",
    //   "child": [
    //     { "id": "241", "second_name": "营销活动", "route": "/marketing/activity", "level": 2, "is_admin": 0, "last_id": 240, "sort": 1, "child": [], "name": "营销活动" }
    //   ], 
    //   "name": "营销管理"
    // },
    // { 
    //   "id": "231", 
    //   "first_name": "系统设置", 
    //   "route": "/setting", 
    //   "level": 1, 
    //   "is_admin": 0, 
    //   "sort": 10, 
    //   "icon": "setting", 
    //   "child": [
    //     { "id": "233", "second_name": "角色管理", "route": "/setting/role", "level": 2, "is_admin": 0, "last_id": 231, "sort": 1, "child": [], "name": "角色管理" }, 
    //     { "id": "232", "second_name": "人员管理", "route": "/setting/user", "level": 2, "is_admin": 0, "last_id": 231, "sort": 2, "child": [], "name": "人员管理" }, 
    //   ], 
    //   "name": "系统设置" 
    // }, 
  ]
  let APIJSON_USER = {
    "@token": "c00242bc-ee4c-4f30-83af-b14e70013856",
    
    "user_account": {
      "@schema": "auth",
      "id": userId,
      "@column": "mobile_phone:mobilePhone,user_name:userName,avatar_url:avatarUrl"
    },
    "operation_user": { // 平台信息
      "@schema": "auth",
      "login_app{}": ["live_manage","live_anchor"],
      "user_id": userId,
      // "status": 1,
      "@column": "user_id:userId,is_all_data,admin_type,top_user_id,leader_user_id,login_app,status,reject_str,business_data"
    },
    "authority_user_role": { // 角色
      "@schema": "auth",
      "user_id": userId,
      "login_app": 'live_manage',
      "is_delete": 0,
      "@column": "role_id"
    },
    "authority_role": { // 角色信息
      "@schema": "auth",
      "id@": "/authority_user_role/role_id",
      "is_delete": 0,
      "@column": "role_name,menu_ids"
    },

  }
  // 查询功能菜单
  let APIJSON_FUN = {
    "@token": "bfd47045-51a6-453f-9db5-1d6dc49062d1",
    "authority_menu_fun[]": {
      "query": 2,
      "page": 0,
      "count": 100,
      "authority_menu_fun": {
        "@schema": "auth",
        "login_app": 'live_manage',
        "@order": "group+,sort+",
        "is_delete": 0,
        // 'is_publish{}':httpEnv=='publish'?[1]:[0,1],
        "@column": "id,second_name,first_name,third_name,route,level,is_admin,last_id,sort,icon,active_icon,group,group_name"
      },
    },
    "total@": "/authority_menu_fun[]/total"
  }
  const { isAllMenu, menuIdList, userInfo }=await http({
    url: '/queryport/get',
    isApijson: true,
    data: APIJSON_USER
  }).then(data => {
    let isAllMenu = false; // 是否全部菜单
    let menuIdList = []
    const { operation_user = {}, user_account = {}, authority_role = {}, authority_user_data: { customer_ids } = { customer_ids: "" } } = data;

    const { admin_type } = operation_user;
    if (admin_type === 2) { // 超级管理员  管理员
      isAllMenu = true;
    } else { // 普通用户 和 管理员
      const { menu_ids } = authority_role;
      menuIdList = menu_ids && menu_ids.split(",") || []
    }
    return {
      isAllMenu,
      menuIdList, // 功能权限
      customer_ids: customer_ids && customer_ids.split(",").map(id => Number(id)) || [], // 数据权限
      userInfo: { ...operation_user, ...user_account },
    }
  })
  const {login_app} = userInfo
  if(login_app=='live_manage'){
    if (!isAllMenu) {
      APIJSON_FUN["authority_menu_fun[]"]["authority_menu_fun"]['id{}'] = menuIdList;
    }
    await http({
      url: 'queryport/get',
      isApijson: true,
      data: APIJSON_FUN
    }).then((data)=>{
    // 没有列出三级列表
    // 三级数据存在 thirdMenu
      const powerList = data["authority_menu_fun[]"] || [];
      authorityList = powerList.filter(value_one => !value_one.last_id).map(element_one => {
        element_one.child = powerList.filter(value_two => String(value_two.last_id) === element_one.id).map(element_two => {
          let twoChildList = powerList.filter(value_three => String(value_three.last_id) === element_two.id)
          element_two.child = twoChildList.map(twoChild => ({ ...twoChild, name: twoChild.third_name, notRoute: true }))
          return { ...element_two, name: element_two.second_name, ...element_two.child, thirdName: element_two.child.second_name }
        })
        return { ...element_one, name: element_one.first_name }
      });
    })
  }
  if(login_app=='live_anchor'){
    authorityList=authorityList.concat(LiveauthorityList)
  }
  return {
    menuList: handleMenuData(authorityList),
    thirdMenu:[],
    authorityList, // 所有功能权限数据，包括三级权限。三级权限有notRoute: true属性  用于角色管理，选取功能权限
    customer_ids:[],
    userInfo:userInfo,
  }
}

export {
  getMenuInfoApi
}

/***
 * operation_user 表
 * status -1 解绑
 *
 *
 * admin_type 管理员类型：0:普通用户，1:管理员，2:超级管理员
 * 我们是超级管理员，给客户创建管理员账号
 * 客户管理员创建的账号是普通用户
 * 管理员类型的产生于角色无关
 * 用户是否有权限管理功能菜单要看上级是否为其开通了此功能
 *
 *
 * top_user_id 顶级管理员id
 * 超级管理员和管理员此字段为空
 * top_user_id 是标记普通用户，值是管理员
 * 管理员创建的下级，及其下级创建用户的top_user_id都是此管理员
 * 超级管理员创建的用户都是管理员，管理员创建的用户，都是普通用户
 */


/**
 * 超级管理员没有角色，拥有全部功能权限和数据权限
 * 管理员和普通用户，要查询自己的功能权限和数权限
 *
 */