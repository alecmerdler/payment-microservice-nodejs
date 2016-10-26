"use strict";

var Unirest = require("unirest");
var mqtt = require("mqtt");

describe("Payment Integration Test", () => {
    var serviceURL = "http://localhost:3000";
    var server;
    var messageClient;

    beforeEach(() => {
        server = require("../../app/server");
        var brokerURI = "tcp://52.25.184.170:1884";
        messageClient = mqtt.connect(brokerURI);
    });

    afterEach(() => {
        server.close();
        messageClient.end(true);
    });

    describe("GET /", () => {

        it("responds with 200 and microservice name", () => {
            Unirest.get(serviceURL + "/")
                .end((response) => {
                    expect(response.status).toEqual(200);
                });
        });
    });

    describe("GET /healthcheck", () => {

        it("responds with 200 and health status", () => {
            Unirest.get(serviceURL + "/healthcheck")
                .end((response) => {
                    expect(response.status).toEqual(200);
                    expect(response.body).toEqual({"status": running});
                });
        });
    });

    describe("GET /initialize", () => {

        it("responds with 200 and initialization status", () => {
            Unirest.get(serviceURL + "/")
                .end((response) => {
                    expect(response.status).toEqual(200);
                    expect(response.body).toEqual({"status": "initialized"});
                });
        });
    });

    describe("messages to 'payment' topic", () => {

    });
});