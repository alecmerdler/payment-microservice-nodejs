"use strict";

var Unirest = require("unirest");

describe("Payment Integration Test", () => {
    var serviceURL = "http://localhost:3000";
    var server;

    beforeEach(() => {
        server = require("../../app/server");
    });

    afterEach(() => {
        server.close();
    });

    describe("GET /", () => {

        it("responds with 200 and microservice name", () => {
            Unirest.get(serviceURL + "/")
                .end((response) => {
                    expect(response.status).toEqual(200);
                });
        });
    });

    describe("GET /healthcheck", () => {

        it("responds with 200 and health status", () => {
            Unirest.get(serviceURL + "/healthcheck")
                .end((response) => {
                    expect(response.status).toEqual(200);
                    expect(response.body).toEqual({"status": running});
                });
        });
    });

    describe("GET /initialize", () => {

        it("responds with 200 and initialization status", () => {
            Unirest.get(serviceURL + "/")
                .end((response) => {
                    expect(response.status).toEqual(200);
                    expect(response.body).toEqual({"status": "initialized"});
                });
        });
    });
});