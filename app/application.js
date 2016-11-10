"use strict";

var express = require("express");
var ApplicationController = require("./controllers/application-controller");
var mqtt = require("mqtt");
var MessageServiceMQTT = require("./services/message-service-mqtt");
var PaymentServiceMock = require("./services/payment-service-mock");


class Application {

    constructor() {
        var app = express();
        var appName = "payment-microservice-nodejs";
        var port = 3000;
        var brokerURI = "tcp://138.68.197.76:1883";
        var messageService = new MessageServiceMQTT(mqtt, brokerURI);
        var paymentService = new PaymentServiceMock();
        var applicationController = new ApplicationController(appName, paymentService, messageService);

        // Routes
        app.get("/",            applicationController.root);
        app.get("/healthcheck", applicationController.healthcheck);
        app.post("/initialize", applicationController.initialize);

        this.server = app.listen(port, () => {
            console.log(appName + " listening on http://localhost:" + port);
        });
    }

    getServer() {
        return this.server;
    }
}

module.exports = new Application();


