var a = require("../../config.js"), t = require("../../utils/util.js"), e = getApp();

Page({
    data: {
        userInfo: "",
        username: "",
        moid: "",
        new_moid: "",
        avatar: ""
    },
    onShow: function() {
        wx.showLoading({
            title: "加载中"
        }), this.loadData(), this.setData({
            pet_type: wx.getStorageSync("pet_type"),
            mshow: "false"
        });
    },
    login: function() {
        wx.redirectTo({
            url: t.getLoginUrl(!0)
        });
    },
    dwrapper: function(a) {
        a.stopPropagation();
    },
    cmedal: function() {
        this.setData({
            mshow: !1
        });
    },
    tmedal: function() {
        this.setData({
            mshow: !0
        });
    },
    cphone: function() {
        wx.makePhoneCall({
            phoneNumber: "4008889200"
        });
    },
    loadData: function() {
        var o = this;
        e.globalData.userInfo ? o.setData({
            userInfo: e.globalData.userInfo
        }) : o.data.canIUse && (e.userInfoReadyCallback = function(a) {
            o.setData({
                userInfo: a.userInfo
            });
        }), t.getHttp(a.userUrl, {}, function(a) {
            wx.hideLoading(), "" != a.data.mall_user && o.setData({
                username: a.data.mall_user,
                avatar: a.data.userinfo.avatar
            });
        });
    }
});