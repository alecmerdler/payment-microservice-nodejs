"use strict";

var Rx = require("rx");

// TODO: Use RxJS to return Observables
class MessageServiceMQTT {

    constructor(mqtt, brokerURI) {
        if (mqtt == undefined) {
            throw Error("No 'mqtt' argument given");
        }
        if (brokerURI == undefined) {
            throw Error("No 'brokerURI' argument given");
        }
        this.client = mqtt.connect(brokerURI);
        this.actions = {};
        this.subscriptions = new Map();
        this.messages = [];

        this.client.on("connect", () => {
            console.log("connected to MQTT broker at " + brokerURI);
        });

        this.client.on("message", (mqttTopic, mqttMessage) => {
            console.log(JSON.parse(mqttMessage.toString()));
            this.messages.push(mqttMessage);
            var incomingTopic = mqttTopic.split("/");

            Rx.Observable.pairs(this.subscriptions)
                .filter((subscription) => {
                    var [topic, subscribers] = subscription;
                    topic = topic.split("/");
                    var include = true;
                    if (incomingTopic.length > topic.length) {
                        include = false;
                    }
                    else {
                        for (var i = 0; i < incomingTopic.length; i++) {
                            if (!topic[i] === "+" &&
                                !topic[i] === incomingTopic[i]) {
                                include = false;
                            }
                        }
                    }

                    return include;
                })
                .subscribe((subscription) => {
                    var [topic, subscribers] = subscription;
                    subscribers.forEach((subscriber) => {
                        console.log(subscriber);
                        // subscriber.onNext(mqttMessage);
                    })
                });
        });
    }

    subscribe(topic, subscribeToAll) {
        return Rx.Observable.create((subscriber) => {
            var wildcard = "";
            if (subscribeToAll) {
                wildcard = "/+";
            }
            this.client.subscribe(topic.concat(wildcard));
            if (Object.keys(this.subscriptions).includes(topic)) {
                this.subscriptions[topic].push(subscriber);
            }
            else {
                this.subscriptions[topic] = [subscriber];
            }
        });
    }

    unsubscribe(topic) {
        if (this.subscriptions[topic] !== undefined) {
            this.client.unsubscribe(topic);
            delete this.subscriptions[topic];
        }
    }

    sendMessage(topic, message) {
        this.client.publish(topic, message);
    }
}

module.exports = MessageServiceMQTT;