"use strict";

var Payment = require("../../app/models/payment");

class PaymentServiceMock {

    constructor() {

    }

    createPayment(buyer, seller, item, price, discount) {
        var payment = new Payment(buyer, seller, item, price, discount);

        return payment;
    }

    confirmPayment() {
        throw Error("Not implemented");
    }

    cancelPayment() {
        throw Error("Not implemented");
    }
}

module.exports = PaymentServiceMock;