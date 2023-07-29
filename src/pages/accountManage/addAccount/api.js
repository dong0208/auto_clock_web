import http from '../../../utils/http'

export function submitAccountApi(data) {
    return http({
            url: "/xue/user/insertAccount",
            method: "post",
            data: data
        })
}