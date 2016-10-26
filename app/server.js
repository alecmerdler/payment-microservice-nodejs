"use strict";

var express = require("express");
var mqtt = require("mqtt");
var MessageServiceMQTT = require("./services/message-service-mqtt");
var Rx = require("rx");

class Server {

    constructor() {
        var app = express();
        var messageService = new MessageServiceMQTT(mqtt);
        var appName = "payment-microservice-nodejs";
        var port = 3000;

        app.get("/", (request, response) => {
            response
                .status(200)
                .json({"name": appName});
        });

        app.get("/healthcheck", (request, response) => {
            response
                .status(200)
                .json({"status": "running"});
        });

        app.post("/initialize", (request, response) => {
            messageService.subscribe("payment", (message) => {
                console.log(message.toString());
            });

            response
                .status(200)
                .json({"status": "initialized"});
        });

        var server = app.listen(port, () => {
            console.log("payment-microservice-nodejs listening on http://localhost:" + port);
        });

        server.on("listening", () => {
            console.log("logging server as listening");
        });

        server.on("close", () => {
            console.log("logging server as closed");
        });

        return server;
    }
}

module.exports = new Server();


