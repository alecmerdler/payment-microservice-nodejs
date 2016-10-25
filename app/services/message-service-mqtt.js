"use strict";

class MessageService {

    constructor(mqtt) {
        this.client = mqtt.connect("tcp://52.25.184.170:1884");
        this.actions = {};

        this.client.on("connect", function() {
            client.subscribe("payments");
        });

        this.client.on("message", function(topic, message) {
            if (this.actions.topic !== undefined) {
                this.actions.topic(message);
            }
        });
    }

    subscribe(topic, callback) {
        this.client.subscribe(topic);
        this.actions.topic = callback;
    }

    unsubscribe(topic) {
        this.client.unsubscribe(topic);
        this.actions.topic.delete();
    }
}

module.exports = MessageService;