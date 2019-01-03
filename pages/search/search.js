var t = require("../../config.js"), a = require("../../utils/util.js");

Page({
    data: {
        searchText: "搜索你喜欢的宝贝",
        hasNavigator: !1,
        isFtc: !1,
        hotList: "",
        historyData: "",
        searchValue: ""
    },
    onLoad: function() {
        this.getHotSearch();
    },
    onShow: function() {
        this.getSearchHistory();
    },
    getHotSearch: function() {
        var e = this, s = {
            version: "340"
        };
        a.getHttp(t.hotSearchUrl, s, function(t) {
            "succeed" == t.data.code && e.setData({
                hotList: t.data.list
            });
        });
    },
    getSearchHistory: function() {
        var t = wx.getStorageSync("historyData");
        this.setData({
            historyData: t
        });
    },
    setHistory: function(t) {
        var a = t.currentTarget.dataset.word;
        this.setHistoryData(a);
    },
    setHistoryData: function(t) {
        var e = wx.getStorageSync("historyData");
        void 0 != e && "" != e || (e = []), e.unshift(t), (e = a.uniqueArr(e)).length > 10 && (e.length = 10), 
        wx.setStorage({
            key: "historyData",
            data: e
        }), wx.redirectTo({
            url: "../goodslist/goodslist?keyword=" + t
        });
    },
    changeValue: function(t) {
        this.setData({
            searchValue: t.detail.value
        });
    },
    submitSearch: function() {
        this.search();
    },
    search: function() {
        setTimeout(function() {
            var t = this.data.searchValue;
            "" == t ? wx.showModal({
                content: "搜索内容不能为空",
                showCancel: !1
            }) : (this.setHistoryData(t), wx.redirectTo({
                url: "../goodslist/goodslist?keyword=" + t
            }));
        }.bind(this), 100);
    },
    clearHistory: function() {
        wx.removeStorageSync("historyData"), this.setData({
            historyData: ""
        });
    }
});