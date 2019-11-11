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
        unique: [true, 'this email already exist'],
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email is invalid']
    },
    password: {
        type: String,
        required: [true, 'please enter a password'],
        minlength: [6, 'please enter at least 6 characters'],
        select: false
    },
    role: {
        type: String,
        enum: ['visitor', 'user', 'admin'],
        default: 'visitor'

    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})



module.exports = mongoose.model('User', userSchema);

