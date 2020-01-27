/// <reference types="miniprogram-api-typings" />
/// <reference path="../index.d.ts" />

const NavigatorEventName = "NavigatorEventName";

class Navigator {
  events: {};
  data: {};

  to(
    path: string,
    { events, data = "" }: WechatMiniprogramNavigator.ToOptions
  ) {
    wx.navigateTo({
      url: path,
      events: events,
      success: res => {
        if (res.eventChannel) {
          res.eventChannel.emit(NavigatorEventName, data);
        } else {
          let indexOf = path.indexOf("?");
          if (indexOf >= 0) {
            path = path.substring(0, indexOf);
          }
          this.events[path] = events;
          this.data[path] = data;
        }
      }
    });
  }

  emit(
    currentPage: WechatMiniprogram.Page.Instance<any, any>,
    { name, data = "" }: WechatMiniprogramNavigator.EmitOptions
  ) {
    if (
      currentPage.getOpenerEventChannel &&
      currentPage.getOpenerEventChannel().emit
    ) {
      currentPage.getOpenerEventChannel().emit(name, data);
    } else {
      // 兼容
      let events = this.events[`/${currentPage.route}`];
      if (events && events[name]) {
        events[name].call(null, data);
      }
    }
  }

  getData(
    page: WechatMiniprogram.Page.Instance<any, any>,
    cb: WechatMiniprogram.NavigateToSuccessCallback
  ) {
    if (page.getOpenerEventChannel) {
      page.getOpenerEventChannel().on(NavigatorEventName, function(data) {
        cb && cb(data);
      });
    } else {
      // 兼容
      let data = this.data[`/${page.route}`];
      if (data) {
        cb && cb(data);
      }
    }
  }

  back(delta: number) {
    wx.navigateBack({
      delta
    });
  }
}

const navigator = new Navigator();
export default navigator;
