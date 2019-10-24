const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    items: [Object],

    quantity: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})



module.exports = mongoose.model('Cart', cartSchema);