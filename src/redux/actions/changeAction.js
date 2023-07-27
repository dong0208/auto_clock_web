import { getShopDetailApi } from "../../authorityApi/shop";
import { getMenuInfoApi } from "../../authorityApi/menuInfo";
import history from "../../utils/history";
import { isEnvDevelopment } from "../../config";

// 切换门店
// 存储门店详情和功能权限
export const changeAction = ({ userId }) => dispatch => {
  dispatch({
    type: "showPageLoading"
  })
  Promise.all([getMenuInfoApi({ userId })]).then(([menuInfo]) => {
    let { menuList, thirdMenu, authorityList, customer_ids, userInfo } = menuInfo;
    if(authorityList.length>0) authorityList = authorityList.filter(v=>v.first_name !== "代金券")
    if(menuList.length>0) menuList = menuList.filter(v=>v.first_name !== "代金券")
    if (!isEnvDevelopment) {
      // 跳转第一个有权限的页面
      if (menuList.length > 0) {
          let firstMenu = menuList[0];
        if (firstMenu.child.length !== 0) {
          history.push(firstMenu.child[0]["route"])
        } else {
          history.push(firstMenu.route);
        }
      }else{
        history.push('/');
      }
    }
    // 此处保存这些信息 is_all_data,admin_type,top_user_id,leader_user_id
    // 云管家账号进来时，userInfo返回{}，reducer Object.assign({}, state, data) 不覆盖之前已经保存的值 
    dispatch({
      type: "saveUserInfo",
      data: userInfo
    })
    dispatch({
      type: "saveAuthorityList",
      data: authorityList
    })
    dispatch({
      type: "saveMenu",
      data: menuList
    })
    dispatch({
      type: "hidePageLoading"
    });
  });
}