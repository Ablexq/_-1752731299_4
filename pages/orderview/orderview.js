var t = require("../../config.js"), a = require("../../utils/util.js");

getApp();

Page({
    data: {
        delist: [],
        status: "",
        oid: "",
        sendway: "",
        length: ""
    },
    onLoad: function(t) {
        this.setData({
            oid: t.oid
        }), this.getData();
    },
    getData: function() {
        var e = this, d = {
            oid: e.data.oid
        };
        a.getHttp(t.orderviewUrl, d, function(t) {
            "succeed" == t.data.code && e.setData({
                delist: t.data.delist,
                oid: e.data.oid,
                sendway: t.data.sendway,
                status: t.data.state,
                length: t.data.delist.length - 1
            });
        });
    }
});