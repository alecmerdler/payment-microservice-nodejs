"use strict";

var express = require("express");
var applicationController = require("./controllers/application-controller");

class Server {

    constructor() {
        var app = express();
        var appName = "payment-microservice-nodejs";
        var port = 3000;

        app.get("/",            applicationController.root);
        app.get("/healthcheck", applicationController.healthcheck);
        app.post("/initialize", applicationController.initialize);

        var server = app.listen(port, () => {
            console.log(appName + " listening on http://localhost:" + port);
        });

        return server;
    }
}

module.exports = new Server();


