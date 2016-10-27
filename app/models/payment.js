"use strict";

class Payment {

    constructor(buyer, seller, item, price, discount) {
        if (buyer === undefined) {
            throw Error("No 'buyer' argument given")
        }
        if (seller === undefined) {
            throw Error("No 'seller' argument given")
        }
        if (item === undefined && item.id == undefined) {
            throw Error("No 'item' argument given")
        }
        if (price === undefined) {
            throw Error("No 'price' argument given")
        }
        if (discount === undefined) {
            throw Error("No 'discount' argument given")
        }
        this.buyer = buyer;
        this.seller = seller;
        this.itemId = item.id;
        this.price = price;
        this.discount = discount;
        // FIXME: Generate unique id
        this.id = 1;
        this.confirmed = false;
    }

    confirm() {
        this.confirmed = true;
    }
}

module.exports = Payment;