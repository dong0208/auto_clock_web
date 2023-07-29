import http from '../../../utils/http'

export function updatePositionApi(lat,lng) {
    return new Promise((resolve)=>{
        http({
            url: "/xue/area/geocoder",
            method: "get",
            data: {
                lat,
                lng,
            },
        }).then((res)=>{
            if(res.code==200){
                const { entry={}} = res
                const {address,address_component: { province, city, district },formatted_addresses: { recommend }} = entry
                resolve({
                    longitude: lng,
                    latitude: lat,
                    province,
                    city,
                    district,
                    mapAddress: address,
                })
            }
        })
    })
}

export function handleSelectApi(data) {
    return new Promise((resolve, reject) => {
        http({
            url: "/xue/area/assistant/inputtips", //"/trade/area-info/searchAddressAp",
            method: "get",
            data,
            hideErrorMessage: true,
        })
            .then((res) => {
                if (res.code == 200) {
                    const { entry = {} } = res
                    resolve({
                        addressOption: entry.tips || [],
                        addressOptionFetching: false,
                    })
                }
            })
            .catch((err) => {
                reject(err)
            });
    })
}
