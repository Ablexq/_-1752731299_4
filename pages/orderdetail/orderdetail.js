var t = require("../../config.js"), a = require("../../utils/util.js");

Page({
    data: {
        thisdata: "",
        stats_id: 0,
        animationData: {},
        radiogroup: !1,
        cancelkey: "",
        leaveTime: {}
    },
    onLoad: function(t) {
        this.setData({
            stats_id: t.stats_id,
            oid: t.oid
        });
    },
    onReady: function() {},
    onShow: function() {
        wx.showLoading({
            title: "加载中"
        }), this.loadData();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    loadData: function() {
        var e = this;
        a.getHttp(t.orderdetailUrl, {
            oid: e.data.oid
        }, function(t) {
            e.setData({
                thisdata: t.data
            }), "" != t.data.left_time && e.setTime(t.data.left_time), wx.hideLoading();
        });
    },
    setTime: function(t) {
        var a = this;
        setInterval(function() {
            var e = parseInt(new Date().getTime() / 1e3), i = t - e, o = parseInt(i / 3600), n = parseInt((i - 3600 * o) / 60), s = (i - 3600 * o) % 60;
            o > 0 && o < 10 && (o = "0" + o), n > 0 && n < 10 && (n = "0" + n), s > 0 && s < 10 && (s = "0" + s), 
            0 == o && 0 == n && 0 == s ? a.setData({
                leaveTime: {
                    h: "00",
                    m: "00",
                    s: "00"
                }
            }) : a.setData({
                leaveTime: {
                    h: o,
                    m: n,
                    s: s
                }
            });
        }, 1e3);
    },
    cancelorder: function() {
        this.setData({
            radiogroup: !0
        });
    },
    closeReason: function() {
        this.setData({
            radiogroup: !1
        });
    },
    cancelorderyes: function() {
        if (this.data.cancelkey) {
            var e = this;
            a.getHttp(t.delOrderUrl, {
                oid: e.data.oid,
                repeal_reason_id: e.data.cancelkey
            }, function(t) {
                "succeed" == t.data.code ? wx.navigateTo({
                    url: "../order/order?tab=1"
                }) : wx.showToast({
                    title: t.data.msg,
                    icon: "loading",
                    duration: 1e3
                }), e.setData({
                    radiogroup: !1
                });
            });
        } else wx.showModal({
            content: "请选择取消原因",
            showCancel: !1,
            success: function(t) {
                t.confirm || t.cancel;
            }
        });
    },
    radioChange: function(t) {
        this.setData({
            cancelkey: t.detail.value
        });
    },
    pay: function() {
        a.pay({
            oid: this.data.oid
        });
    }
});