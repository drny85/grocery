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
    }
} );


module.exports = mongoose.model( 'Category', categorySchema );