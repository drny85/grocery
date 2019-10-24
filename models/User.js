const mongoose = require('mongoose');
const Cart = require('../models/Cart')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter a name"]
    },

    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    email: {
        type: String,
        required: [true, "please enter an email"],
        unique: true
    }
})



module.exports = mongoose.model('User', userSchema);

