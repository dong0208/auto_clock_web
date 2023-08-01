import Home from "../pages/home";
import AccountManage from '../pages/accountManage/index'
import StudentManage from '../pages/studentManage'
import ClockList from '../pages/clockList'
// 匹配菜单表路由
const routeConfig = {
  "/": StudentManage,
  "/account/manage":AccountManage,
  '/student/manage':StudentManage,
  '/student/clocklist':ClockList
}

export default routeConfig;
