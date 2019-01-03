var t = require("../../config.js"), a = require("../../utils/util.js");

Page({
    data: {
        adid: "",
        thisdata: "",
        sendWayList: [],
        showPicker: !1,
        swid: "",
        wid: "",
        checkedSwIndex: [ 0 ],
        orderIndex: "",
        do: "",
        Codes: "",
        referrer: "",
        isSplitOrder: !1
    },
    onLoad: function(t) {
        t.adid && this.setData({
            adid: t.adid
        }), t.todo && this.setData({
            do: t.todo
        }), t.Codes && this.setData({
            Codes: t.Codes
        }), this.setData({
            referrer: a.getUrl() + "?do=" + this.data.do + "&adid=" + this.data.adid + "&Codes=" + this.data.Codes
        });
    },
    onReady: function() {},
    onShow: function(t) {
        var a = wx.getStorageSync("adid");
        this.setData({
            adid: a
        }), wx.showLoading({
            title: "加载中"
        }), this.loadData();
    },
    loadData: function() {
        var d = this, e = {
            do: this.data.do,
            adid: this.data.adid,
            Codes: this.data.Codes
        };
        "" != this.data.adid && (e.adid = this.data.adid), a.getHttp(t.orderlistUrl, e, function(t) {
            if (1 == t.data.login_status) {
                if (1 == t.data.noAddress) return void d.goAddAddress();
                if (wx.hideLoading(), d.setData({
                    thisdata: t.data,
                    Codes: t.data.CodePay.codes
                }), t.data.orders.length > 1 && d.setData({
                    isSplitOrder: !0
                }), 0 != t.data.orders.length) for (var a in t.data.orders) {
                    d.getordergoods(a, t.data.orders[a].wid);
                }
            }
        });
    },
    goAddress: function() {
        wx.redirectTo({
            url: "../address/address?referrer=../orderlist/orderlist"
        });
    },
    goAddAddress: function() {
        wx.redirectTo({
            url: "../addaddress/addaddress?referrer=../orderlist/orderlist"
        });
    },
    selectCoupon: function() {
        wx.redirectTo({
            url: "../mycoupon/mycoupon?adid=" + this.data.thisdata.address.adid + "&Codes=" + this.data.Codes + "&referrer=../orderlist/orderlist"
        });
    },
    getordergoods: function(d, e) {
        var i = this, s = this.data.thisdata;
        a.getHttp(t.ordergoodlistUrl, {
            wid: e
        }, function(t) {
            s.orders[d].goods = t.data.goods, i.setData({
                thisdata: s
            });
        });
    },
    wxpay: function() {
        var t = {
            isSecret: 0,
            leftPayIsUse: 0,
            redRainPayIsUse: 0
        };
        a.wxpay(t);
    },
    createOrder: function() {
        var t = {
            isSecret: 0,
            leftPayIsUse: 0,
            redRainPayIsUse: 0
        };
        a.createOrder(t);
    },
    getSendWays: function(d) {
        var e = this;
        this.data.wid = d.currentTarget.dataset.wid, this.data.swid = d.currentTarget.dataset.swid, 
        this.data.orderIndex = d.currentTarget.dataset.index;
        var i = {
            do: "chooseSendWay",
            wid: this.data.wid
        };
        a.getHttp(t.orderlistUrl, i, function(t) {
            if ("succeed" == t.data.code) {
                e.setData({
                    sendWayList: t.data.sendWays
                });
                for (var a = 0; a < t.data.sendWays.length; a++) t.data.sendWays[a].swid == e.data.swid && (e.setData({
                    checkedSwIndex: [ a ]
                }), e.setAnimation());
            }
        });
    },
    changeSendWay: function(t) {
        var a = t.detail.value;
        this.data.swid = this.data.sendWayList[a].swid;
    },
    setAnimation: function() {
        var t = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        t.translateY(300).step(), this.setData({
            animationData: t.export(),
            showPicker: !0
        }), setTimeout(function() {
            t.translateY(0).step(), this.setData({
                animationData: t.export()
            });
        }.bind(this), 200);
    },
    cancelSend: function() {
        var t = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        t.translateY(300).step(), this.setData({
            animationData: t.export()
        }), setTimeout(function() {
            t.translateY(0).step(), this.setData({
                animationData: t.export(),
                showPicker: !1
            });
        }.bind(this), 200);
    },
    submitSend: function() {
        var d = this, e = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        e.translateY(300).step(), this.setData({
            animationData: e.export()
        }), setTimeout(function() {
            e.translateY(0).step(), this.setData({
                animationData: e.export(),
                showPicker: !1
            });
        }.bind(this), 200);
        var i = {
            do: "changeSendWay",
            wid: this.data.wid,
            swid: this.data.swid,
            sendTime: -1
        };
        a.getHttp(t.orderlistUrl, i, function(t) {
            if (1 == t.data.login_status && (d.setData({
                thisdata: t.data
            }), 0 != t.data.orders.length)) for (var a in t.data.orders) {
                d.getordergoods(a, t.data.orders[a].wid);
            }
        });
    }
});