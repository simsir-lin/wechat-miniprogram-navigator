# wechat-miniprogram-navigator

## 注意
* 小程序基础库版本 2.2.1 或以上、及开发者工具 1.02.1808300 或以上开始
* 初次引入需先执行开发者工具的 npm 构建，[微信官方 npm 文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)

## 安装
```bash
npm install --save wechat-miniprogram-navigator
```

## 使用
```javascript
const navigator = require('wechat-miniprogram-navigator')
navigator.to('/page/yourpath', ...)
navigator.emit()
navigator.getData()
navigator.back()
```
