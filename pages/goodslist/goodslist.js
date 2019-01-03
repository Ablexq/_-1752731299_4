var t = require("../../config.js"), a = require("../../utils/util.js");

Page({
    data: {
        cateid: 0,
        brandid: 0,
        keyword: "",
        currentPage: 1,
        totalPage: 0,
        searchText: "搜索宝贝",
        hasNavigator: !0,
        isFtc: !1,
        openType: "redirect",
        shortName: "",
        sortRank: "",
        showSortList: !1,
        orderbyparams: "def_desc",
        priceRank: "price_desc",
        goodslist: [],
        images: [],
        windowH: 0,
        showPageInfo: !1,
        isFixTop: "",
        stopGet: !0,
        showLoadingToast: !1,
        showLoadingImg: !0,
        loadingToast: "加载中",
        showNoData: !1,
        recommendData: ""
    },
    onLoad: function(t) {
        this.data.images[this.data.images.length] = new Object(), t.cateid && this.setData({
            cateid: t.cateid
        }), t.keyword && this.setData({
            keyword: t.keyword
        }), this.getWindowHeight(), this.getGoodsList(!1);
    },
    refreshList: function() {
        this.data.stopGet && (this.setData({
            currentPage: 1,
            stopGet: !1
        }), this.getGoodsList(!1));
    },
    scrollBottom: function() {
        this.data.currentPage < this.data.totalPage && this.data.stopGet ? (this.setData({
            currentPage: this.data.currentPage + 1,
            stopGet: !1
        }), this.getGoodsList(!0)) : this.data.currentPage >= this.data.totalPage && this.setData({
            loadingToast: "已加载全部",
            showLoadingToast: !0,
            showLoadingImg: !1
        });
    },
    scrollList: function(t) {
        t.detail.scrollTop > this.data.windowH ? this.setData({
            showPageInfo: !0
        }) : this.setData({
            showPageInfo: !1
        });
    },
    goTop: function() {
        this.setData({
            scrollTop: 0
        });
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
    getGoodsList: function(s) {
        var e = this, i = {
            version: 355,
            cateid: this.data.cateid,
            brandid: this.data.brandid,
            orderby: this.data.orderbyparams,
            page: this.data.currentPage,
            pet_type: wx.getStorageSync("pet_type")
        };
        "" != this.data.keyword && (i.extend_pam = "keyword:" + this.data.keyword), s ? this.setData({
            showLoadingToast: !0
        }) : wx.showLoading({
            title: "加载中"
        }), a.getHttp(t.goodslistUrl, i, function(t) {
            (t.data.code = "succeed") && ("" == t.data.list ? (e.setData({
                stopGet: !1,
                showNoData: !0
            }), wx.hideLoading()) : (s ? e.setData({
                sortRank: t.data.sort_rank,
                goodslist: e.data.goodslist.concat(t.data.list),
                stopGet: !0,
                showLoadingToast: !1
            }) : (e.setData({
                sortRank: t.data.sort_rank,
                goodslist: t.data.list,
                stopGet: !0
            }), wx.hideLoading()), e.setSort(t.data.sort_rank), 1 == e.data.currentPage && e.setData({
                totalPage: t.data.total_page
            })), e.setData({
                recommendData: t.data.pet_type_recommend
            }));
        });
    },
    setSort: function(t) {
        for (var a = this, s = a.data.sortRank, e = 0; e < t.length; e++) {
            s[e].class = "";
            for (var i = 0; i < t[e].list.length; i++) 1 == t[e].list[i].checked && (s[e].class = "checked", 
            a.setData({
                sortRank: s
            }), "default" == s[e].type && this.setData({
                shortName: s[e].list[i].short_name
            }));
        }
    },
    changeRank: function(t) {
        var a = this.data.sortRank, s = t.currentTarget.dataset.index, e = t.currentTarget.dataset.rank;
        this.setAnimation(a, s), "default" == e ? this.setData({
            showSortList: !this.data.showSortList
        }) : "sold" == e ? "sold_desc" != this.data.orderbyparams && (this.setData({
            orderbyparams: "sold_desc"
        }), this.setData({
            shortName: "默认"
        }), this.hideSortList()) : "price" == e && ("price_desc" == this.data.priceRank ? this.setData({
            priceRank: "price_asc",
            orderbyparams: "price_asc"
        }) : this.setData({
            priceRank: "price_desc",
            orderbyparams: "price_desc"
        }), this.setData({
            shortName: "默认"
        }), this.hideSortList());
    },
    changeRankList: function(t) {
        var a = t.currentTarget.dataset.rank;
        this.setData({
            orderbyparams: a
        }), this.hideSortList();
    },
    hideSortList: function() {
        this.setData({
            currentPage: 1,
            scrollTop: 0,
            showSortList: !1,
            showLoadingToast: !1,
            showLoadingImg: !0,
            loadingToast: "加载中"
        }), this.getGoodsList(!1);
    },
    setAnimation: function(t, a) {
        var s = wx.createAnimation({
            duration: 400,
            timingFunction: "ease"
        });
        s.scale(1.2, 1.2).step(), s.scale(1, 1).step();
        for (var e = 0; e < t.length; e++) t[e].class = "", t[e].animation = "";
        t[a].class = "checked", t[a].animation = s.export(), this.setData({
            sortRank: t
        });
    },
    goDetail: function(t) {
        var a = t.currentTarget.dataset.gid;
        wx.navigateTo({
            url: "../goodsdetail/goodsdetail?gid=" + a
        });
    },
    addCart: function(t) {
        var s = {
            gid: t.currentTarget.dataset.gid
        };
        a.addCart(s);
    },
    imgLoad: function(t) {
        var s = a.setImgWH(t, "", 40), e = this.data.images;
        void 0 === e[s.index] && (e[s.index] = new Object()), e[s.index][s.idx] = {
            width: s.width,
            height: s.height
        }, this.setData({
            images: e
        });
    },
    changeSite: function(t) {
        for (var a = this, s = t.currentTarget.dataset.params, e = 0; e < s.length; e++) "pet_arg" == s[e].name && wx.setStorageSync("pet_type", s[e].value), 
        "keyword" == s[e].name && a.setData({
            keyword: s[e].value
        });
        this.setData({
            orderbyparams: "def_desc",
            showNoData: !1
        }), this.hideSortList();
    },
    hideMC: function() {
        this.setData({
            showSortList: !1
        });
    }
});