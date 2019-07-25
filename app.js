// app.js
App({
  onLaunch: function() {
    //var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      // wx.login({
      //     success: function () {
      //         wx.getUserInfo({
      //             success: function (res) {
      //                 //console.info(res);
      //                 that.globalData.userInfo = res.userInfo;
      //                 typeof cb == "function" && cb(that.globalData.userInfo)
      //             }
      //         })
      //     }
      // });
    }

  },
  onHide: function() {
    wx.pauseBackgroundAudio();
  },
  onShow: function() {
    wx.playBackgroundAudio()
  },
  globalData: {
    userInfo: null,

    // 下面填写酒店相关信息
    lat: 36.892652,
    lon: 117.002369,
    addressName: "永旺大酒店",

    appid: 'wxf5d291510545b18d', //此处改成您自己的小程序appid
    uid: 1,
    // server: 'http://localhost:8080',
    server: 'https://wxapi.01coding.com',
    music_url: 'http://xmdx.sc.chinaz.net/Files/DownLoad/sound1/201807/10388.mp3'
  }
});