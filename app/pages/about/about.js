const navigator = require('wechat-miniprogram-navigator')

Page({
  data: {
    params: ''
  },
  onLoad: function (options) {
    navigator.getData(this, (data) => {
      this.setData({
        params: data
      })
    })
  },
  emit(e) {
    navigator.emit(this, {
      event: 'count',
      data: Number(e.currentTarget.dataset.num)
    })
  },
  back() {
    navigator.back()
  }
})