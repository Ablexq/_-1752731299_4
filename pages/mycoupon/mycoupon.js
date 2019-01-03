var e = require("../../config.js"), a = require("../../utils/util.js");

getApp();

Page({
    data: {
        codes: new Object(),
        ncode: "",
        wcode: "",
        value: "",
        todo: "CodePay",
        adid: "",
        checkCodes: "",
        referrer: "",
        newCode: "",
        tp: 1,
        codes_count1: 0,
        codes_count2: 0
    },
    onLoad: function(e) {
        this.setData({
            referrer: e.referrer,
            checkCodes: e.Codes,
            adid: e.adid
        }), this.getData(1), this.getData(0);
    },
    changetp: function(e) {
        var a = e.target.id;
        this.setData({
            tp: a
        });
    },
    alink: function() {
        var e = new Array(), a = this.data.codes.available;
        for (var t in a) "1" == a[t].checked && e.push(a[t].code);
        var d = e.join(",");
        this.data.referrer && wx.redirectTo({
            url: this.data.referrer + "?todo=" + this.data.todo + "&Codes=" + d
        });
    },
    choose: function(e) {
        var a = e.target.id, t = this.data.codes.available;
        for (var d in t) if (a == t[d].code) {
            "0" == t[d].checked ? t[d].checked = "1" : "1" == t[d].checked && (t[d].checked = "0");
            break;
        }
        this.setData({
            available: t
        });
        var o = new Array();
        for (var d in t) 1 == t[d].checked && o.push(t[d].code);
        var c = o.join(","), s = a;
        this.setData({
            checkCodes: c,
            newCode: s
        }), this.getData(1);
    },
    getData: function(t) {
        var d = this, o = {
            adid: d.data.adid,
            newCode: d.data.newCode,
            tp: t,
            checkCodes: d.data.checkCodes
        };
        a.getHttp(e.mycouponUrl, o, function(e) {
            if ("succeed" == e.data.code) {
                if (1 == t) {
                    var a = e.data.codes;
                    if (e.data.codes.length > 0) for (var o = 0; o < a.length; o++) 1 == a[o].bg_type ? (a[o].className = "dog", 
                    a[o].imgCode = "d") : 2 == a[o].bg_type ? (a[o].className = "cat", a[o].imgCode = "c") : 3 == a[o].bg_type ? (a[o].className = "fish", 
                    a[o].imgCode = "f") : (a[o].className = "normal", a[o].imgCode = "n");
                    d.setData({
                        "codes.available": a,
                        codes_count1: e.data.codes_count
                    });
                }
                0 == t && d.setData({
                    "codes.unavailable": e.data.codes,
                    codes_count2: e.data.codes_count
                });
            }
        });
    }
});