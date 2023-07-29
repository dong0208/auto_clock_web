import http from '../../../utils/http'

export function submitStudentApi(data) {
    return http({
            url: "/xue/user/insertUser",
            method: "post",
            data: data
        })
}

export function editStudentApi(data) {
    return http({
        url: "/xue/user/updateUser",
        method: "post",
        data: data
    })

}