export default (params = {}) => {
    let _obj = {}
    for (let k in params) {
        if (params[k] !== null && params[k] !== undefined && params[k] !== '') {
            _obj[k] = params[k]
        }
    }
    return _obj
}