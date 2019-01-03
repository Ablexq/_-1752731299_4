var t = require("./config.js"), e = require("./utils/util.js");

App({
    onLaunch: function() {
        var a = this;
        wx.setStorageSync("pet_type", "dog");
        var o = wx.getStorageSync("logs") || [];
        o.unshift(Date.now()), wx.setStorageSync("logs", o);
        var n = this;
        wx.login({
            success: function(o) {
                a.globalData.code = o.code, e.getHttp(t.nloginUrl, {
                    code: n.globalData.code
                }, function(t) {
                    wx.setStorageSync("token", t.data.token), 1 == t.data.login_status ? wx.setStorageSync("wx_user", t.data.wx_user) : (wx.setStorageSync("moid", t.data.moid), 
                    wx.setStorageSync("new_moid", t.data.new_moid));
                });
            }
        });
    },
    globalData: {
        userInfo: null,
        code: null,
        cateid: ""
    }
});