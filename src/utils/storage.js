//storage封装
class Storage {
  constructor(type) {
    if (type === 'local') {
      this.store = window.localStorage
    } else if (type === 'session') {
      this.store = window.sessionStorage
    }
  }

  set(key, value) {
    this.store.setItem(encodeURIComponent(JSON.stringify(key)), encodeURIComponent(JSON.stringify(value)))
  }

  get(key) {
    let value = this.store.getItem(encodeURIComponent(JSON.stringify(key)));
    return JSON.parse(decodeURIComponent(value));
  }

  remove(key) {
    this.store.removeItem(encodeURIComponent(JSON.stringify(key)))
  }

  // 开发环境登录页使用,解决本地跨域
  devSet(key, value){
    const { host } = window.location;
    // if(host.includes("localhost")){
      this.store.setItem(encodeURIComponent(JSON.stringify(key)), encodeURIComponent(JSON.stringify(value)))
    // }
  }
}

export const sessionStorage = new Storage('local')
export const localStorage = new Storage('session')

