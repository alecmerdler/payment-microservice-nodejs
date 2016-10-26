"use strict";

var express = require("express");
var app = express();
var mqtt = require("mqtt");
var MessageServiceMQTT = require("./services/message-service-mqtt");
var Rx = require("rx");

var appName = "payment-microservice-nodejs";
var port = 3000;

function init() {
    var messageService = new MessageServiceMQTT(mqtt);

    app.get("/", (request, response) => {
        response
            .status(200)
            .json({"name": appName});
    });

    app.get("/healthcheck", (request, response) => {
        response
            .status(200)
            .json("status", "running");
    });

    app.post("/initialize", (request, response) => {
        messageService.subscribe("payment", (message) => {
            console.log(message.toString());
        });

        response
            .status(200)
            .json({"status": "initialized"});
    });

    app.listen(port, () => {
        console.log("payment-microservice-nodejs listening on http://localhost:3000");
    });
}

init();


