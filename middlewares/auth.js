// @ts-nocheck
const jwt = require( 'jsonwebtoken' );
const asyncHandler = require( './async' );
const ErrorResponse = require( '../utils/errorResponse' );
const User = require( '../models/User' );

exports.auth = asyncHandler( async ( req, res, next ) => {
    let token;
    if ( req.headers.authorization && req.headers.authorization.startsWith( 'Bearer' ) ) {
        token = req.headers.authorization.split( ' ' )[ 1 ];
    }

    if ( !token ) {
        return next( new ErrorResponse( 'Not Authorired', 401 ) )
    }

    try {
        const decoded = jwt.verify( token, process.env.JWT_SECRET );

        req.user = await User.findById( decoded.id ).select('-password');

        next()
    } catch ( error ) {
        return next( new ErrorResponse( 'Not Authorired', 401 ) )
    }
} )

exports.admin = asyncHandler( async ( req, res, next ) => {
    let token;
    if ( req.headers.authorization && req.headers.authorization.startsWith( 'Bearer' ) ) {
        token = req.headers.authorization.split( ' ' )[ 1 ];
    }

    if ( !token ) {
        return next( new ErrorResponse( 'Not Authorired', 401 ) )
    }

    try {
        const decoded = jwt.verify( token, process.env.JWT_SECRET );

        const user = await User.findById( decoded.id );
        if ( user.role !== 'admin' ) {
            return next( new ErrorResponse( 'Not Authorired', 401 ) )
        }

        next()
    } catch ( error ) {
        return next( new ErrorResponse( 'Not Authorired', 401 ) )
    }
} )