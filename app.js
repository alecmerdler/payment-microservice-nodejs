var express = require("express");
var app = express();
var mqtt = require("mqtt");
var client = mqtt.connect("tcp://52.25.184.170:1884");

client.on("connect", function() {
    client.subscribe("payments");
    client.subscribe("users");
});

client.on("message", function(topic, message) {
    console.log(message.toString());
});

app.get("/", function(request, response) {
   response.send("Hello World!");
});

app.listen(3000, function() {
    console.log("payment-microservice-nodejs listening on http://localhost:3000");
});
