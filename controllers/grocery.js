// @ts-nocheck
const Grocery = require( '../models/Grocery' );
const asyncHandler = require( '../middlewares/async' );
const ErrorResponse = require( '../utils/errorResponse' );
const User = require( '../models/User' );

// @desc     Create grocery
// @route    POST /api/grocery
// @access   Private
exports.createGrocery = asyncHandler( async ( req, res, next ) => {

    const body = {
        ...req.body
    };
    //set the userId to the logged in user
    body.userId = req.user.id;


    let grocery;



    //check if phone was provided
    if ( !body.phone ) {
        return next( new ErrorResponse( 'please provide a phone number', 400 ) );
    }

    grocery = await Grocery.findOne( {
        userId: req.user.id,
        name: body.name
    } )

    if ( grocery ) {
        return next( new ErrorResponse( 'this grocery name already exist, change the name', 400 ) );
    }


    const user = await User.findById( req.user.id ).populate( 'groceries' );
    // add grocries to user's groceries andd check if user is admin
    if ( user.role === 'admin' ) {
        for ( let item in user.groceries ) {
            // check if none of the groceries owned by user are not in pending status
            if ( user.groceries[ item ].status === 'pending' ) {
                return next( new ErrorResponse( 'You already sent a request to add a grocery and it is in pending status', 400 ) );
            }

        }

    }
    //save gorcery to database
    grocery = await Grocery.create( body );

    user.groceries.push( grocery );
    await user.save();


    return res.status( 200 ).json( {
        success: true,
        data: grocery
    } );

} );

// @desc     Get groceries
// @route    GET /api/grocery
// @access   Private

exports.getGroceries = asyncHandler( async ( req, res, next ) => {

    const groceries = await Grocery.find().populate( 'userId', '_id name' ).populate( 'items' );
    return res.status( 200 ).json( {
        success: true,
        count: groceries.length,
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

// @desc     Get groceris by Owner or user
// @route    GET api/grocery/user
// @access   Private

exports.getGroceriesByUser = asyncHandler( async ( req, res, next ) => {

    const groceries = await Grocery.find( {
        userId: {
            _id: req.user.id
        }
    } )


    return res.status( 200 ).json( {
        success: true,
        count: groceries.length,
        data: groceries
    } );

} )