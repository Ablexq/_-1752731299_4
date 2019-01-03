var t = require("../../config.js"), a = require("../../utils/util.js"), e = require("../../wxParse/wxParse.js");

require("../../wxParse/html2json.js");

Page({
    data: {
        windowHeight: 0,
        showDetail: !1,
        showGoods: !0,
        goToTheView: !1,
        theView: "",
        gid: "",
        id: 1,
        imgData: "",
        current: 1,
        totalImg: "",
        pam: {},
        goodsTitData: "",
        DynamicData: "",
        formatData: "",
        navData: "",
        goodsDetailData: "",
        announceData: "",
        authData: "",
        goodsDetailDataSync: "",
        radiusInput: !0,
        item: {
            buynum: 1
        },
        replyData: "",
        pullText: "上拉查看商品图文详情"
    },
    onLoad: function(t) {
        this.setData({
            gid: t.gid
        }), this.getGoods(), this.getDynamicData(), this.getGoodsNav();
    },
    getGoods: function() {
        var e = this, i = {
            gid: this.data.gid,
            version: "360"
        };
        a.getHttp(t.goodsdetailUrl, i, function(t) {
            if ("succeed" == t.data.code) for (var a = 0; a < t.data.datas.length; a++) 20 == t.data.datas[a].type && e.setData({
                imgData: t.data.datas[a],
                totalImg: t.data.datas[a].photos.length
            }), 21 == t.data.datas[a].type && e.setData({
                goodsTitData: t.data.datas[a]
            }), 5 == t.data.datas[a].type && e.setData({
                formatData: t.data.datas[a]
            }), 8 == t.data.datas[a].type && e.setData({
                replyData: t.data.datas[a]
            });
        });
    },
    getDynamicData: function() {
        var e = this, i = {
            do: "GetDynamic",
            gid: this.data.gid,
            version: "360"
        };
        a.getHttp(t.goodsdetailUrl, i, function(t) {
            "succeed" == t.data.code && e.setData({
                DynamicData: t.data
            });
        });
    },
    changeSwiper: function(t) {
        this.setData({
            current: t.detail.current + 1
        });
    },
    onShareAppMessage: function() {
        return {
            title: this.data.goodsTitData.share_target.param.title,
            path: "pages/goodsdetail/goodsdetail?gid=" + this.data.gid,
            success: function(t) {},
            fail: function(t) {}
        };
    },
    changeInput: function(t) {
        var a = t.detail.value, e = /^[0-9]+$/;
        "" != a && e.test(a) || (a = 1), this.setData({
            item: {
                buynum: a
            }
        });
    },
    changenum: function(t) {
        "add" == t.currentTarget.dataset.type ? this.setData({
            item: {
                buynum: parseInt(this.data.item.buynum) + 1
            }
        }) : this.data.item.buynum > 1 && this.setData({
            item: {
                buynum: parseInt(this.data.item.buynum) - 1
            }
        });
    },
    changeGoods: function(t) {
        var a = t.target.dataset.gid;
        this.setData({
            gid: a
        }), this.getGoods(), this.getDynamicData(), this.getGoodsNav();
    },
    addcart: function() {
        var t = {
            gid: this.data.gid,
            buynum: this.data.item.buynum,
            mode: "goodsdetail"
        };
        a.addCart(t, function(t) {});
    },
    goAuth: function() {
        if (4 == this.data.id) this.setData({
            theView: "goodsDetailInfo"
        }); else {
            var t = {
                gid: this.data.gid,
                version: "360",
                do: "getFromWay"
            };
            this.setData({
                id: 4,
                pam: t,
                goToTheView: !0
            }), this.getGoodsInfo();
        }
    },
    getGoodsNav: function() {
        var e = this, i = {
            do: "getTopNav",
            gid: this.data.gid,
            id: this.data.id,
            version: "360"
        };
        a.getHttp(t.goodsInfoUrl, i, function(t) {
            e.setData({
                navData: t.data
            }), e.getGoodsInfo();
        }), this.setData({
            pam: {
                do: "getDetailsNew",
                gid: this.data.gid,
                id: this.data.id,
                version: "360"
            }
        });
    },
    getGoodsInfo: function(i) {
        var s = this.data.pam, d = this, o = this.data.id;
        a.getHttp(t.goodsInfoUrl, s, function(t) {
            if (1 == o) if ("" == d.data.goodsDetailDataSync) {
                a = t.data.content.replace(/src0/g, "src").replace(/&nbsp/g, "").replace(/<span microsoft="".+1="">/, "");
                e.wxParse("goodsDetailData", "html", a, d, 0), d.setData({
                    goodsDetailDataSync: d.data.goodsDetailData
                });
            } else d.setData({
                goodsDetailData: d.data.goodsDetailDataSync
            }); else if (2 == o) {
                var a = t.data.announce;
                e.wxParse("goodsDetailData", "html", a, d, 0), d.setData({
                    announceData: t.data
                });
            } else 4 == o && d.setData({
                authData: t.data
            });
            d.data.goToTheView && d.setData({
                theView: "goodsDetailInfo"
            });
        });
    },
    changeNav: function(t) {
        var a = t.currentTarget.dataset.id, e = {
            gid: this.data.gid,
            version: "360"
        };
        2 == a ? e.do = "getparamsAndAnnounce" : 4 == a && (e.do = "getFromWay"), this.setData({
            id: a,
            pam: e,
            goToTheView: !0
        }), this.getGoodsInfo();
    },
    goCart: function() {
        wx.switchTab({
            url: "../cart/cart"
        });
    },
    cartbuy: function() {
        var e = this, i = {
            gid: this.data.gid,
            buynum: this.data.item.buynum
        };
        a.getHttp(t.addCartUrl, i, function(t) {
            "confirm" == t.data.code && 0 != t.data.login_status ? wx.switchTab({
                url: "../cart/cart"
            }) : "alert" == t.data.code ? wx.showModal({
                content: t.data.msg,
                showCancel: !1
            }) : 0 == t.data.login_status && wx.showModal({
                content: "您还没有登录!",
                showCancel: !1,
                success: function(t) {
                    t.confirm && wx.redirectTo({
                        url: a.getLoginUrl() + "&gid=" + e.data.gid
                    });
                }
            });
        });
    }
});