const mongoose = require( 'mongoose' );

const categorySchema = new mongoose.Schema( {
    name: {
        type: String,
        required: [ true, 'Please provide a name' ],
        lowercase: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    grocery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grocery',
        required: true
    }
} );


module.exports = mongoose.model( 'Category', categorySchema );