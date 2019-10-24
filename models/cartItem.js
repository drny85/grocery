class CartItem {
    constructor(items) {
        this.items = items;
        this.qty = 0
    }

    calculateQty() {
        for (let item in this.items) {
            this.qty++;
        }
    }
}

module.exports = CartItem;