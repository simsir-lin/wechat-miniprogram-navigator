/// <reference types="miniprogram-api-typings" />
/// <reference path="../index.d.ts" />

const NavigatorEventName = "NavigatorEventName";

class Navigator {
  events: Object;
  data: Object;
  constructor() {
    this.events = {}
    this.data = {};
  }

  to(
    path: string,
    options: WechatMiniprogramNavigator.ToOptions = {
      events: {},
      data: ""
    }
  ) {
    if (!path) {
      return;
    }
    wx.navigateTo({
      url: path,
      events: options.events,
      success: res => {
        if (res.eventChannel) {
          res.eventChannel.emit(NavigatorEventName, options.data);
        } else {
          let indexOf = path.indexOf("?");
          if (indexOf >= 0) {
            path = path.substring(0, indexOf);
          }
          this.events[path] = options.events;
          this.data[path] = options.data;
        }
      }
    });
  }

  emit(
    currentPage: WechatMiniprogram.Page.Instance<any, any>,
    options: WechatMiniprogramNavigator.EmitOptions = {
      event: '',
      data: ''
    }
  ) {
    if (!currentPage) {
      return;
    }
    if (!options.event) {
      return;
    }
    if (
      currentPage.getOpenerEventChannel &&
      currentPage.getOpenerEventChannel().emit
    ) {
      currentPage.getOpenerEventChannel().emit(options.event, options.data);
    } else {
      // 兼容
      let events = this.events[`/${currentPage.route}`];
      if (events && events[options.event]) {
        events[options.event].call(null, options.data);
      }
    }
  }

  getData(
    page: WechatMiniprogram.Page.Instance<any, any>,
    cb: WechatMiniprogram.NavigateToSuccessCallback
  ) {
    if (!page) {
      return;
    }
    if (page.getOpenerEventChannel) {
      page.getOpenerEventChannel().on(NavigatorEventName, function(data) {
        cb && cb(data);
      });
    } else {
      // 兼容
      let data = this.data[`/${page.route}`];
      if (data !== undefined) {
        cb && cb(data);
      }
    }
  }

  back(delta: number = 1) {
    wx.navigateBack({
      delta
    });
  }
}

const navigator = new Navigator();
export default navigator;
