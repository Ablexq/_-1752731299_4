var a = require("../../config.js"), t = require("../../utils/util.js");

getApp();

Page({
    data: {
        mycodes: [],
        page: 1,
        a: 1,
        nouseNum: 0,
        link: "",
        target_name: "",
        defaultId: 1,
        showIndex: "",
        textFlag: !0
    },
    onLoad: function() {
        this.getdata(this.data.a, this.data.page);
    },
    onReachBottom: function() {
        this.getdata(this.data.a, this.data.page);
    },
    switchRightTab: function(a) {
        var t = a.currentTarget.id;
        parseInt(a.target.dataset.index);
        this.setData({
            a: t,
            page: 1,
            mycodes: [],
            defaultId: t
        }), this.getdata(this.data.a, this.data.page);
    },
    showTip: function(a) {
        var t = this, e = a.currentTarget.id;
        e == t.data.showIndex ? t.setData({
            showIndex: ""
        }) : t.setData({
            showIndex: e
        });
    },
    getdata: function(e, s) {
        var d = this, o = {
            version: 335,
            tp: e,
            page: s
        };
        t.getHttp(a.couponUrl, o, function(a) {
            if ("succeed" == a.data.code) {
                if (a.data.mycode.length > 0) {
                    for (var t = a.data.mycode, s = 0; s < t.length; s++) 1 == t[s].bg_type ? (t[s].className = "dog", 
                    t[s].imgCode = "d") : 2 == t[s].bg_type ? (t[s].className = "cat", t[s].imgCode = "c") : (t[s].className = "normal", 
                    t[s].imgCode = "n");
                    d.setData({
                        mycodes: d.data.mycodes.concat(t)
                    }), d.data.page += 1;
                }
                1 == e && d.setData({
                    nouseNum: a.data.nouseNum
                });
            }
            d.setData({
                textFlag: 0 != d.data.mycodes.length
            });
        });
    }
});