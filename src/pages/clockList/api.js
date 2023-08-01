import http from '../../utils/http'

export function getTableDataApi(data){
    return new Promise((resolve)=>{
        http({
            url: "/xue/user/getUserClockRecords",
            method: "post",
            data: {
                ...data,
                pageSize:10,
                
            },
            isFormData:true
        }).then((res)=>{
            if(res.code==200){
                const {entry:{total,records}} = res
                resolve({
                    total:total,
                    table:records
                })
            }
        })
    })
}