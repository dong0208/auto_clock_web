import http from '../../utils/http'

export function getTableDataApi(data){
    return new Promise((resolve)=>{
        http({
            url: "/xue/user/selctAccountAll",
            method: "post",
            data: {
                ...data,
                pageSize:10
            },
            isFormData:true
        }).then((res)=>{
            if(res.code==200){
                const {entry:{current,total,records}} = res
                resolve({
                    total:total,
                    table:records
                })
            }
        })
    })
}