const WXAPI = require('apifm-wxapi')
const CONFIG = require('../../config.js')
//获取应用实例
var app = getApp();
Page({
  data: {
    banners:[],
    swiperMaxNumber: 0,
    swiperCurrent: 0
  },
  onLoad:function(){
    const _this = this
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('mallName')
    })
    const app_show_pic_version = wx.getStorageSync('app_show_pic_version')
    // 读取公告列表
    // WXAPI.noticeList().then(res => {
    //         console.log('公告列表数据：', res)
      
    // })
    if (app_show_pic_version && app_show_pic_version == CONFIG.version) {
      wx.switchTab({
        url: '/pages/index/index',
      });
    } else {
      // 展示启动页
      WXAPI.banners({
        type: 'app'
      }).then(function (res) {
        if (res.code == 700) {
          wx.switchTab({
            url: '/pages/index/index',
          });
        } else {
          _this.setData({
            banners: res.data,
            swiperMaxNumber: res.data.length
          });
        }
      }).catch(function (e) {
        wx.switchTab({
          url: '/pages/index/index',
        });
      })
    }
  },
  onShow:function(){
    
  },
  swiperchange: function (e) {
    //console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  goToIndex: function (e) {
    if (app.globalData.isConnected) {
      wx.setStorage({
        key: 'app_show_pic_version',
        data: CONFIG.version
      })
      wx.switchTab({
        url: '/pages/index/index',
      });
    } else {
      wx.showToast({
        title: '当前无网络',
        icon: 'none',
      })
    }
  },
  imgClick(){
    if (this.data.swiperCurrent + 1 != this.data.swiperMaxNumber) {
      wx.showToast({
        title: '左滑进入',
        icon: 'none',
      })
    }
  }
});