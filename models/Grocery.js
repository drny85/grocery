const mongoose = require( 'mongoose' );

const gorcerySchema = new mongoose.Schema( {
    name: {
        type: String,
        required: [ true, 'Please add a name' ],
        trim: true,
        maxlength: [ 50, "Name can not be more than 50 characters" ],
        lowercase: true
    },
    address: {
        type: String,
        required: [ true, 'Please enter an address' ]
    },
    city: {
        type: String,
        required: [ true, 'Please enter city' ]
    },
    state: {
        type: String,
        required: [ true, 'Please enter state' ]

    },
    zipcode: {
        type: String,
        required: [ true, 'Please enter a zipcode' ]
    },
    phone: {
        type: String,
        required: [ 'true', 'please enter a phone number' ],
        minlength: [ 12, 'invalid phone number format' ],
        maxlength: [ 12, 'phone number is too large' ]
    },
    items: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"

    } ],

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    imageURL: {
        type: String,
        default: 'https://s3-media2.fl.yelpcdn.com/bphoto/LxAGWWxnA9uRxK5n_Xl3Fg/o.jpg'
    },

    status: {
        type: String,
        enum: [ 'active', 'suspended', 'pending' ],
        default: 'pending'
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
} );

module.exports = mongoose.model( "Grocery", gorcerySchema );