"use strict";

class Purchase {

    constructor(id, dinerId, chefId, mealId, price, timestamp, status) {
        this.id = id;
        this.dinerId = dinerId;
        this.chefId = chefId;
        this.mealId = mealId;
        this.price = price;
        this.timestamp = timestamp;
        this.status = status;
    }
}

module.exports = Purchase;