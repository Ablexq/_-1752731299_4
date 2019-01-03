function e(e, t, o, n, r) {
    "" == o && (o = {}), o.version = o.version ? o.version : "303", o.isWeb = 1, o.system = "wap", 
    o.systemfrom = "wechat_miniprogram";
    var a = wx.getStorageSync("token");
    a && (o.token = a);
    var c = [], s = wx.getStorageSync("wx_user");
    s && c.push("wx_user=" + s);
    var d = wx.getStorageSync("cookies");
    if (d) for (var u in d) c.push(u + "=" + d[u]);
    var l;
    l = "GET" == e ? "application/json" : "application/x-www-form-urlencoded", wx.request({
        url: t,
        data: o,
        method: e,
        header: {
            "content-type": l,
            Cookie: c.join(";")
        },
        success: function(e) {
            i(e), n && n(e);
        },
        fail: function(e) {}
    });
}

function t(t, o, n, r) {
    e("GET", t, o, n, r);
}

function o(t, o, n, r) {
    e("POST", t, o, n, r);
}

function n(e, t, o, n, r) {
    return "" == e || void 0 === e ? "" : (e = e.replace(/@!water/g, ""), r && /\.(gif)$/.test(e) ? e : "b" == n ? "number" == typeof o ? e + "@!" + t + "w" + o + "h-b" : e + "@!" + t + "w-b" : "a" == n ? e + "@!" + t + "w0h" : "number" == typeof o ? e + "@!" + t + "w" + o + "h-c" : e + "@!" + t + "w-c");
}

function r() {
    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], t = c();
    return "../login/login?moid=" + wx.getStorageSync("moid") + "&new_moid=" + wx.getStorageSync("new_moid") + "&tabBar=" + e + "&referrer=" + t;
}

function a(e) {
    console.log(e), t(d.payUrl, e, function(e) {
        if (console.log(d.payUrl), console.log("调起支付"), "no_support" == e.data.code) return wx.showModal({
            content: e.data.msg,
            showCancel: !1
        }), !1;
        wx.requestPayment({
            timeStamp: e.data.timeStamp,
            nonceStr: e.data.nonceStr,
            package: e.data.package,
            signType: e.data.signType,
            paySign: e.data.paySign,
            success: function(e) {
                console.log("success"), wx.showToast({
                    title: "支付成功",
                    icon: "success",
                    duration: 3e3,
                    success: function() {
                        wx.redirectTo({
                            url: "../order/order?tab=3"
                        });
                    }
                });
            },
            fail: function(e) {
                console.log("fail"), console.log(e), wx.redirectTo({
                    url: "../order/order?tab=2"
                });
            },
            complete: function(e) {
                console.log("complete");
            }
        });
    });
}

function c() {
    return getCurrentPages()[getCurrentPages().length - 1].__route__.replace(/pages/, "..");
}

function i(e) {
    if (e.header["Set-Cookie"]) {
        var t = /(X15t_([^=]+)=([^;]+);)/gi, o = e.header["Set-Cookie"].match(t), n = wx.getStorageSync("cookies") || {};
        for (var r in o) {
            var a = o[r].match(/(X15t_([^=]+)=([^;]+);)/);
            n[a[2]] = a[3];
        }
        wx.setStorage({
            key: "cookies",
            data: n
        });
    }
}

var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, d = require("../config.js");

module.exports = {
    getHttp: t,
    postHttp: o,
    addCart: function(e, o, n) {
        t(d.addCartUrl, e, function(e) {
            "confirm" == e.data.code ? wx.showModal({
                content: "成功添加到购物车！",
                confirmText: "去购物车",
                cancelText: "继续购物",
                success: function(e) {
                    e.confirm ? wx.switchTab({
                        url: "../cart/cart"
                    }) : e.cancel && o && o();
                }
            }) : "alert" == e.data.code && wx.showModal({
                content: e.data.msg,
                showCancel: !1
            });
        }, n && n());
    },
    setImgWH: function(e, t, o) {
        var n, r, a = e.detail.width / e.detail.height;
        return t && o ? (n = t, r = o) : t ? (n = t, r = t / a) : o && (n = o * a, r = o), 
        {
            width: n,
            height: r,
            index: e.target.dataset.index,
            idx: e.target.dataset.idx
        };
    },
    getCutImage: n,
    getGoodsImage: function(e, t) {
        return n(e, t, 0, "b");
    },
    uniqueArr: function(e) {
        for (var t = [], o = {}, n = 0; n < e.length; n++) o[e[n]] || (t.push(e[n]), o[e[n]] = 1);
        return t;
    },
    pay: a,
    getUrl: c,
    getLoginUrl: r,
    wxpay: function(e) {
        o(d.ordercreateUrl, e, function(e) {
            e && ("alert" == e.data.code && wx.showModal({
                title: "",
                content: e.data.msg,
                showCancel: !1,
                success: function(t) {
                    if (t.confirm && 0 == e.data.login_status) {
                        var o = r();
                        wx.redirectTo({
                            url: o
                        });
                    }
                }
            }), e.data.oidIds && (console.log(e.data.oidIds, "oid--"), a({
                oid: e.data.oidIds
            })));
        });
    },
    createUrl: function(e, t) {
        "object" != (void 0 === t ? "undefined" : s(t)) && (t = {}), e += e.indexOf("?") > 0 ? "&" : "?";
        for (var o in t) "moid" != o && "new_moid" != o && "referrer" != o && "tabBar" != o && (e += o + "=" + t[o] + "&");
        return e.replace(/&$/, "");
    },
    createOrder: function(e) {
        o(d.ordercreateUrl, e, function(e) {
            e && ("alert" == e.data.code && wx.showModal({
                title: "",
                content: e.data.msg,
                showCancel: !1,
                success: function(t) {
                    if (t.confirm && 0 == e.data.login_status) {
                        var o = r();
                        wx.redirectTo({
                            url: o
                        });
                    }
                }
            }), e.data.oidIds && wx.redirectTo({
                url: "../order/order?tab=2"
            }));
        });
    }
};