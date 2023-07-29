## 后台

### 运行项目
- npm i
- npm start

### 打包
- npm run build-daily  日常 
- npm run build-gray 灰度
- npm run build-publish 线上


### 日常发布daily分支
#### build：cnpm run build-daily 
#### Git提交：git add . && git commit -a -m "daily" && git push 
#### 发布资源：hk-p cdn build
#### 发布页面：hk-p page build/index.html

日常环境还是用原来的 hk-p命令发布到阿里云
#### 91版本谷歌浏览器本地cookie无法保存, 关闭浏览器后,终端执行
open -a "Google Chrome" --args --disable-features=SameSiteByDefaultCookies,CookiesWithoutSameSiteMustBeSecure

https://cdn.hknet-inc.com/live/live-operation/daily/build/index.html
管理员账号13576995074   密码：123456
主播账号：17606537211 密码：123456
主播审核流程的账号 17606537111密码：yundian666666



// 账号管理修改账户状态没生效
// 学生管理 账号添加失败