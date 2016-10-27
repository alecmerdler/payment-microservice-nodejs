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

    });

    describe("cancelPayment", () => {

    });
});