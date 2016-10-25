"use strict";

var MessageServiceMQTT = require("../../app/services/message-service-mqtt");

describe("MessageServiceMQTT", function() {
    var mqttMock,
        messageService;

    beforeEach(function() {
        mqttMock = {
            connect: function(serverURI) {
                return {
                    on: function(event, callback) {}
                }
            },
        };
        spyOn(mqttMock, "connect").andCallThrough();
        messageService = new MessageServiceMQTT(mqttMock);
    });


    describe("constructor", function() {

        it("connects to MQTT server", function() {
            expect(mqttMock.connect).toHaveBeenCalled();
        });
    });
});