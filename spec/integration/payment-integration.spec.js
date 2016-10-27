"use strict";

var Unirest = require("unirest");
var mqtt = require("mqtt");

describe("Payment Integration Test", () => {
    var serviceURL = "http://localhost:3000";
    var server;
    var messageClient;

    beforeAll((done) => {
        var brokerURI = "tcp://52.25.184.170:1884";
        messageClient = mqtt.connect(brokerURI);
        server = require("../../app/server");
        server.on("listening", () => {
            done();
        });
    });

    afterAll((done) => {
        messageClient.end(true);
        server.close();
        server.on("close", () => {
            done();
        });
        server = undefined;
    });

    describe("GET /", () => {

        it("responds with 200 and microservice name", (done) => {
            Unirest.get(serviceURL + "/")
                .end((response) => {
                    expect(response.status).toEqual(200);
                    done();
                });
        });
    });

    describe("GET /healthcheck", () => {

        it("responds with 200 and health status", (done) => {
            Unirest.get(serviceURL + "/healthcheck")
                .end((response) => {
                    expect(response.status).toEqual(200);
                    expect(response.body).toEqual({"status": "running"});
                    done();
                });
        });
    });

    describe("GET /initialize", () => {

        it("responds with 200 and initialization status", (done) => {
            Unirest.post(serviceURL + "/initialize")
                .end((response) => {
                    expect(response.status).toEqual(200);
                    expect(response.body).toEqual({"status": "initialized"});
                    done();
                });
        });
    });

    describe("message to 'payment' topic", () => {
        var topic;

        beforeEach(() => {
            topic = "payment";
        });

        it("does nothing if '/initialize' route has not been hit", (done) => {
            messageClient.publish(topic, "Cool message");
            done();
        });

        it("does something with message", (done) => {
            Unirest.get(serviceURL + "/initialize")
                .end((response) => {
                    messageClient.publish(topic, "Cool message");
                    done();
                });
        });
    });
});