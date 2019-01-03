var d = require("../../config.js"), e = require("../../utils/util.js");

Page({
    data: {
        addressList: "",
        referrer: "",
        isLogin: !0,
        isEmpty: !1
    },
    onLoad: function(d) {
        d.referrer && this.setData({
            referrer: d.referrer
        }), this.getAddrList();
    },
    getAddrList: function() {
        var t = this, r = {
            do: "getList",
            version: "358",
            system: "android"
        };
        e.getHttp(d.addressUrl, r, function(d) {
            if ("succeed" == d.data.code) {
                for (var e = 0; e < d.data.addressList.length; e++) if (1 == d.data.addressList[e].checked) {
                    var r = d.data.addressList[e];
                    d.data.addressList.splice(e, 1), d.data.addressList.unshift(r);
                }
                t.setData({
                    addressList: d.data.addressList,
                    isLogin: !0
                });
            } else "not_login" == d.data.code && t.setData({
                addressList: d.data.addressList,
                isLogin: !1
            });
            "" == d.data.addressList || "not_login" == d.data.code ? t.setData({
                isEmpty: !0
            }) : t.setData({
                isEmpty: !1
            });
        });
    },
    delAddr: function(t) {
        var r = this, a = t.currentTarget.dataset.aid;
        1 == t.currentTarget.dataset.moren ? wx.showModal({
            title: "",
            content: "默认的收货地址不能删除！",
            showCancel: !1
        }) : wx.showModal({
            title: "",
            content: "您确认要删除该地址吗？",
            success: function(t) {
                if (t.confirm) {
                    var s = {
                        do: "delete",
                        adid: a
                    };
                    e.postHttp(d.addressUrl, s, function(d) {
                        "succeed" == d.data.code && wx.showModal({
                            content: "删除成功",
                            showCancel: !1,
                            success: function(d) {
                                d.confirm && r.getAddrList();
                            }
                        });
                    });
                }
            }
        });
    },
    chooseAddr: function(d) {
        if ("" != this.data.referrer) {
            var e = d.currentTarget.dataset.adid;
            wx.setStorageSync("adid", e), wx.redirectTo({
                url: this.data.referrer + "?todo=changeAddress&adid=" + e
            });
        }
    },
    editAddress: function(d) {
        var e = d.currentTarget.dataset.adid;
        "" != this.data.referrer ? wx.redirectTo({
            url: "../addaddress/addaddress?adid=" + e + "&fromRefer=" + this.data.referrer
        }) : wx.redirectTo({
            url: "../addaddress/addaddress?adid=" + e
        });
    },
    addAddress: function() {
        this.data.isLogin ? wx.redirectTo({
            url: "../addaddress/addaddress?fromRefer=" + this.data.referrer
        }) : wx.redirectTo({
            url: e.getLoginUrl()
        });
    }
});