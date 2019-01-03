var Base64 = require("../../utils/base64.modified.js"), app = getApp();

Page({
    data: {
        thisurl: "",
        passportUrl: "https://passport.epet.com/login.html?do=WxAppAutoLogin&token=",
        allowUrl: [ "https://wap.epet.com", "https://sale.epet.com", "https://passport.epet.com" ]
    },
    onLoad: function(e) {
        if (e.url = Base64.decode(e.url), 0 == this.checkUrl(e.url)) wx.showModal({
            content: "不支持的链接地址",
            showCancel: !1,
            success: function(e) {
                wx.switchTab({
                    url: "../index/index"
                });
            }
        }); else {
            var t = wx.getStorageSync("token"), a = e.url, r = this.data.passportUrl;
            a = this.ChangeParam(a, "noTopBar", 1), r = r + t + "&url=" + escape(a), this.setData({
                thisurl: r
            });
        }
    },
    onShow: function() {},
    checkUrl: function(e) {
        return !(!e || "undefined" == e);
    },
    ChangeParam: function ChangeParam(url, name, value) {
        var newUrl = "", reg = new RegExp("(^|)" + name + "=([^&]*)(|$)"), tmp = name + "=" + value;
        return newUrl = null != url.match(reg) ? url.replace(eval(reg), tmp) : url.match("[?]") ? url + "&" + tmp : url + "?" + tmp;
    }
});