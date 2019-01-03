var t = require("../../config.js"), a = require("../../utils/util.js"), e = getApp();

Page({
    data: {
        leftdata: "",
        rightdata: "",
        curNav: 0,
        curIndex: 0,
        cateid: "88888",
        cateids: [],
        hasNavigator: !0,
        isFtc: !0,
        searchText: "搜索宝贝",
        keyword: "",
        theView: "",
        loadPetType: "",
        pet_type: "",
        globalcateid: "",
        scrollTop: "0"
    },
    onLoad: function() {
        this.setData({
            pet_type: wx.getStorageSync("pet_type"),
            curIndex: e.globalData.cateid ? e.globalData.cateid : 0,
            curNav: e.globalData.cateid ? e.globalData.cateid : "88888",
            scrollTop: 0
        }), this.getleftdata(this.data.pet_type), this.getrightdata(this.data.curNav, this.data.pet_type);
    },
    onShow: function() {
        var t = wx.getStorageSync("pet_type"), a = e.globalData.cateid, i = wx.getStorageSync("savePetType"), d = wx.getStorageSync("saveCateId");
        i != t ? (wx.setStorageSync("savePetType", t), this.getData()) : d != a && (wx.setStorageSync("saveCateId", a), 
        e.globalData.cateid = a, this.getData());
    },
    getData: function() {
        this.setData({
            pet_type: wx.getStorageSync("pet_type"),
            curIndex: e.globalData.cateid ? e.globalData.cateid : 0,
            curNav: e.globalData.cateid ? e.globalData.cateid : "88888",
            scrollTop: 0
        }), this.getleftdata(this.data.pet_type), this.getrightdata(this.data.curNav, this.data.pet_type);
    },
    switchRightTab: function(t) {
        this.data.scrollTop = "";
        var a = t.target.dataset.id, i = parseInt(t.target.dataset.index);
        this.setData({
            curNav: a,
            curIndex: i,
            theView: "li-" + i
        }), wx.setStorageSync("saveCateId", a), e.globalData.cateid = a, this.getrightdata(a, this.data.pet_type);
    },
    getleftdata: function(e) {
        var i = this, d = {
            pet_type: e
        };
        a.getHttp(t.categoryUrl, d, function(t) {
            "succeed" == t.data.code && i.setData({
                leftdata: t.data.categorys
            });
        });
    },
    getrightdata: function(e, i) {
        var d = this, c = {
            do: "getChildren",
            owner: e,
            pet_type: i
        };
        a.getHttp(t.categoryUrl, c, function(t) {
            if ("succeed" == t.data.code) {
                for (var a = 0; a < t.data.cate_list[0].list.length; a++) t.data.cate_list[0].list[a].id_param = t.data.cate_list[0].list[a].id_param.split("cateid_")[1];
                d.setData({
                    rightdata: t.data.cate_list[0]
                });
            }
        });
    }
});