import http from '../../../utils/http'

export function submitStudentApi(data) {
    return http({
            url: "/xue/user/insertUser",
            method: "post",
            data: data
        })
}