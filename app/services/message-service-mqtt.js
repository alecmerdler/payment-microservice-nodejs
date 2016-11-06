"use strict";

var Rx = require("rx");

// TODO: Use RxJS to return Observables
class MessageServiceMQTT {

    constructor(mqtt, brokerURI) {
        this.client = mqtt.connect(brokerURI);
        this.actions = {};
        this.subscribers = {};

        this.client.on("connect", () => {
            console.log("connected to MQTT broker at " + brokerURI);
        });

        this.client.on("message", (topic, message) => {
            if (this.actions[topic] !== undefined) {
                this.subscribers[topic].forEach((subscriber) => {
                    subscriber.onNext(message);
                });
            }
        });
    }

    subscribe(topic, subscribeToAll) {
        return Rx.Observable.create((subscriber) => {
            var wildcard = "";
            if (subscribeToAll) {
                wildcard = "+";
            }
            this.client.subscribe(topic + "/" + wildcard);
            if (Object.keys(this.subscribers).includes(topic)) {
                this.subscribers[topic].push(subscriber);
            }
            else {
                this.subscribers[topic] = [subscriber];
            }
        });
    }

    unsubscribe(topic) {
        if (this.subscribers[topic] !== undefined) {
            this.client.unsubscribe(topic);
            delete this.subscribers[topic];
        }
    }

    sendMessage(topic, message) {
        this.client.publish(topic, message);
    }
}

module.exports = MessageServiceMQTT;