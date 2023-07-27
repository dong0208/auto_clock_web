const orderStatus = {
    1: '待提交',
    2: '待审核',
    3: '待打款',
    4: '打款中',
    5: '已完成',
    6: '已关闭'
}

const checkStatus = {
    0: '信息无误',
    1: '身份证信息有误',
    2: '打款金额错误',
    3: '白名单不匹配',
    4: '银行卡信息错误',
    5: '信息不完整',
    6: '证件号码不唯一',
    7: '银行卡号不唯一',
    8: '单次打款超额',
    9: '当月打款金额超额',
    10: '人/卡/证不匹配',
    12: '初始值',
    13: '服务费错误'
}

const documentType = {
    0: '全部',
    1: '居民身份证',
    2: '中国护照',
    3: '港澳居民来往内地通行证',
    4: '台湾居民来往大陆通行证',
    5: '外国护照',
    6: '外国人永久居留身份证（外国人永久居留证）',
    7: '中华人民共和国港澳居民居住证',
    8: '中华人民共和国台湾居民居住证',
    9: '中华人民共和国外国人工作许可证（A类）',
    10: '中华人民共和国外国人工作许可证（B类）',
    11: '中华人民共和国外国人工作许可证（C类）',
    12: '其他个人证件',
}
const review_status = {
    1: '等待审核',
    2: '已驳回',
    3: '审核通过',
}
const review_status_child = {//字订单审核状态
    1: '--',
    2: '等待审核',
    3: '已驳回',
    4: '审核通过',
}
const money_status = {//打款状态
    1: '--',
    2: '打款中',
    3: '打款失败',
    4: '打款成功',
}
const source_from = {//创建途径
    MANAGER_ADD: '后台新增',
    SELF_REGISTER: '个人注册'
}

const service_type = {//服务费方案
    TYPE1: '正算方案',
    TYPE2: '倒算方案'
}

const service_status = {//服务状态
    NORMAL: '服务中',
    PAUSE: '暂停',
    STOP: '终止'
}

const cash_status = {//提现状态
    1: '待审核',
    2: '审核通过',
    3: '已驳回',
}

const order_type = {//账单类型
    1: '交易成功',
    2: '退款',
}

export default {
    orderStatus,
    checkStatus,
    documentType,
    review_status,
    review_status_child,
    money_status,
    source_from,
    service_type,
    service_status,
    cash_status,
    order_type
}