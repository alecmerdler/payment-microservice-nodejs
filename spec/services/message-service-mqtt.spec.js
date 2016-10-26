"use strict";

var MessageServiceMQTT = require("../../app/services/message-service-mqtt");

describe("MessageServiceMQTT", function() {
    var mqttMock;
    var clientMock;
    var brokerURI;
    var messageService;

    beforeEach(function() {
        brokerURI = "tcp://52.25.184.170:1884";
        clientMock = {
            on: function(event, callback) {},
            subscribe: function(topic, callback) {},
            unsubscribe: function(topic) {},
            publish: function(topic, message) {}
        };
        mqttMock = {
            connect: function(serverURI) {
                return clientMock;
            },
        };
        spyOn(mqttMock, "connect").and.callThrough();
        spyOn(clientMock, "on").and.callThrough();
        spyOn(clientMock, "subscribe").and.callThrough();
        spyOn(clientMock, "unsubscribe").and.callThrough();
        spyOn(clientMock, "publish").and.callThrough();
        messageService = new MessageServiceMQTT(mqttMock, brokerURI);
    });



    describe("constructor", function() {

        it("connects to MQTT server", function() {
            expect(mqttMock.connect).toHaveBeenCalled();
        });


        it("sets client 'connect' event callback", function() {
            expect(clientMock.on.calls.ar)
        })
    });



    describe("subscribe", function() {

    });



    describe("unsubscribe", function() {

    });



    describe("sendMessage", function() {

    });
});