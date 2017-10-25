/// <reference path="../node_modules/@types/jquery/index.d.ts" />
// 介面
interface Discount {
    discountCalculator(
        price: number,
        qyt: number,
        level: string): number;
}

// VIP的折扣
class VipDiscount implements Discount {
    discountCalculator(price: number, qyt: number, level: string) {
        if (price * qyt >= 500) {
            return 0.8
        }
        return 1
    }
}

//一般會員的折扣
class NormalDiscount implements Discount {
    discountCalculator(price: number, qyt: number, level: string) {
        if (price * qyt >= 1000 && qyt >= 3) {
            return 0.85
        }
        return 1
    }
}

//價錢的計算
class TotalCalculator {
    Discount(price: number, qyt: number, level: string) {
        var total = price * qyt;
        var discountItem: Discount;
        var members = [
            { level: 'VIP', discountItem: new VipDiscount() },
            { level: 'Normal', discountItem: new NormalDiscount() }
        ]

        for (var i = 0; i < members.length; i++) {
            var nowMember = members[i];

            if (level === nowMember.level) {
                discountItem = nowMember.discountItem
                return discountItem.discountCalculator(price, qyt, level) * total
            }

        }
    }
}


//頁面

$(function () {
    $("button").click(function () {
        var newtotal = { price: $('#price').val(), qyt: $('#qyt').val(), level: $('#level').val()};
        let price = newtotal.price as number
        let qyt = newtotal.qyt as number
        let level = newtotal.level as string
        var result = new TotalCalculator().Discount(price, qyt, level) as number
        if(price<=0 || qyt <=0){
            alert('請填入正確的 價錢 與 數量')
        }
        $('#total').val(result);
    });
});

