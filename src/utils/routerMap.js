import Home from "../pages/home";
import GoodsList from "../pages/goodsList";
import OrderList from "../pages/orderList";
import CreateSonAccount from "../pages/createSonAccount";
import ApplyJoin from "../pages/applyJoin.1";
import SendSetting from "../pages/SendSetting";
import ShopSetting from "../pages/shopSetting";
import Account from "../pages/account";
import OrderCal from "../pages/orderCal";
import HotItem from "../pages/hotItem";
import Gvm from "../pages/gvm";
import CheckAccount from "../pages/checkAccount";
import NewGood from '../pages/newGood'
import SkuStock from "../pages/skuStock";
import CitySend from "../pages/citysend"


export default [
    {
        path: "/",
        name: "首页",
        component: Home,
        // openAll: true,
        owner: "玄清"
    },
    {
        path: "/shopManage/sendSetting",
        name: "配送设置",
        component: SendSetting,
        owner: "吉丽"
    },
    {
        path: "/shopManage/shopSetting",
        name: "店铺设置",
        component: ShopSetting,
        owner: "玄清"
    },
    {
        path: "/shopManage/citysend",
        name: "同城配送设置",
        component: CitySend,
        owner: "lijihan"
    },
    {
        path: "/goodsManage/goodsList",
        name: "商品列表",
        component: GoodsList,
        owner: "志波"
    },
    {
      path: "/goodsManage/goodsList/newGood/:id/:itemStatus",
      name: "新增商品",
      component: NewGood,
      owner: "志波"
    },
    {
        path: "/orderManage/orderList",
        name: "订单列表",
        component: OrderList,
        owner: "玄清"
    },
    {
        path: "/systemSetting/createSonAccount",
        name: "创建子账户",
        component: CreateSonAccount,
        owner: "吉丽"
    },
    {
        path: "/applyJoin/:type",
        name: "申请入驻",
        component: ApplyJoin,
        notJoin: true, // 不需要入驻校验,
        owner: "吉丽"
    },
    {
        path: "/shopManage/account",
        name: "账户中心",
        component: Account,
        owner: "吉丽"
    },
    {
        path: "/statistics/orderCal",
        name: "订单统计",
        component: OrderCal,

    },
    {
        path: "/statistics/hotItem",
        name: "TOP商品",
        component: HotItem,
    },
    {
        path: "/statistics/gvm",
        name: "GVM统计",
        component: Gvm,
    },
    {
        path: "/financeManage/checkAccount",
        name: "收款对账单",
        component: CheckAccount,
        owner: "吉丽"
    },
    {
        path: "/goodsManage/goodsList/updateItemStock",
        name: "修改商品库存",
        component: SkuStock,
        owner: "玄清"
    }
]