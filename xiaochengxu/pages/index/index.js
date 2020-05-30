//index.js
const app = getApp()
let searchKey = null
Page({
  data: {
    banner: [],
  },
  onLoad() {
    this.getTopBanner(); //请求顶部轮播图
  },
  //页面可见
  onShow() {
    searchKey = '' //每次返回首页时，清空搜索词
  },
  /**
   * 搜索相关
   */
  getSearchKey(event) { //获取搜索词
    console.log("搜索词", event.detail.value)
    searchKey = event.detail.value
  },
  goSearch() { //去搜索页
    wx.navigateTo({
      url: '../buy/buy?searchKey=' + searchKey
    })
  },
  //扫码点餐
  btnclick1: function() {
    let that = this;

    //注意：true 扫码点餐； false 本地点餐
    let saoMa = true;

    /**
     * 本地点餐
     */
    if (!saoMa) {
      that.goToBuy("1号桌")
      return
    }

    /**
     * 扫码点餐
     */
    wx.scanCode({
      success: (res) => {
        console.log(res.result)
        if (res.result) {
          let str = res.result;
          if (str.search("111") != -1) {
            console.log("1号桌")
            that.goToBuy("1号桌")
          } else if (str.search("222") != -1) {
            console.log("2号桌")
            that.goToBuy("2号桌")
          } else if (str.search("333") != -1) {
            console.log("3号桌")
            that.goToBuy("3号桌")
          } else if (str.search("444") != -1) {
            console.log("4号桌")
            that.goToBuy("4号桌")
          }
        }
      }
    })
  },

  //去点餐页
  goToBuy(tableNum) {
    wx.setStorageSync("tableNum", tableNum)
    wx.navigateTo({
      url: '../buy/buy'
    })
  },

  //菜品浏览
  btnclick2: function() {
    wx.navigateTo({
      url: '../buy/buy'
    })
  },

  //排号等位
  // btnclick3: function() {
  //   console.log("点击了排号等位"),
  //   wx.showModal({
  //     title: '排号提示',
  //     content: '您当前的排号顺序为1，可以直接扫码点餐呦！(✿◠‿◠）😚'
  //   })
  // },
  
  //排号等位
  btnclick3: function () {
    console.log("点击了排号等位")
    wx.navigateTo({
      url: '/pages/paihao/paihao',
    })
  },
  //获取首页顶部轮播图
  getTopBanner() {
    let that = this;
    wx.request({
      url: app.globalData.baseUrl + '/wxPicture/getAll',
      success: function(res) {
        console.log("请求到的轮播图", res)
        if (res && res.data && res.data.data && res.data.data.length > 0) {
          let dataList = res.data.data;
          console.log("请求到的轮播图", dataList)
          that.setData({
            banner: dataList
          })
        } else {
          that.setData({
            list: []
          })
        }
      }
    })
  }


})