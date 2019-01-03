var t = require("../../config.js"), a = require("../../utils/util.js");

Page(function(t, a, o) {
    return a in t ? Object.defineProperty(t, a, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = o, t;
}({
    data: {
        tab: "all",
        page: 1,
        ordersdata: [],
        dataPage: 20,
        havemore: !0,
        showLoadingToast: !1,
        showLoadingImg: !0,
        loadingToast: "加载中",
        stopGet: !0,
        windowH: 0,
        scrollTop: 0,
        showPageInfo: !1,
        textFlag: !0
    },
    onLoad: function(t) {
        wx.showLoading({
            title: "加载中"
        }), this.setData({
            tab: t.tab
        }), this.loadData(!1), this.getWindowHeight();
    },
    getWindowHeight: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                t.setData({
                    windowH: a.windowHeight
                });
            }
        });
    },
    goTop: function() {
        this.setData({
            scrollTop: 0
        });
    },
    changtab: function(t) {
        this.setData({
            tab: t.target.dataset.hi,
            page: 1,
            scrollTop: 0,
            ordersdata: [],
            showLoadingToast: !1,
            showLoadingImg: !0,
            stopGet: !0,
            loadingToast: "加载中"
        }), this.loadData(!1);
    },
    loadData: function(o) {
        var e, s = this;
        1 == this.data.tab ? e = "all" : 2 == this.data.tab ? e = "wait_pay" : 3 == this.data.tab && (e = "wait_receive");
        var i = {
            tp: e,
            page: s.data.page
        };
        o ? this.setData({
            showLoadingToast: !0
        }) : wx.showLoading({
            title: "加载中"
        }), a.getHttp(t.orderUrl, i, function(t) {
            "succeed" == t.data.code && ("" == t.data.orders ? (s.setData({
                stopGet: !1
            }), o && s.setData({
                showLoadingImg: !1,
                loadingToast: "已加载全部"
            })) : o ? s.setData({
                ordersdata: s.data.ordersdata.concat(t.data.orders),
                stopGet: !0,
                showLoadingToast: !1
            }) : s.setData({
                ordersdata: t.data.orders,
                stopGet: !0
            })), setTimeout(function() {
                wx.hideLoading();
            }, 500), s.data.ordersdata && 0 != s.data.ordersdata.length ? s.setData({
                textFlag: !0
            }) : s.setData({
                textFlag: !1
            });
        });
    },
    scrollBottom: function() {
        this.data.stopGet && (this.setData({
            page: this.data.page + 1,
            stopGet: !1
        }), this.loadData(!0));
    },
    scrollList: function(t) {
        t.detail.scrollTop > this.data.windowH ? this.setData({
            showPageInfo: !0
        }) : this.setData({
            showPageInfo: !1
        });
    },
    pay: function(t) {
        var o = {
            oid: t.currentTarget.dataset.oid,
            do: "wxmallPay"
        };
        a.pay(o);
    },
    rebuy: function(t) {
        var o = {
            buytype: "rebuy",
            oid: t.target.dataset.id
        };
        a.addCart(o);
    },
    confirmOrder: function(o) {
        var e = this, s = {
            do: "confirmOrder",
            oid: o.target.dataset.oid
        };
        a.getHttp(t.orderUrl, s, function(t) {
            "succeed" == t.data.code && wx.showModal({
                content: t.data.msg,
                showCancel: !1,
                success: function(t) {
                    t.confirm && e.loadData(!1);
                }
            });
        });
    }
}, "pay", function(t) {
    var o = t.target.dataset.oid;
    a.pay({
        oid: o
    });
}));