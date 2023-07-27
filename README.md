# auto-clock-web

### 运行项目
- npm i
- npm start

### 打包
- npm run build-daily  日常 
- npm run build-gray 灰度
- npm run build-publish 线上


### 未完成
- 确认退款


### 日常发布daily分支 sudo cnpm i hk-publish -g
#### build：cnpm run build-daily 
#### Git提交：git add . && git commit -a -m "daily" && git push 
#### 发布资源：hk-p cdn build
#### 发布页面：hk-p page build/index.html

### 正式发布publish分支
#### build：cnpm run build-publish 
#### Git提交：git add . && git commit -a -m "publish" && git push 
#### 发布资源：hk-p cdn build
#### 发布页面：hk-p page build/index.html

### 开发需知
1.左侧菜单栏中的路径,需要在飞虎中创建相应路径,在router-config里添加;
2.未在菜单栏中的路径在app.js里添加

代码要简洁,重构两行泪
ps:开发过程中遇到console顺手删掉

