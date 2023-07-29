import http from '../../utils/http'

export function getTableDataApi(data){
    return new Promise((resolve)=>{
        http({
            url: "/xue/user/selctUserAll",
            method: "post",
            data: {
                ...data,
                pageSize:10
            },
            isFormData:true
        }).then((res)=>{
            console.log(res,'res-----------')
        })
    })
}

export function getStudentEditApi(data){
    return new Promise((resolve)=>{
        // http({
        //     url: "/trade/area-info/geocoder",
        //     method: "post",
        //     data: data
        // })
        
    })
}