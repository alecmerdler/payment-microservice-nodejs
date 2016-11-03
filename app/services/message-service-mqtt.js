"use strict";

// TODO: Use RxJS to return Observables
class MessageService {

    constructor(mqtt, brokerURI) {
        this.client = mqtt.connect(brokerURI);
        this.actions = {};

        this.client.on("connect", () => {
            console.log("connected to MQTT broker at " + brokerURI);
        });

        this.client.on("message", (topic, message) => {
            if (this.actions.topic !== undefined) {
                this.actions[topic](message);
            }
        });
    }

    subscribe(topic, callback) {
        this.client.subscribe(topic);
        this.actions[topic] = callback;
    }

    unsubscribe(topic) {
        if (this.actions[topic] !== undefined) {
            this.client.unsubscribe(topic);
            delete this.actions[topic];
        }
    }

    sendMessage(topic, message) {
        this.client.publish(topic, message);
    }
}

module.exports = MessageService;