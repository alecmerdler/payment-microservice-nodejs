"use strict";

class Purchase {

    constructor(dinerId, chefId, mealId, price, timestamp, status) {
        this.dinerId = dinerId;
        this.chefId = chefId;
        this.mealId = mealId;
        this.price = price;
        this.timestamp = timestamp;
        this.status = status;
    }
}

module.exports = Purchase;