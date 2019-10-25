const mongoose = require( 'mongoose' );
const fs = require( 'fs' );
const path = require( 'path' );

const itemSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: [ true, 'Please add a name' ],
        trim: true,
        unique: [ true, 'This name already exist' ]
    },
    price: {
        type: String,
        required: [ true, 'Please add a price' ]
    },

    description: {
        type: String,
        default: ""
    },
    available: {
        type: Boolean,
        default: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [ true, 'Please select a category for this item' ]
    },

    imageURL: {
        type: String
        //required: [true, 'Please upload a photo for this item']

    },

    count: {
        type: Number,
        default: 1
    },
    addedAt: {
        type: Date,
        default: Date.now
    },

    grocery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grocery'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }



} )

//remove photo associate with item
itemSchema.pre( 'remove', function ( next ) {
    let imageToDelete = this.imageURL;
    const image = imageToDelete.split( '/' ).pop();

    const PATH = `${path.join(__dirname, '../public/uploads/')}${image}`
    try {
        fs.unlinkSync( PATH );
        console.log( `Photo deleted for item ${this.name}`.yellow )
    } catch ( error ) {
        console.log( error );
    }

    next()
} )

module.exports = mongoose.model( 'Item', itemSchema );