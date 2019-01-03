var t = require("../../config.js"), e = require("../../utils/util.js");

Page({
    data: {
        tab: 0,
        hide: 0,
        time: 30,
        moid: "",
        new_moid: "",
        phonenum: "",
        codenum: "",
        epetuser: "",
        epetpw: "",
        tabBar: !1,
        url: "",
        urlQuery: {}
    },
    onLoad: function(t) {
        this.setData({
            moid: t.moid,
            new_moid: t.new_moid,
            tabBar: t.tabBar,
            url: t.referrer,
            urlQuery: t
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    tab1: function() {
        this.setData({
            tab: 0
        });
    },
    tab2: function() {
        this.setData({
            tab: 1
        }), this.setData({
            hide: 0,
            time: 30
        });
    },
    getcode: function(a) {
        if (this.data.phonenum) {
            var n = this;
            e.getHttp(t.logincodeUrl, {
                phone: n.data.phonenum
            }, function(t) {
                if ("succeed" == t.data.code) {
                    n.setData({
                        hide: 1
                    });
                    var e = setInterval(function() {
                        n.data.time -= 1, n.data.time >= 0 ? n.setData({
                            time: n.data.time
                        }) : (n.setData({
                            hide: 0,
                            time: 30
                        }), clearInterval(e));
                    }, 1e3);
                } else wx.showModal({
                    content: t.data.msg,
                    showCancel: !1
                });
            });
        } else wx.showModal({
            content: "请输入手机号码",
            showCancel: !1
        });
    },
    phonenum: function(t) {
        this.setData({
            phonenum: t.detail.value
        });
    },
    codenum: function(t) {
        this.setData({
            codenum: t.detail.value
        });
    },
    gocheck: function() {
        var a = this;
        this.setData({
            hide: 0
        }), this.data.phonenum && this.data.codenum ? e.getHttp(t.registerUrl, {
            phone: a.data.phonenum,
            dynmic: a.data.codenum,
            moid: a.data.moid,
            new_moid: a.data.new_moid
        }, function(t) {
            "succeed" == t.data.code ? (wx.setStorageSync("token", t.data.token), wx.setStorageSync("wx_user", t.data.wx_user), 
            a.data.url ? "true" == a.data.tabBar ? wx.switchTab({
                url: a.data.url
            }) : wx.redirectTo({
                url: e.createUrl(a.data.url, a.data.urlQuery)
            }) : wx.switchTab({
                url: "../index/index"
            })) : wx.showModal({
                content: t.data.msg,
                showCancel: !1
            });
        }) : wx.showModal({
            content: "请输入完整信息",
            showCancel: !1
        });
    },
    epetuser: function(t) {
        this.setData({
            epetuser: t.detail.value
        });
    },
    epetpw: function(t) {
        this.setData({
            epetpw: t.detail.value
        });
    },
    gologin: function() {
        var a = this;
        this.data.epetuser && this.data.epetpw ? e.getHttp(t.userloginUrl, {
            username: a.data.epetuser,
            password: a.data.epetpw,
            moid: a.data.moid,
            new_moid: a.data.new_moid
        }, function(t) {
            "succeed" == t.data.code ? (wx.setStorageSync("token", t.data.token), wx.setStorageSync("wx_user", t.data.wx_user), 
            a.data.url ? "true" == a.data.tabBar ? wx.switchTab({
                url: a.data.url
            }) : wx.redirectTo({
                url: e.createUrl(a.data.url, a.data.urlQuery)
            }) : wx.switchTab({
                url: "../index/index"
            })) : wx.showModal({
                content: t.data.msg,
                showCancel: !1
            });
        }) : wx.showModal({
            content: "请输入完整信息",
            showCancel: !1
        });
    }
});