const mongoose = require( 'mongoose' );
const Item = require( '../models/Item' );

const orderSchema = new mongoose.Schema( {
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    address: {
        type: String,
        required: [ true, 'please enter an address' ]
    },
    apt: String,
    city: {
        type: String,
        required: [ true, 'please enter a city' ]
    },
    zipcode: {
        type: String,
        required: [ true, 'please enter a zipcode' ],
        minlength: [ 5, 'invalid zipcode' ],
        maxlength: [ 5, 'invalid zipcode' ]
    },

    phone: {
        type: String,
        required: [ true, 'please enter a phone number' ]
    },

    paymentType: {
        type: String,
        enum: [ 'cash', 'debit', 'credit' ],
        default: 'cash'
    },
    items: Object,
    orderPlacedOn: {
        type: Date,
        default: Date.now
    }
} )


module.exports = mongoose.model( 'Order', orderSchema );