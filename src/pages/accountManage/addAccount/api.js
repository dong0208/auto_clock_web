import http from '../../../utils/http'

export function submitAccountApi(data) {
    return http({
        url: "/xue/user/insertAccount",
        method: "post",
        data: data
    })
}
export function editAccountApi(data) {
    console.log(data,'data')
    return http({
        url: "/xue/user/updateAccount",
        method: "post",
        data: data,
        isFormData:true
    })
}