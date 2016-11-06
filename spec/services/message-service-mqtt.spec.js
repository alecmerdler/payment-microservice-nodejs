"use strict";

var MessageServiceMQTT = require("../../app/services/message-service-mqtt");
var Rx = require("rx");

describe("MessageServiceMQTT", () => {
    var mqttMock;
    var clientMock;
    var brokerURI;
    var messageService;

    beforeEach(() => {
        brokerURI = "tcp://52.25.184.170:1884";
        clientMock = {
            on: jasmine.createSpy("on"),
            subscribe: jasmine.createSpy("subscribe"),
            unsubscribe: jasmine.createSpy("unsubscribe"),
            publish: jasmine.createSpy("publish")
        };
        mqttMock = {
            connect: function(serverURI) {
                return clientMock;
            },
        };
        spyOn(mqttMock, "connect").and.callThrough();
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

        beforeEach(() => {
            topic = "test";
        });

        it("calls client method to subscribe to given topic", () => {
            messageService.subscribe(topic, false)
                .subscribe((message) => {});

            expect(clientMock.subscribe.calls.argsFor(0)).toEqual([topic + "/"]);
        });


        it("calls client method to subscribe to given topic with wildcard when given true for 'subscribeToAll'", () => {
            messageService.subscribe(topic, true)
                .subscribe((message) => {});

            expect(clientMock.subscribe.calls.argsFor(0)).toEqual([topic + "/+"]);
        });

        it("adds new Subscriber to subscribers map using topic as key name", () => {
            messageService.subscribe(topic, false)
                .subscribe((message) => {});

            expect(Object.keys(messageService.subscribers)).toContain(topic);
            expect(messageService.subscribers[topic][0] instanceof Rx.Observer).toBe(true);
        });

        it("returns an Observable", () => {
            var observable = messageService.subscribe(topic, true);

            expect(observable instanceof Rx.Observable).toBe(true);
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
            messageService.subscribe(topic, false)
                .subscribe((message) => {});
            messageService.unsubscribe(topic);

            expect(clientMock.unsubscribe).toHaveBeenCalled();
        });

        it("removes callback from actions object when subscribed", () => {
            messageService.subscribe(topic, false)
                .subscribe((message) => {});
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