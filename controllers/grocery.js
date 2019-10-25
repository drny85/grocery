const Grocery = require( '../models/Grocery' );
const asyncHandler = require( '../middlewares/async' );
const ErrorResponse = require( '../utils/errorResponse' );

// @desc     Create grocery
// @route    POST /api/grocery
// @access   Private
exports.createGrocery = asyncHandler( async ( req, res, next ) => {

    const body = {
        ...req.body
    };
    body.userId = req.user.id


    const grocery = await Grocery.create( body );

    return res.status( 200 ).json( {
        success: true,
        data: grocery
    } );

} );

// @desc     Get groceries
// @route    GET /api/grocery
// @access   Private

exports.getGroceries = asyncHandler( async ( req, res, next ) => {

    const groceries = await Grocery.find();
    return res.status( 200 ).json( {
        success: true,
        data: groceries
    } )

} );


// @desc     Delete a grocery
// @route    DELETE api/grocery/:id
// @access   Private

exports.deleteGrocery = asyncHandler( async ( req, res, next ) => {

    const grocery = await Grocery.findById( req.params.id );
    //if grocery was found then delete it
    await grocery.remove();

    return res.status( 200 ).json( {
        success: true,
        data: {}
    } );

} );

// @desc     Update a grocery
// @route    PUT api/grocery/:id
// @access   Private

exports.updateGrocery = asyncHandler( async ( req, res, next ) => {



    const query = await Grocery.findById( req.params.id );
    if ( !query ) {
        return next( new ErrorResponse( `no data found with ID ${req.params.id}`, 404 ) );
    }
    //if grocery was found then delete it
    const grocery = await Grocery.findByIdAndUpdate( req.params.id, req.body, {
        new: true,
        runValidators: true
    } );

    return res.status( 200 ).json( {
        success: true,
        data: grocery
    } );

} )

// @desc     Get a grocery
// @route    PUT api/grocery/:id
// @access   Private

exports.getGrocery = asyncHandler( async ( req, res, next ) => {



    const grocery = await Grocery.findById( req.params.id );


    return res.status( 200 ).json( {
        success: true,
        data: grocery
    } );

} )