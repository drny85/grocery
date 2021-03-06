// @ts-nocheck
const ErrorResponse = require( '../utils/errorResponse' );
const asyncHandler = require( '../middlewares/async' );
const User = require( '../models/User' );

// @desc     register an user 
// @route    POST /api/auth/register
// @access   Public
exports.register = asyncHandler( async ( req, res, next ) => {

    const {
        name,
        email,
        password
    } = req.body;

    const found = await User.findOne( {
        email
    } );

    if ( found ) {
        return next( new ErrorResponse( `${email} is already taken`, 400 ) );
    }

    const user = await User.create( {
        name,
        email,
        password
    } );

    const token = user.getSignedToken();

    return res.status( 200 ).json( {
        success: true,
        token
    } )
} )

// @desc     login user 
// @route    POST /api/auth/login
// @access   Public

exports.login = asyncHandler( async ( req, res, next ) => {

    const {
        email,
        password
    } = req.body;

    console.log( email, password );

    //check if email and password were provided
    if ( !email || !password ) {
        return next( new ErrorResponse( 'Please provide email and password', 400 ) );
    }

    // check for user
    const user = await User.findOne( {
        email
    } ).select( '+password' );

    if ( !user ) {
        return next( new ErrorResponse( `no user found with email ${email}`, 401 ) );
    }

    //check if password matches
    const matched = await user.matchPassword( password );

    if ( !matched ) {
        return next( new ErrorResponse( 'Invalid email or password', 401 ) );
    }

    const token = user.getSignedToken();

    return res.status( 200 ).json( {
        success: true,
        token
    } )

} )

// @desc     Get current logged in user
// @route    POST /api/auth/me
// @access   Private

exports.getMe = asyncHandler( async ( req, res, next ) => {
    const user = await User.findById( req.user.id );

    return res.status( 200 ).json( {
        success: true,
        data: user
    } )
} )