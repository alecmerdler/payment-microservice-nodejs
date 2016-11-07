"use strict";

var Rx = require("rx");


class ApplicationController {

    constructor(appName, paymentService, messageService) {
        this.appName = appName;
        this.paymentService = paymentService;
        this.messageService = messageService;

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
        this.messageService.subscribe("meals", false)
            .subscribe((message) => {
                console.log(message.toString());
            });

        response
            .status(200)
            .json({"status": "initialized"});
    }
}

module.exports = ApplicationController;