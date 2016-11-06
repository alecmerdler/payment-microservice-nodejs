"use strict";

var mqtt = require("mqtt");
var Rx = require("rx");
var MessageServiceMQTT = require("../services/message-service-mqtt");
var PaymentServiceMock = require("../services/payment-service-mock");
var messageService = new MessageServiceMQTT(mqtt);
var paymentService = new PaymentServiceMock();
var appName = "payment-microservice-nodejs";

class ApplicationController {

    constructor() {

    }

    root(request, response) {
        response
            .status(200)
            .json({"name": appName});
    }

    healthcheck(request, response) {
        response
            .status(200)
            .json({"status": "running"});
    }

    initialize(request, response) {
        messageService.subscribe("purchases", true)
            .subscribe((message) => {
            console.log(message.toString());
        });
        messageService.subscribe("meals/+/purchase", false)
            .subscribe((message) => {
            console.log(message.toString());
        });

        response
            .status(200)
            .json({"status": "initialized"});
    }
}

module.exports = new ApplicationController();