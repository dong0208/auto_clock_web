export function getRequest () {
  let url = window.location.search; //获取url中"?"符后的字串
  let theRequest = {};
  if (url.indexOf("?") !== -1) {
    let str = url.substr(1);
    let strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

export function IsURL (str_url) {
  let strRegex = "^((https|http|ftp|rtsp|mms)?://)"
    + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@  
    + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184  
    + "|" // 允许IP和DOMAIN（域名） 
    + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.  
    + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名  
    + "[a-z]{2,6})" // first level domain- .com or .museum  
    + "(:[0-9]{1,4})?" // 端口- :80  
    + "((/?)|" // a slash isn't required if there is no file name  
    + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    let re = new RegExp(strRegex);
  //re.test() 
  if (re.test(str_url)) {
    return (true);
  } else {
    return (false);
  }
}