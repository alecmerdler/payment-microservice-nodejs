"use strict";

var Rx = require("rx");
var Purchase = require("../models/purchase");
var Unirest = require("unirest");


class ApplicationController {

    constructor(appName, paymentService, messageService) {
        this.appName = appName;
        this.paymentService = paymentService;
        this.messageService = messageService;
        this.messages = [];

        // Bind methods to instance (http://stackoverflow.com/questions/34680450/)
        this.root = this.root.bind(this);
        this.healthcheck = this.healthcheck.bind(this);
        this.initialize = this.initialize.bind(this);
    }

    root(request, response) {
        response
            .status(200)
            .json({"name": this.appName});
    }

    healthcheck(request, response) {
        response
            .status(200)
            .json({"status": "running"});
    }

    initialize(request, response) {
        this.messageService.subscribe("meals/+/purchase", false)
            .subscribe((message) => {
                var newPurchase = new Purchase(message.getState()["userId"],
                                               null,
                                               message.getResourceId(),
                                               message.getState()["price"],
                                               Date.now(),
                                               "unconfirmed");
                console.log(JSON.stringify(newPurchase));
            });

        response
            .status(200)
            .json({"status": "initialized"});
    }
}

module.exports = ApplicationController;