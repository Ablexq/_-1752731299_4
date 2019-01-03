wx.getStorageSync("token");

var r = "https://mall.api.epet.com", e = {
    host: r,
    loginUrl: r + "/login",
    surpriseUrl: r + "/v3/activity/surprise.html",
    userUrl: r + "/v3/user/UserCenter.html?do=WapUserCenter",
    addCartUrl: r + "/v3/cart.html?do=addToCart",
    goodslistUrl: r + "/v3/goods/list/main.html",
    goodsdetailUrl: r + "/v3/goods/detail/main.html",
    goodsInfoUrl: r + "/v3/goods.html",
    nloginUrl: r + "/v3/login.html?do=WxAppLogin",
    categoryUrl: r + "/v3/goods/category/main.html",
    hotSearchUrl: r + "/v3/goodslist.html?do=getHotKeys",
    searchHistoryUrl: r + "/v3/search/main.html?",
    cart: r + "/v3/cart/",
    cartMain: r + "/v3/cart/main.html?do=OrderQueueTarget",
    addressUrl: r + "/v3/user/address.html",
    placeUrl: r + "/v3/user/place.html",
    orderUrl: r + "/v3/user/orders.html",
    logincodeUrl: r + "/v3/user/bdphone.html?do=sendCode&type=",
    registerUrl: r + "/v3/register.html?do=WxAppRegister",
    userloginUrl: r + "/v3/login.html?do=WxAppBind",
    orderlistUrl: r + "/v3/cart/order.html",
    ordergoodlistUrl: r + "/v3/cart/order.html?do=goodsList",
    ordercreateUrl: r + "/v3/cart/order.html?do=createOrder",
    payUrl: r + "/v3/payment.html?do=wxmallPay",
    orderdetailUrl: r + "/v3/user/orders.html?do=viewV3",
    couponUrl: r + "/v3/user/mycode.html?do=indexV3",
    mycouponUrl: r + "/v3/cart/code.html?do=getCodepayNew",
    delOrderUrl: r + "/v3/user/orders.html?do=delOrder",
    orderviewUrl: r + "/v3/user/orders.html?do=delivery",
    adUrl: r + "/v3/index/wechat.html?do=AddAdsense"
};

module.exports = e;