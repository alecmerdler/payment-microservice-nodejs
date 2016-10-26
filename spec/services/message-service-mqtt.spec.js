"use strict";

var MessageServiceMQTT = require("../../app/services/message-service-mqtt");

describe("MessageServiceMQTT", () => {
    var mqttMock;
    var clientMock;
    var brokerURI;
    var messageService;

    beforeEach(() => {
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

    describe("constructor", () => {

        it("connects to MQTT server", () => {
            expect(mqttMock.connect).toHaveBeenCalled();
        });

        it("sets client 'connect' event callback", () => {
            expect(clientMock.on.calls.argsFor(0)[0]).toEqual("connect");
        });

        it("sets client 'message' callback", () => {
            expect(clientMock.on.calls.argsFor(1)[0]).toEqual("message");
        });
    });

    describe("subscribe", () => {
        var topic;
        var callback;

        beforeEach(() => {
            topic = "test";
            callback = function() {};
        });

        it("calls client method to subscribe to given topic", () => {
            messageService.subscribe(topic, callback);

            expect(clientMock.subscribe.calls.argsFor(0)).toEqual([topic]);
        });

        it("adds given callback to actions object using topic as property name", () => {
            messageService.subscribe(topic, callback);

            expect(Object.keys(messageService.actions)).toContain(topic);
            expect(messageService.actions[topic]).toEqual(callback);
        });
    });

    describe("unsubscribe", () => {
        var topic;

        beforeEach(() => {
            topic = "test";
        });

        it("does nothing if not subscribed to given topic", () => {
            messageService.unsubscribe(topic);

            expect(clientMock.unsubscribe).not.toHaveBeenCalled();
        });

        it("calls client method to unsubscribe from given topic when subscribed", () => {
            messageService.subscribe(topic, function() {});
            messageService.unsubscribe(topic);

            expect(clientMock.unsubscribe).toHaveBeenCalled();
        });

        it("removes callback from actions object when subscribed", () => {
            messageService.subscribe(topic, function() {});
            messageService.unsubscribe(topic);

            expect(Object.keys(messageService.actions)).not.toContain(topic);
        });
    });

    describe("sendMessage", () => {
        var topic;
        var message;

        beforeEach(() => {
            topic = "test";
            message = "Cool message";
        });

        it("calls client method to publish message to topic", () => {
            messageService.sendMessage(topic, message);

            expect(clientMock.publish.calls.argsFor(0)).toEqual([topic, message]);
        });
    });
});