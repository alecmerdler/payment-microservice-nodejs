"use strict";

var PaymentServiceMock = require("../../app/services/payment-service-mock");
var Payment = require("../../app/models/payment");

describe("PaymentServiceMock", () => {
   var paymentService;

    beforeEach(() => {
        paymentService = new PaymentServiceMock();
    });

    describe("createPayment", () => {
        var buyer;
        var seller;
        var item;

        beforeEach(() => {
            buyer = {"id": 1,};
            seller = {"id": 43};
            item = {"id": 73};
        });

        it("returns a new payment object", () => {
            var price = 43.21;
            var discount = 0;
            var payment = paymentService.createPayment(buyer, seller, item, price, discount);

            expect(payment).toBeDefined();
            expect(payment instanceof Payment).toBe(true);
        });
    });

    describe("confirmPayment", () => {
        var buyer;
        var seller;
        var item;

        beforeEach(() => {
            buyer = {"id": 1,};
            seller = {"id": 43};
            item = {"id": 73};
            paymentService.unconfirmedPayments = [];
            paymentService.confirmedPayments = [];
        });

        it("throws error if no payment with the given id exists", () => {
            try {
                var payment = paymentService.confirmPayment(42);
                fail("Should throw error");
            } catch(e) {
                expect(e.toString()).toEqual("Error: No payment with given ID exists");
            }
        });

        it("returns confirmed payment object when given id of existing payment", () => {
            var price = 32.00;
            var discount = 0;
            var payment = new Payment(buyer, seller, item, price, discount);
            paymentService.unconfirmedPayments.push(payment);
            var confirmedPayment = paymentService.confirmPayment(payment.id);

            expect(confirmedPayment.confirmed).toBe(true);
        });

        it("removes confirmed payment from unconfirmed payments list and adds to confirmed payments list", () => {
            var price = 32.00;
            var discount = 0;
            var payment = new Payment(buyer, seller, item, price, discount);
            paymentService.unconfirmedPayments.push(payment);
            var confirmedPayment = paymentService.confirmPayment(payment.id);

            expect(paymentService.unconfirmedPayments).not.toContain(payment);
            expect(paymentService.confirmedPayments).toContain(confirmedPayment);
        });
    });

    describe("cancelPayment", () => {
        var buyer;
        var seller;
        var item;

        beforeEach(() => {
            buyer = {"id": 1,};
            seller = {"id": 43};
            item = {"id": 73};
            paymentService.unconfirmedPayments = [];
            paymentService.confirmedPayments = [];
        });

        it("throws error if no payment with the given id exists", () => {
            try {
                var payment = paymentService.cancelPayment(42);
                fail("Should throw error");
            } catch(e) {
                expect(e.toString()).toEqual("Error: No payment with given ID exists");
            }
        });

        it("removes confirmed payment from unconfirmed payments list", () => {
            var price = 32.00;
            var discount = 0;
            var payment = new Payment(buyer, seller, item, price, discount);
            paymentService.unconfirmedPayments.push(payment);
            paymentService.cancelPayment(payment.id);

            expect(paymentService.unconfirmedPayments).not.toContain(payment);
        });
    });
});