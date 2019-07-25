// pages/map/index.js
//地图页面
// let plugin = requirePlugin("myPlugin");
const app = getApp();
const uid = app.globalData.uid;
var server = app.globalData.server + "/wx/map";
var appid = app.globalData.appid;
Page({
  //跳转到导航
  goNavigation: function (e) {
    wx.navigateTo({//保留当前页面，跳转到应用内的某个页面
      url: '../navigation/index',//url里面就写上你要跳到的地址
    })

  },

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
  },
  markertap(e) {
    // console.log(e)
    wx.request({
      url: server,
      method: 'GET',
      data: {
        'uid': uid,
        'appid': appid
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        console.log(" lng:" + res.data.mainInfo.lng)
           //数据库取值 res.data.mainInfo.lng
        var lng = app.globalData.lon
        var lat = app.globalData.lat
        wx.openLocation({
          latitude: parseFloat(lat),
          longitude: parseFloat(lng),
          scale: 18,
          name: res.data.mainInfo.hotel,
          address: res.data.mainInfo.address,
          success(res) {
            console.log(res)
          }
        }, )
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this


    wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
      title: '加载中',
      icon: 'loading',
    });
    wx.request({
      url: server,
      method: 'GET',
      data: {
        'uid': uid,
        'appid': appid
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        console.log("==res="+res.data)
        wx.hideLoading();
        var lng = app.globalData.lon;
        var lat = app.globalData.lat
        that.setData({
          mainInfo: res.data.mainInfo,
          lng: lng, // 全局属性，用来取定位坐标
          lat: lat,
          markers: [{
            iconPath: "/images/nav.png",
            id: 0,
            latitude: lat, // 页面初始化 options为页面跳转所带来的参数 
            longitude: lng,
            width: 50,
            height: 50
          }],
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    var that = this;
    //console.log(that.data);
    return {
      title: that.data.mainInfo.share,
      imageUrl: that.data.mainInfo.thumb,
      path: 'pages/index/index',
      success: function(res) {
        wx.showToast({
          title: '分享成功',
        })
      },
      fail: function(res) {
        // 转发失败
        wx.showToast({
          title: '分享取消',
        })
      }
    }
  },
  callhe: function(event) {
    wx.makePhoneCall({
      phoneNumber: this.data.mainInfo.he_tel
    })
  },
  callshe: function(event) {
    wx.makePhoneCall({
      phoneNumber: this.data.mainInfo.she_tel
    })
  }
})