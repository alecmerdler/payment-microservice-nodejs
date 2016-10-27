"use strict";

var Payment = require("../../app/models/payment");

class PaymentServiceMock {

    constructor() {
        this.unconfirmedPayments = [];
        this.confirmedPayments = [];
    }

    createPayment(buyer, seller, item, price, discount) {
        var payment = new Payment(buyer, seller, item, price, discount);

        return payment;
    }

    confirmPayment(paymentId) {
        var payment = null;
        this.unconfirmedPayments.forEach((unconfirmedPayment, index) => {
            if (unconfirmedPayment.id == paymentId) {
                payment = unconfirmedPayment;
                this.unconfirmedPayments.splice(index, 1);
                payment.confirm();
                this.confirmedPayments.push(payment);
            }
        });
        if (payment === null) {
            throw Error("No payment with given ID exists");
        }

        return payment;
    }

    cancelPayment(paymentId) {
        var payment = null;
        this.unconfirmedPayments.forEach((unconfirmedPayment, index) => {
            if (unconfirmedPayment.id == paymentId) {
                payment = unconfirmedPayment;
                this.unconfirmedPayments.splice(index, 1);
            }
        });
        if (payment === null) {
            throw Error("No payment with given ID exists");
        }
    }
}

module.exports = PaymentServiceMock;