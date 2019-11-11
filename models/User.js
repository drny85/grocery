// @ts-nocheck
const mongoose = require( 'mongoose' );
//const Cart = require( '../models/Cart' )
const bycrypt = require( 'bcryptjs' );
const jwt = require( 'jsonwebtoken' );


const userSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: [ true, "please enter a name" ]
    },

    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    email: {
        type: String,
<<<<<<< HEAD
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
=======
        required: [ true, "please enter an email" ],
        unique: [ true, 'email already exist' ],
        match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email' ]
    },
    password: {
        type: String,
        required: [ true, 'please enter a password' ],
        minlength: [ 6, 'please enter at least 6 characters' ]
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    resetToken: String,
    resetExpire: Date,
    role: {
        type: String,
        enum: [ 'visitor', 'user', 'admin' ],
        default: 'visitor'
    },
    groceries: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grocery'
    } ]


} )

//Encrypt password using bcrypt
userSchema.pre( 'save', async function ( next ) {
    const salt = await bycrypt.genSalt( 10 );
    this.password = await bycrypt.hash( this.password, salt );

} );

userSchema.methods.getSignedToken = function () {
    return jwt.sign( {
        id: this._id
    }, process.env.JWT_SECRET );
}
>>>>>>> 2e4aae5ed04c4bad4694267ee46137ecf5d5e691

//match password
userSchema.methods.matchPassword = async function ( psw ) {
    return await bycrypt.compare( psw, this.password );
}



module.exports = mongoose.model( 'User', userSchema );