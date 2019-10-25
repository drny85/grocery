const mongoose = require( 'mongoose' );

const gorcerySchema = new mongoose.Schema( {
    name: {
        type: String,
        required: [ true, 'Please add a name' ],
        unique: true,
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
        required: [ true, 'Please enter state' ],
        default: "New York"
    },
    zipcode: {
        type: String,
        required: [ true, 'Please enter a zipcode' ]
    },
    items: {
        type: [ mongoose.Schema.Types.ObjectId ],
        ref: 'Item'
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Uer'
    }
} );

module.exports = mongoose.model( "Grocery", gorcerySchema );