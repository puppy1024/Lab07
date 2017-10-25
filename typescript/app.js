"use strict";
/// <reference path="../node_modules/@types/jquery/index.d.ts" />
// VIP的折扣
var VipDiscount = /** @class */ (function () {
    function VipDiscount() {
    }
    VipDiscount.prototype.discountCalculator = function (price, qyt, level) {
        if (price * qyt >= 500) {
            return 0.8;
        }
        return 1;
    };
    return VipDiscount;
}());
//一般會員的折扣
var NormalDiscount = /** @class */ (function () {
    function NormalDiscount() {
    }
    NormalDiscount.prototype.discountCalculator = function (price, qyt, level) {
        if (price * qyt >= 1000 && qyt >= 3) {
            return 0.85;
        }
        return 1;
    };
    return NormalDiscount;
}());
//價錢的計算
var TotalCalculator = /** @class */ (function () {
    function TotalCalculator() {
    }
    TotalCalculator.prototype.Discount = function (price, qyt, level) {
        var total = price * qyt;
        var discountItem;
        var members = [
            { level: 'VIP', discountItem: new VipDiscount() },
            { level: 'Normal', discountItem: new NormalDiscount() }
        ];
        for (var i = 0; i < members.length; i++) {
            var nowMember = members[i];
            if (level === nowMember.level) {
                discountItem = nowMember.discountItem;
                return discountItem.discountCalculator(price, qyt, level) * total;
            }
        }
    };
    return TotalCalculator;
}());
//頁面
$(function () {
    $("button").click(function () {
        var newtotal = { price: $('#price').val(), qyt: $('#qyt').val(), level: $('#level').val() };
        var price = newtotal.price;
        var qyt = newtotal.qyt;
        var level = newtotal.level;
        var result = new TotalCalculator().Discount(price, qyt, level);
        if (price <= 0 || qyt <= 0) {
            alert('請填入正確的 價錢 與 數量');
        }
        $('#total').val(result);
    });
});
//# sourceMappingURL=app.js.map