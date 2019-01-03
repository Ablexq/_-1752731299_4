var a = require("../../config.js"), t = require("../../utils/util.js");

Page({
    data: {
        version: "358",
        adid: "",
        editAddrData: "",
        addressData: [],
        streetData: [],
        index: 0,
        addressName: "请选择地区",
        streetName: "请选择街道",
        showPicker: !1,
        showPickerStr: !1,
        showStrInput: !1,
        checkedDefault: !1,
        requestId: 0,
        requestAdId: 24,
        requestCityId: "",
        requestAreaId: "",
        requestStrId: "",
        adId: "",
        cityId: "",
        areaId: "",
        strId: "",
        placeIds: "",
        aIndex: 0,
        cIndex: 0,
        areaIndex: 0,
        strIndex: 0,
        animationData: "",
        value: [ 0, 0, 0 ],
        realname: "",
        originPhone: "",
        mobilphone: "",
        detailAddr: "",
        isDefault: 0,
        referrer: "",
        fromRefer: ""
    },
    onLoad: function(a) {
        a.adid && (wx.setNavigationBarTitle({
            title: "编辑地址"
        }), this.setData({
            adid: a.adid
        }), this.getEditAddress()), a.referrer && this.setData({
            referrer: a.referrer
        }), a.fromRefer && this.setData({
            fromRefer: a.fromRefer
        }), this.getAddress();
    },
    getEditAddress: function() {
        var e = this, d = {
            do: "edit",
            version: this.data.version,
            adid: this.data.adid
        };
        t.getHttp(a.placeUrl, d, function(a) {
            var t = a.data.addr.placeNames.replace(/\-/g, " ");
            e.setData({
                realname: a.data.addr.realname,
                mobilphone: a.data.addr.mobilphone,
                originPhone: a.data.addr.mobilphone,
                detailAddr: a.data.addr.address,
                addressName: t,
                placeIds: a.data.addr.placeIds
            }), 1 == a.data.addr.default ? e.setData({
                checkedDefault: !0,
                isDefault: 1
            }) : e.setData({
                checkedDefault: !1,
                isDefault: 0
            });
        });
    },
    getAddress: function() {
        var e = this, d = {
            do: "getplace",
            faid: this.data.requestId,
            version: this.data.version
        };
        t.getHttp(a.addressUrl, d, function(a) {
            "succeed" == a.data.code && (e.setData({
                addressData: a.data.places
            }), e.getCity());
        });
    },
    getCity: function() {
        var e = this, d = {
            do: "getplace",
            faid: this.data.requestAdId,
            version: this.data.version
        };
        t.getHttp(a.addressUrl, d, function(a) {
            "succeed" == a.data.code && (e.setData({
                cityData: a.data.places,
                requestCityId: a.data.places[e.data.cIndex].placeid
            }), e.getArea());
        });
    },
    getArea: function() {
        var e = this, d = {
            do: "getplace",
            faid: this.data.requestCityId,
            version: this.data.version
        };
        t.getHttp(a.addressUrl, d, function(a) {
            "succeed" == a.data.code && e.setData({
                areaData: a.data.places,
                requestAreaId: a.data.places[e.data.areaIndex].placeid
            });
        });
    },
    getStreet: function(e) {
        var d = this, s = {
            do: "getplace",
            faid: this.data.requestAreaId,
            version: this.data.version
        };
        t.getHttp(a.addressUrl, s, function(a) {
            if ("succeed" == a.data.code && (d.setData({
                streetData: a.data.places
            }), e)) {
                var t = !1;
                a.data.places.length > 0 && (t = !0, d.setData({
                    requestStrId: a.data.places[d.data.strIndex].placeid
                })), d.setData({
                    showStrInput: t
                });
            }
        });
    },
    showPickerArea: function(a) {
        var t = a.currentTarget.dataset.picker, e = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = e, e.translateY(300).step(), this.setData({
            animationData: e.export()
        }), "addr" == t ? this.setData({
            showPicker: !0
        }) : this.setData({
            showPickerStr: !0
        }), setTimeout(function() {
            e.translateY(0).step(), this.setData({
                animationData: e.export()
            });
        }.bind(this), 200);
    },
    changeAddr: function(a) {
        var t = a.detail.value[0], e = a.detail.value[1], d = a.detail.value[2];
        this.data.aIndex != t ? (this.setData({
            aIndex: t,
            requestAdId: this.data.addressData[t].placeid
        }), this.getCity()) : this.data.cIndex != e ? (this.setData({
            cIndex: e,
            requestCityId: this.data.cityData[e].placeid
        }), this.getArea()) : this.data.areaIndex != d && (this.setData({
            areaIndex: d,
            requestAreaId: this.data.areaData[d].placeid
        }), this.getStreet(!1)), this.setData({
            value: [ t, e, d ]
        });
    },
    changeStr: function(a) {
        var t = a.detail.value;
        this.setData({
            strIndex: t,
            strId: this.data.streetData[t].placeid
        });
    },
    submitAddr: function() {
        this.getStreet(!0);
        var a = this.data.addressData[this.data.aIndex].name + " " + this.data.cityData[this.data.cIndex].name + " " + this.data.areaData[this.data.areaIndex].name;
        this.setData({
            adId: this.data.requestAdId,
            cityId: this.data.requestCityId,
            areaId: this.data.requestAreaId,
            addressName: a,
            showPicker: !1
        });
    },
    submitStr: function() {
        this.setData({
            strId: this.data.requestStrId,
            streetName: this.data.streetData[this.data.strIndex].name,
            showPickerStr: !1
        });
    },
    cancelAddr: function() {
        var a = wx.createAnimation({
            duration: 200,
            timingFunction: "ease",
            delay: 0
        });
        this.animation = a, a.translateY(300).step(), this.setData({
            animationData: a.export()
        }), setTimeout(function() {
            a.translateY(0).step(), this.setData({
                animationData: a.export(),
                showPicker: !1,
                showPickerStr: !1
            });
        }.bind(this), 200);
    },
    setUserName: function(a) {
        this.setData({
            realname: a.detail.value
        });
    },
    setPhone: function(a) {
        this.setData({
            mobilphone: a.detail.value
        });
    },
    setDetailAddr: function(a) {
        this.setData({
            detailAddr: a.detail.value
        });
    },
    setDefault: function(a) {
        a.detail.value ? this.setData({
            isDefault: 1
        }) : this.setData({
            isDefault: 0
        });
    },
    saveAddr: function() {
        var e = this, d = /^1(3|4|5|7|8)\d{9}$/;
        if ("" == this.data.realname) wx.showModal({
            content: "请输入联系人!",
            showCancel: !1
        }); else if ("" == this.data.mobilphone) wx.showModal({
            content: "请输入联系电话!",
            showCancel: !1
        }); else if (d.test(this.data.mobilphone) || this.data.mobilphone == this.data.originPhone) if ("" == this.data.adId && "" == this.data.addressName || "请选择地区" == this.data.addressName) wx.showModal({
            content: "请选择地区!",
            showCancel: !1
        }); else if (this.data.showStrInput && "" == this.data.strId) wx.showModal({
            content: "请选择区域!",
            showCancel: !1
        }); else {
            var s = {
                do: "save",
                realname: this.data.realname,
                mobilphone: this.data.mobilphone,
                placeIds: this.data.adId + "_" + this.data.cityId + "_" + this.data.areaId,
                address: this.data.detailAddr,
                default: this.data.isDefault,
                version: this.data.version
            };
            this.data.strId && (s.placeIds += "_" + this.data.strId), this.data.adid && (s.adid = this.data.adid), 
            t.postHttp(a.placeUrl, s, function(a) {
                "not_login" == a.data.code ? wx.redirectTo({
                    url: t.getLoginUrl()
                }) : "toast" == a.data.code || "alert" == a.data.code ? wx.showModal({
                    content: a.data.msg,
                    showCancel: !1
                }) : "succeed" == a.data.code && wx.showModal({
                    content: a.data.msg,
                    showCancel: !1,
                    success: function(a) {
                        a.confirm && ("" != e.data.referrer ? wx.redirectTo({
                            url: e.data.referrer
                        }) : "" != e.data.fromRefer ? wx.redirectTo({
                            url: "../address/address?referrer=" + e.data.fromRefer
                        }) : wx.redirectTo({
                            url: "../address/address"
                        }));
                    }
                });
            }, function(a) {});
        } else wx.showModal({
            content: "手机格式有误!",
            showCancel: !1
        });
    }
});