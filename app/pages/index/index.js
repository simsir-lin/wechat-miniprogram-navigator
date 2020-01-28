import navigator from 'wechat-miniprogram-navigator'

Page({
  data: {
    num: 0
  },
  to() {
    navigator.to('/pages/about/about', {
      events: {
        count: (data) => {
          this.setData({
            num: this.data.num + data
          })
        }
      },
      data: this.data.num
    })
  }
})
