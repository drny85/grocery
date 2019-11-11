// @ts-nocheck
const asyncHandler = require( '../middlewares/async' );
const ErrorResponse = require( '../utils/errorResponse' );
const User = require( '../models/User' );
const Cart = require( '../models/Cart' );
const Order = require( '../models/Order' );

// @desc     Place an order
// @route    POST /api/order
// @access   Private -- Only auth /signed in user
exports.placeOrder = asyncHandler( async ( req, res, next ) => {

    let cart;

    const {
        order,
        cartId
    } = req.body

    const {
        name,
        address,
        apt,
        city,
        state,
        zipcode,
        phone,
        paymentType
    } = order;

    cart = await Cart.findById( cartId );
    console.log( cart );

    await Order.create( {
        customer: req.user.id,
        name,
        address,
        apt,
        city,
        state,
        zipcode,
        phone,
        paymentType,
        items: cart.items
    } );

    // empty cart 
    cart.items = [],
        cart.quantity = 0,
        cart.totalPrice = 0

    await cart.save()

    return res.status( 200 ).json( {
        success: true,
        data: "order was placed successfully "
    } )

} )


// @desc     Place an order
// @route    POST /api/order
// @access   Private -- Only auth /signed in user
exports.getOrders = asyncHandler( async ( req, res, next ) => {

    console.log( req.user.id );

    const orders = await Order.find( {
        customer: req.user.id
    } );


    return res.status( 200 ).json( {
        success: true,
        count: orders.length,
        data: orders
    } )
} )


// @desc     get an order by ID
// @route    GET /api/order/:id
// @access   Private -- Only auth /signed in user
exports.getOrderById = asyncHandler( async ( req, res, next ) => {

    const order = await Order.find( {
        customer: req.user.id,
        _id: req.params.id
    } );


    return res.status( 200 ).json( {
        success: true,
        data: order
    } )
} )