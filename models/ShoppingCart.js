class ShoppingCart {
    constructor() {
        this.items = [],
        this.quantity = 0
        this.totalPrice = 0
    }

    addToCart(item) {
        if (!this.inCart(item)) {
            item.quantity = 1;
            this.items.push(item);
            this.quantity++;
            this.totalPrice = this.calculateTotal();
            this.calculateTotal();
        } else {
            this.items.forEach(i => {
                if (i._id === item._id) {
                    
                    i.quantity++;
                    
                    this.calculateTotal();
                }
            })

            this.quantity++;
            this.calculateTotal();
        }


    }


    inCart(item) {
        let found = false;
        this.items.forEach(i => {
            if (i._id === item._id) {
                found = true;
            } else {
                found = false
            }
        })

        return found;
    }

    calculateTotal() {
        this.totalPrice = 0
        this.items.forEach(item => {
            let price = item.price;
            let quantity = item.quantity;
            let amount = price * quantity;
            this.totalPrice += amount
        })

        return this.totalPrice;
    }


    deleteFromCart(item) {
        this.items.forEach(p => {
            if (p._id === item._id) {
                if (p.quantity <= 1) {
                    this.items.splice(p, 1);
                    this.quantity--;
                    this.calculateTotal();
                } else if (p._id === item._id && p.quantity > 1) {
                    p.quantity--;
                    this.quantity--;
                    this.calculateTotal();

                }
            }
        })


    }


}

module.exports = new ShoppingCart();