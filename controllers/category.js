// @ts-nocheck
const Category = require( '../models/Category' );
const asyncHandler = require( '../middlewares/async' );
const ErrorResponse = require( '../utils/errorResponse' );
const User = require( '../models/User' );



// @desc     Add category 
// @route    POST /api/category
// @access   Private -- Only admin
exports.addCategory = asyncHandler( async ( req, res, next ) => {

    const found = await Category.findOne( {
        name: req.body.name,
        userId: req.user.id
    } );
    // check if the owner is who is adding

    if ( !req.body.grocery ) {
        return next( new ErrorResponse( `please select a store/grocery for this item`, 400 ) );
    }

    if ( found && req.user.id === found.userId.toString() && found.name === req.body.name ) {
        return next( new ErrorResponse( `Category name already exist`, 400 ) );
    }

    const user = await User.findById( req.user.id );

    for ( let i in user.groceries ) {
        if ( user.groceries[ i ].toString() !== req.body.grocery ) {
            return next( new ErrorResponse( 'you do not own this grocery', 401 ) );
        }
    }

    const category = await Category.create( {
        name: req.body.name,
        grocery: req.body.grocery,
        userId: req.user.id
    } );

    return res.status( 200 ).json( {
        success: true,
        data: category
    } )
} )


// @desc     Get all categories 
// @route    GET /api/category
// @access   Public
exports.getCategories = asyncHandler( async ( req, res, next ) => {

    const categories = await Category.find();

    return res.status( 200 ).json( {
        success: true,
        data: categories
    } )
} )

// @desc     Delete category 
// @route    DELETE /api/category/:id
// @access   Private -- Only admin
exports.deleteCategory = asyncHandler( async ( req, res, next ) => {

    const category = await Category.findById( req.params.id )

    if ( req.user.id !== category.userId.toString() ) {
        return next( new ErrorResponse( `Not authorized to delete`, 401 ) );
    }

    category.remove();

    return res.status( 200 ).json( {
        success: true,
        data: {}
    } )
} )

// @desc     Update category 
// @route    PUT /api/category/:id
// @access   Private -- Only admin
exports.updateCategory = asyncHandler( async ( req, res, next ) => {


    const found = await Category.findOne( {
        name: req.body.name,
        userId: req.user.id
    } );
    // check if the owner is who is adding

    if ( found && req.user.id === found.userId.toString() && found.name === req.body.name ) {
        return next( new ErrorResponse( `Category name already exist`, 400 ) );
    }

    if ( req.user.id !== found.userId.toString() ) {
        return next( new ErrorResponse( `Not authorized to update`, 401 ) );
    }

    const category = await Category.findByIdAndUpdate( req.params.id, req.body, {
        new: true,
        runValidators: true
    } )

    return res.status( 200 ).json( {
        success: true,
        data: category
    } )
} )


// @desc     Get single category
// @route    GET /api/category/:id
// @access   Private -- Only admin
exports.getCategory = asyncHandler( async ( req, res, next ) => {

    const category = await Category.findById( req.params.id )

    return res.status( 200 ).json( {
        success: true,
        data: category
    } )
} )