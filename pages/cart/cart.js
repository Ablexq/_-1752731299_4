var t = require("../../config.js"), e = require("../../utils/util.js");

getApp();

Page({
    data: {
        thisdata: "",
        delBtnWidth: 120,
        delstate: !1,
        orderlength: 0,
        images: [],
        showNoData: !1
    },
    onLoad: function() {
        this.data.images[this.data.images.length] = new Object();
    },
    onReady: function() {},
    onShow: function() {
        wx.showLoading({
            title: "加载中"
        }), this.loadData();
    },
    loadData: function() {
        var a = this;
        e.getHttp(t.cart, {}, function(t) {
            wx.hideLoading(), "" == t.data.orders ? a.setData({
                orderlength: 0,
                showNoData: !0
            }) : a.setData({
                thisdata: t.data,
                orderlength: t.data.orders.length,
                showNoData: !1
            });
        });
    },
    changenum: function(t) {
        var e = this.data.thisdata, a = t.target.dataset.gid, s = t.target.dataset.itemparent, r = t.target.dataset.item, i = Number(e.orders[s].list[r].buynum);
        "add" == t.target.dataset.type ? i = Number(e.orders[s].list[r].buynum) + 1 : "subtract" == t.target.dataset.type && Number(e.orders[s].list[r].buynum) > 1 && (i = Number(e.orders[s].list[r].buynum) - 1), 
        this.sendNum(a, i, s, r);
    },
    changeInput: function(t) {
        this.data.thisdata;
        var e = t.target.dataset.gid, a = t.target.dataset.itemparent, s = t.target.dataset.item, r = t.detail.value;
        /^[0-9]+$/.test(r) ? this.sendNum(e, r, a, s) : wx.showModal({
            content: "输入数据有误",
            showCancel: !1
        });
    },
    sendNum: function(a, s, r, i) {
        var d = this, o = this.data.thisdata, n = {
            do: "changeBuyNum",
            gid: a,
            num: s
        };
        e.getHttp(t.cart, n, function(t) {
            "succeed" == t.data.code ? (o.orders[r].list[i].buynum = s, d.setData({
                thisdata: o
            })) : "alert" == t.data.code && wx.showModal({
                content: t.data.msg,
                showCancel: !1
            });
        }), this.againtotal();
    },
    changecheck: function(a) {
        var s = this, r = this.data.thisdata, i = a.target.dataset.item, d = a.target.dataset.isSelected, o = a.target.dataset.wid, n = !1;
        if ("1" != d) {
            r.orders[i].is_selected = "1";
            for (var c in r.orders[i].list) r.orders[i].list[c].is_selected = "1";
        } else {
            r.orders[i].is_selected = "0";
            for (var c in r.orders[i].list) r.orders[i].list[c].is_selected = "0";
            r.is_selected = "0";
        }
        var l = {
            do: "check",
            type: "order",
            value: o,
            checked: 0
        };
        "1" != d && (l.checked = 1), e.getHttp(t.cart, l, function(t) {
            r.orders[i].cessTotal = t.data.orders[i].cessTotal;
            for (var e in r.orders[i].list) r.orders[i].list[e].cessTotal = t.data.orders[i].list[e].cessTotal;
            s.setData({
                thisdata: r
            });
        });
        for (var h in r.orders) {
            if ("1" != r.orders[h].is_selected) {
                n = !1;
                break;
            }
            n = !0;
        }
        r.is_selected = n ? "1" : "0", this.againtotal();
    },
    changecheckone: function(a) {
        var s = this, r = this.data.thisdata, i = a.target.dataset.itemparent, d = a.target.dataset.item, o = a.target.dataset.isSelected, n = !0, c = !1, l = a.target.dataset.gid;
        if ("1" != o) {
            r.orders[i].list[d].is_selected = "1";
            for (var h in r.orders[i].list) if ("1" != r.orders[i].list[h].is_selected) {
                n = !1;
                break;
            }
            r.orders[i].is_selected = n ? "1" : "0";
        } else r.orders[i].is_selected = "0", r.orders[i].list[d].is_selected = "0", r.is_selected = "0";
        var u = {
            do: "check",
            type: "goods",
            value: l,
            checked: 0
        };
        "1" != o && (u.checked = 1), e.getHttp(t.cart, u, function(t) {
            r.orders[i].cessTotal = t.data.orders[i].cessTotal;
            for (var e in r.orders[i].list) r.orders[i].list[e].cessTotal = t.data.orders[i].list[e].cessTotal;
            s.setData({
                thisdata: r
            });
        });
        for (var g in r.orders) {
            if ("1" != r.orders[g].is_selected) {
                c = !1;
                break;
            }
            c = !0;
        }
        r.is_selected = c ? "1" : "0", this.againtotal();
    },
    selectall: function(a) {
        var s = this, r = this.data.thisdata, i = a.target.dataset.isSelected;
        if ("1" != i) {
            r.is_selected = "1";
            for (var d in r.orders) {
                r.orders[d].is_selected = "1";
                for (var o in r.orders[d].list) r.orders[d].list[o].is_selected = "1";
            }
        } else {
            r.is_selected = "0";
            for (var d in r.orders) {
                r.orders[d].is_selected = "0";
                for (var o in r.orders[d].list) r.orders[d].list[o].is_selected = "0";
            }
        }
        this.againtotal();
        var n = {
            do: "check",
            type: "order",
            value: 0,
            checked: 0
        };
        "1" != i && (n.checked = 1), e.getHttp(t.cart, n, function(t) {
            for (var e in r.orders) {
                r.orders[e].cessTotal = t.data.orders[e].cessTotal;
                for (var a in r.orders[e].list) r.orders[e].list[a].cessTotal = t.data.orders[e].list[a].cessTotal;
            }
            s.setData({
                thisdata: r
            });
        });
    },
    againtotal: function() {
        var t = this.data.thisdata, e = 0, a = 0;
        for (var s in t.orders) for (var r in t.orders[s].list) "1" == t.orders[s].list[r].is_selected && (t.orders[s].list[r].sumprice = Number(t.orders[s].list[r].buynum) * Number(t.orders[s].list[r].price), 
        e += Number(t.orders[s].list[r].sumprice), a += Number(t.orders[s].list[r].buynum));
        t.sum.priceFinal = e.toFixed(2), t.sum.totalnum = a, this.setData({
            thisdata: t
        });
    },
    delgoods: function(a) {
        var s = this, r = a.currentTarget.dataset.gid;
        wx.showModal({
            content: "是否确认删除此商品",
            success: function(a) {
                if (a.confirm) {
                    var i = {
                        do: "del",
                        gidIds: r
                    };
                    e.postHttp(t.cart, i, function(t) {
                        "succeed" == t.data.code && wx.showModal({
                            content: t.data.msg,
                            showCancel: !1,
                            success: function(t) {
                                t.confirm && s.loadData();
                            }
                        });
                    });
                }
            }
        });
    },
    touchS: function(t) {
        var e = this;
        t.currentTarget.dataset.itemparent, t.currentTarget.dataset.item;
        e.data.thisdata.orders.map(function(t, e) {
            t.list.map(function(t, e) {
                t.isTouchMove && (t.isTouchMove = !1);
            });
        }), e.setData({
            thisdata: e.data.thisdata,
            startX: t.changedTouches[0].clientX,
            startY: t.changedTouches[0].clientY
        });
    },
    touchM: function(t) {
        var e = this, a = e.data.thisdata, s = t.currentTarget.dataset.itemparent, r = t.currentTarget.dataset.item, i = t.changedTouches[0].clientX, d = t.changedTouches[0].clientY, o = e.data.startX, n = e.data.startY, c = e.angle({
            X: o,
            Y: n
        }, {
            X: i,
            Y: d
        });
        e.data.thisdata.orders.map(function(t, e) {
            t.list.map(function(t, a) {
                t.isTouchMove = !1, Math.abs(c) > 30 || e == s && a == r && (t.isTouchMove = !(i > o));
            });
        }), e.setData({
            thisdata: a
        });
    },
    angle: function(t, e) {
        var a = e.X - t.X, s = e.Y - t.Y;
        return 360 * Math.atan(s / a) / (2 * Math.PI);
    },
    gotopay: function() {
        for (var a = !1, s = 0; s < this.data.thisdata.orders.length; s++) if (1 == this.data.thisdata.orders[s].is_selected) a = !0; else for (var r = 0; r < this.data.thisdata.orders[s].list.length; r++) 1 == this.data.thisdata.orders[s].list[r].is_selected && (a = !0);
        a ? e.getHttp(t.cartMain, "", function(t) {
            "succeed" == t.data.code && "edit_order" == t.data.target.mode ? wx.navigateTo({
                url: "../orderlist/orderlist"
            }) : "not_login" == t.data.code && wx.showModal({
                content: "您当前未登录,是否跳转登录页",
                success: function(t) {
                    t.confirm && wx.navigateTo({
                        url: e.getLoginUrl(!0)
                    });
                }
            });
        }) : wx.showModal({
            content: "请选择要结算的商品",
            showCancel: !1
        });
    },
    gotoindex: function() {
        wx.switchTab({
            url: "../index/index"
        });
    },
    cartTips: function(t) {
        var e = t.target.dataset.tips;
        wx.showModal({
            title: "",
            content: e,
            confirmText: "知道了",
            showCancel: !1
        });
    },
    imgLoad: function(t) {
        var a = e.setImgWH(t, "", 40);
        console.log(a);
        var s = this.data.images;
        void 0 === s[a.index] && (s[a.index] = new Object()), s[a.index][a.idx] = {
            width: a.width,
            height: a.height
        }, this.setData({
            images: s
        });
    },
    clearInvalid: function() {
        var a = this;
        wx.showModal({
            content: "确定清除全部失效商品吗?",
            success: function(s) {
                if (s.confirm) {
                    var r = {
                        do: "deleteAllInvalidGoods"
                    };
                    e.getHttp(t.cart, r, function(t) {
                        "succeed" == t.data.code && wx.showModal({
                            content: "删除成功",
                            showCancel: !1,
                            success: function(t) {
                                t.confirm && a.loadData();
                            }
                        });
                    });
                }
            }
        });
    }
});