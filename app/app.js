"use strict";

var express = require("express");
var app = express();
var mqtt = require("mqtt");
var MessageServiceMQTT = require("./services/message-service-mqtt");
var Rx = require("rx");

function init() {
    var messageService = new MessageServiceMQTT(mqtt);
    messageService.subscribe("users", function(message) {
        console.log(message.toString());
    });

    app.get("/", function(request, response) {
        response.send("Hello World!");
    });

    app.listen(3000, function() {
        console.log("payment-microservice-nodejs listening on http://localhost:3000");
    });
}

init();


