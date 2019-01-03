var t = require("../../config.js"), e = require("../../utils/util.js"), a = require("../../utils/base64.modified.js"), i = getApp();

Page({
    data: {
        hasNavigator: !0,
        searchText: "搜索商品",
        isFtc: !1,
        petType: "dog",
        scrollX: !0,
        adImg: [],
        adv_left: [],
        adv_top: [],
        adv_bottom: [],
        bannerData: {
            indicatorDots: !0,
            vertical: !1,
            autoplay: !0,
            circular: !0,
            interval: 7e3,
            duration: 500,
            previousMargin: 0,
            nextMargin: 0
        },
        menuCat: [ {
            img: "https://static.epetbar.com/static_web/wap/src/images/wxmall/zl_cat.png",
            title: "主粮",
            cateid: "721"
        }, {
            img: "https://static.epetbar.com/static_web/wap/src/images/wxmall/food_cat.png",
            title: "零食",
            cateid: "3580"
        }, {
            img: "https://static.epetbar.com/static_web/wap/src/images/wxmall/daily.png",
            title: "日用",
            cateid: "936"
        }, {
            img: "https://static.epetbar.com/static_web/wap/src/images/wxmall/play.png",
            title: "玩具",
            cateid: "958"
        }, {
            img: "https://static.epetbar.com/static_web/wap/src/images/wxmall/more.png",
            title: "更多",
            cateid: 88888
        } ],
        menuDog: [ {
            img: "https://static.epetbar.com/static_web/wap/src/images/wxmall/zl_dog.png",
            title: "主粮",
            cateid: "5"
        }, {
            img: "https://static.epetbar.com/static_web/wap/src/images/wxmall/food_dog.png",
            title: "零食",
            cateid: "6"
        }, {
            img: "https://static.epetbar.com/static_web/wap/src/images/wxmall/daily.png",
            title: "日用",
            cateid: "54"
        }, {
            img: "https://static.epetbar.com/static_web/wap/src/images/wxmall/play.png",
            title: "玩具",
            cateid: "53"
        }, {
            img: "https://static.epetbar.com/static_web/wap/src/images/wxmall/more.png",
            title: "更多",
            cateid: 88888
        } ],
        menuList: [],
        leaveTime: {
            h: 0,
            m: 0,
            s: 0
        },
        overTime: 0,
        surTitle: [],
        surList: [],
        showInputModal: !1,
        title: "上架提醒",
        placeholder: "请输入您的手机号码",
        phoneNum: "",
        gid: "",
        showTime: !0,
        timeTit: "距离结束",
        currentTit: ""
    },
    onLoad: function() {
        this.setData({
            petType: wx.getStorageSync("pet_type")
        }), this.setMenu(), this.getSurpriseTit(), this.getAdContent();
    },
    onShow: function() {
        wx.getStorageSync("pet_type") != this.data.petType && (this.setData({
            petType: wx.getStorageSync("pet_type")
        }), this.setMenu(), this.getSurpriseTit(), this.getAdContent());
    },
    setMenu: function() {
        "dog" == this.data.petType ? this.setData({
            menuList: this.data.menuDog
        }) : this.setData({
            menuList: this.data.menuCat
        });
    },
    changeType: function(t) {
        this.setData({
            petType: t.target.dataset.type
        }), wx.setStorageSync("pet_type", t.target.dataset.type), i.globalData.cateid = "", 
        this.setMenu(), this.getSurpriseTit(), this.getSurpriseGoods();
    },
    goCate: function(t) {
        var e = t.currentTarget.dataset.cateid;
        i.globalData.cateid = e, wx.switchTab({
            url: "../category/category"
        });
    },
    goGoods: function(t) {
        var e = t.currentTarget.dataset.gid;
        wx.navigateTo({
            url: "../goodsdetail/goodsdetail?gid=" + e
        });
    },
    getSurpriseTit: function() {
        var a = this, i = {
            do: "newSurprise",
            version: "340",
            pet_type: wx.getStorageSync("pet_type")
        };
        e.getHttp(t.surpriseUrl, i, function(t) {
            for (var e, i, s, r = 0; r < t.data.timePoints.length; r++) "on" == t.data.timePoints[r].stateClass && (e = t.data.timePoints[r].tid, 
            i = t.data.timePoints[r].state_type, s = r);
            a.setData({
                surTitle: t.data.timePoints,
                currentTit: "tit" + s
            }), a.getSurpriseGoods(e), a.setTime(i);
        });
    },
    getSurpriseGoods: function(a) {
        var i = this, s = {
            do: "getProList",
            version: "340",
            pet_type: wx.getStorageSync("pet_type"),
            tid: a
        };
        e.getHttp(t.surpriseUrl, s, function(t) {
            if ("succeed" == t.data.code) {
                for (var e = 0; e < t.data.list.length; e++) 0 == t.data.list[e].state ? t.data.list[e].btnClass = "bgf0" : 1 == t.data.list[e].state ? t.data.list[e].btnClass = "bgd7" : t.data.list[e].btnClass = "bgf97";
                i.setData({
                    overTime: t.data.target_time,
                    surList: t.data.list
                });
            }
        });
    },
    setTime: function(t) {
        var e = this;
        0 == t ? e.setData({
            timeTit: "距离结束"
        }) : e.setData({
            timeTit: "距离开始"
        }), 1 != t && setInterval(function() {
            var t = parseInt(new Date().getTime() / 1e3), a = e.data.overTime - t, i = parseInt(a / 3600), s = parseInt((a - 3600 * i) / 60), r = (a - 3600 * i) % 60;
            i > 0 && i < 10 && (i = "0" + i), s > 0 && s < 10 && (s = "0" + s), r > 0 && r < 10 && (r = "0" + r), 
            0 == i && 0 == s && 0 == r && e.setData({
                showTime: !1
            }), e.setData({
                leaveTime: {
                    h: i,
                    m: s,
                    s: r
                }
            });
        }, 1e3);
    },
    changeSur: function(t) {
        for (var e = t.currentTarget.dataset.tid, a = t.currentTarget.dataset.index, i = this.data.surTitle, s = t.currentTarget.dataset.type, r = (t.currentTarget.dataset.overTime, 
        0); r < this.data.surTitle.length; r++) i[r].stateClass = "";
        i[a].stateClass = "on", this.setData({
            surTitle: i,
            currentTit: "tit" + a
        }), 0 == s ? this.setData({
            timeTit: "距离结束"
        }) : this.setData({
            timeTit: "距离开始"
        }), 1 == s ? this.setData({
            showTime: !1
        }) : this.setData({
            showTime: !0
        }), this.getSurpriseGoods(e);
    },
    buy: function(t) {
        var a = t.currentTarget.dataset.mode;
        if (this.setData({
            gid: t.currentTarget.dataset.gid
        }), "立即抢购" == a) {
            var i = {
                gid: t.currentTarget.dataset.gid,
                do: "addtocart",
                pam: t.currentTarget.dataset.atid,
                pam1: t.currentTarget.dataset.gid,
                buytype: "berserk",
                version: "340"
            };
            e.addCart(i, function() {});
        } else "提醒我" == a && this.setData({
            showInputModal: !0
        });
    },
    inputChange: function(t) {
        this.setData({
            phoneNum: t.detail.value
        });
    },
    modalCancel: function() {
        this.setData({
            showInputModal: !1
        });
    },
    modalConfirm: function() {
        var a = this;
        if (/^1(3|4|5|7|8)\d{9}$/.test(this.data.phoneNum)) {
            var i = {
                do: "Getphonecall",
                gid: this.data.gid,
                phone: this.data.phoneNum,
                version: "340"
            };
            e.getHttp(t.surpriseUrl, i, function(t) {
                "succeed" == t.data.code && (a.modalCancel(), wx.showModal({
                    content: t.data.msg,
                    showCancel: !1
                }));
            });
        } else wx.showModal({
            content: "手机格式有误",
            showCancel: !1
        });
    },
    getAdContent: function() {
        var a = this;
        e.getHttp(t.adUrl, "", function(t) {
            var e = t.data.adv_banner;
            a.setData({
                adImg: e,
                adv_left: t.data.adv_banner_left,
                adv_top: t.data.adv_banner_up,
                adv_bottom: t.data.adv_banner_down
            });
        });
    },
    goWebView: function(t) {
        var e = t.currentTarget.dataset.url;
        wx.navigateTo({
            url: "../webView/webView?url=" + a.encode(e)
        });
    }
});