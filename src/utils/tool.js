import md5 from "js-md5";
import * as qs from 'qs';

function parseQueryString () {
  const { search } = window.location;
  let result = {}
  if (!search) return result;

  let query = search.split("?")[1];
  let items = query.split("&");
  var arr, name, value;
  for (var i = 0, l = items.length; i < l; i++) {
    arr = items[i].split("=");
    name = arr[0];
    value = arr[1];
    result[name] = decodeURIComponent(value);
  }
  return result;
}

function signSecert (appSecert,req){
    // let reqdata = qs.stringify({ ...req })
    let reqdata = {...req}
    return md5(`${appSecert}:${reqdata}:${appSecert}`);
}

export {
  parseQueryString,
  signSecert
}