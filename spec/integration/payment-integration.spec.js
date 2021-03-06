"use strict";

var Unirest = require("unirest");
var mqtt = require("mqtt");
var application = require("../../app/application");

describe("Payment Integration Test", () => {
    var serviceURL = "http://localhost:3000";
    var messageClient;

    beforeAll((done) => {
        var brokerURI = "tcp://52.25.184.170:1884";
        messageClient = mqtt.connect(brokerURI);
        application.getServer().on("listening", () => {
            done();
        });
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

    describe("message to 'meals/+/purchase' topic", () => {
        var topic;

        beforeEach(() => {
            topic = "meals/1/purchase";
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