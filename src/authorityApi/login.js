import http from "../utils/http";
export function loginCheckApi() {
    return http({
        url: "/sso/app/logincheck",
        method: "post",
        hideErrorMessage: true
    });
}