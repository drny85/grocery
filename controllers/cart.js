const Cart = require( '../models/Cart' );
const Item = require( '../models/Item' )
const ShoppingCart = require( '../models/ShoppingCart' );
const ErrorResponse = require( '../utils/errorResponse' );
const asyncHandler = require( '../middlewares/async' );

// @desc     Add item to cart -- cart needs to be created on the front end when users visit the page
// @route    POST /api/cart
// @access   Public
exports.addToCart = asyncHandler( async ( req, res, next ) => {

    let cart;
    const {
        item,
        cartId
    } = req.body;

    //const found = await Cart.findById( req.cart._id )
    if ( cartId === "" || cartId === null || cartId === undefined ) {
        cart = await Cart.create( {} );

    } else {
        cart = await Cart.findById( cartId );
    }


    //add item to ShoppingCart class
    ShoppingCart.addToCart( item );

    const updatedCart = {
        items: ShoppingCart.items,
        quantity: ShoppingCart.quantity,
        totalPrice: ShoppingCart.totalPrice
    }

    const updated = await Cart.findByIdAndUpdate( cart._id,
        updatedCart, {
            new: true,
            runValidators: true
        } )



    return res.status( 200 ).json( {
        success: true,
        data: updated

    } )

} )

// @desc     Create cart -- // need to add fucntionally to create or get cart if already exist
// @route    POST /api/cart/createCart
// @access   Puclic
exports.createCart = async ( req, res, next ) => {

    try {
        const cart = await Cart.create( {} );
        console.log( cart );

        return res.status( 200 ).json( {
            success: true,
            data: cart
        } )
    } catch ( error ) {
        console.log( error );
        return res.status( 500 ).json( {
            success: false,
            error: "error creating cart"
        } )
    }
}

exports.deleteOrUpdateFromCart = async ( req, res, next ) => {

    try {

        const {
            item,
            cartId
        } = req.body;
        console.log( item );
        console.log( cartId );

        const cart = await Cart.findById( cartId ).populate( 'userId' );
        if ( !cart ) {
            return res.status( 404 ).json( {
                success: false,
                error: "There is no cart"
            } )
        }
        //remove item ShoppingCart class
        ShoppingCart.deleteFromCart( item );

        const updatedCart = {
            items: ShoppingCart.items,
            quantity: ShoppingCart.quantity,
            totalPrice: ShoppingCart.totalPrice
        }

        const updated = await Cart.findByIdAndUpdate( cartId,
            updatedCart, {
                new: true,
                runValidators: true
            } )


        return res.status( 200 ).json( {
            success: true,
            data: updated
        } )

    } catch ( error ) {
        console.log( error );

        return res.status( 500 ).json( {
            success: false,
            error: "error adding item to cart"
        } )
    }
}


// @desc     Delete cart
// @route    DELETE /api/cart/:id
// @access   Public

exports.deleteCart = async ( req, res, next ) => {
    const cartId = req.params.id;

    try {

        if ( !cartId ) {
            return res.status( 400 ).json( {
                success: false,
                error: "there is no cart"
            } )
        }
        const cart = await Cart.findById( cartId );
        if ( !cart ) {
            return res.status( 404 ).json( {
                success: false,
                error: " there is no cart"
            } )
        }

        await cart.remove();

        return res.status( 200 ).json( {
            success: true,
            data: {}
        } )
    } catch ( error ) {
        console.log( error );

        return res.status( 500 ).json( {
            success: false,
            error: "error getting cart"
        } )
    }

}

// @desc     Get cart
// @route    GET /api/cart/:id
// @access   Public

exports.getCart = async ( req, res, next ) => {
    const cartId = req.params.id;

    try {

        if ( !cartId ) {
            return res.status( 400 ).json( {
                success: false,
                error: "there is no cart"
            } )
        }
        const cart = await Cart.findById( cartId );
        if ( !cart ) {
            return res.status( 404 ).json( {
                success: false,
                error: " there is no cart"
            } )
        }
        return res.status( 200 ).json( {
            success: true,
            data: cart
        } )
    } catch ( error ) {

        next( new ErrorResponse( `Unable to get cart with ID ${cartId}`, 404 ) );
    }

}