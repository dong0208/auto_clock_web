const dateHandle = (str) => {
    var reg = /([0-9]{4})([0-9]{2})([0-9]{2})/
    str = str+'';
    if(str.length === 8){
        return str.replace(reg,`$1/$2/$3`)
    }else{
        str = str.replace(/-/g,'/');
        return str.substring(0,str.indexOf(" "));

    }
}

const dataHandle = (str,char = ':') => {

    if(str){
        return str.substring(str.indexOf(char)+1);
    }else{
        return ""
    }

}
const toFixed = (str) => {
    if(str !== undefined){
        str = Number(str);
        str = str/100;
        return str.toFixed(2);
    }
   
}
export {
    dateHandle,
    dataHandle,
    toFixed
}