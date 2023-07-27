import Home from "../pages/home";
import CompanyLish from "../pages/companyLish/index";
import commodityCategory from "../pages/commodityCategory/index"
import marketHome from "../pages/market/marketHome"
import authorityRole from "../pages/authorityRole";
import authorityUser from "../pages/authorityUser";
import BrandlandingPage from '../pages/brandlandingPage';
import CouponManagement from '../pages/couponManagement';
import LiveManagement from "../pages/liveManagement";
import ReserveManagement from "../pages/reserveManagement";
import VideoManage from "../pages/video/index"
import SelectAuthor from "../pages/AnchorManagement/tab"
import RestrictionSetting from "../pages/restrictionSetting";
import ApplyJoin from "../pages/ApplyJoin"
import OperationLog from '../pages/operationLog'
import LivePlayback from '../pages/LivePlayback/index'
import DataScreen from "../pages/dataScreen";
import OfficerVideoUpload from '../pages/officerVideoUpload'
// 匹配菜单表路由
const routeConfig = {
  "/home": Home,
  "/video/videoManage":VideoManage,
  "/company/brandlandingPage":BrandlandingPage,
  "/commodityManagement/category":commodityCategory,
  "/marketing/activity":marketHome,
  "/authority/role": authorityRole,
  "/authority/user": authorityUser,
  "/couponManagement/couponManagement" : CouponManagement,
  "/anchor/AnchorManagement":SelectAuthor,
  "/liveManagement/liveManagement":LiveManagement,
  "/reserveManagement/reserveManagement":ReserveManagement,
  "/setting/restriction":RestrictionSetting,
  "/ApplyJoin":ApplyJoin,
  "/operationLog/operationLog":OperationLog,
  "/reserveManagement/LivePlayback":LivePlayback,
  "/dataEntry/dataScreen":DataScreen,
  "/video/officerVideoUpload":OfficerVideoUpload,
  // "/authority/role": AuthorityRole,
  // "/authority/user": AuthorityUser,
}

export default routeConfig;
