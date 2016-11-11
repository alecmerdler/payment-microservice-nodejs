"use strict";

class Message {

    constructor(resourceName, resourceId, action, state, changes) {
        if (resourceName === undefined) {
            throw Error("No 'resourceName' argument given")
        }
        if (resourceId === undefined) {
            throw Error("No 'resourceId' argument given")
        }
        if (action === undefined) {
            throw Error("No 'action' argument given")
        }
        if (state === undefined) {
            throw Error("No 'state' argument given")
        }
        if (changes === undefined) {
            throw Error("No 'changes' argument given")
        }
        this.resourceName = resourceName;
        this.resourceId = resourceId;
        this.action = action;
        this.state = state;
        this.changes = changes;
    }

    getResourceName() {
        return this.resourceName;
    }

    getResourceId() {
        return this.resourceId;
    }

    getAction() {
        return this.action;
    }

    getState() {
        return this.state;
    }

    getChanges() {
        return this.changes;
    }

    static fromJSON(json) {

    }
}

module.exports = Message;