const Cart = require('../models/Cart');
const Item = require('../models/Item')
const ShoppingCart = require('../models/ShoppingCart');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

// @desc     Add item to cart -- cart needs to be created on the front end when users visit the page
// @route    POST /api/cart
// @access   Public
exports.addToCart = asyncHandler( async (req, res, next) => {

    req.user = {"_id":"5daf0dcb2ca0b1270480e134","name":"robert","email":"drny85@me.com","__v":0}

        const cart = await Cart.findById("5daf38a55466761628060247").populate('userId');
        //add item to ShoppingCart class
        ShoppingCart.addToCart(req.body);

        const updatedCart = {
            items: ShoppingCart.items,
            quantity: ShoppingCart.quantity,
            totalPrice: ShoppingCart.totalPrice
        }
        
        const updated = await Cart.findByIdAndUpdate("5daf38a55466761628060247", 
            updatedCart
        , {
         new: true, runValidators: true
        })

       

        return res.status(200).json({
            success: true,
            data: updated
        })
         
})

// @desc     Create cart -- // need to add fucntionally to create or get cart if already exist
// @route    POST /api/cart/createCart
// @access   Puclic
exports.createCart = async (req, res, next) => {
    req.user = {
        _id: "5dae0b1b73640829ac2f5ab7",
        name: "robert"
    };
    try {
        const cart = await Cart.create({
            userId: req.user._id
        })

        return res.status(200).json({
            success: true,
            data: cart
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "error creating cart"
        })
    }
}

exports.deleteOrUpdateFromCart = async (req, res, next) => {

    try {
        
        const cart = await Cart.findById("5daf38a55466761628060247").populate('userId');
        if (!cart) {
            return res.status(404).json({
                success: false,
                error: "There is no cart"
            })
        }
        //remove item ShoppingCart class
        ShoppingCart.deleteFromCart(req.body);

        const updatedCart = {
            items: ShoppingCart.items,
            quantity: ShoppingCart.quantity,
            totalPrice: ShoppingCart.totalPrice
        }
        
        const updated = await Cart.findByIdAndUpdate("5daf38a55466761628060247", 
            updatedCart
        , {
         new: true, runValidators: true
        })

        
        return res.status(200).json({
            success: true,
            data: updated
        })
        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            error: "error adding item to cart"
        })
    }
}


// @desc     Delete cart
// @route    DELETE /api/cart/:id
// @access   Public

exports.deleteCart = async (req, res, next) => {
    const cartId = req.params.id;

    try {

        if (!cartId) {
            return res.status(400).json({
                success: false,
                error: "there is no cart"
            })
        }
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({
                success: false,
                error: " there is no cart"
            })
        }

        await cart.remove();

        return res.status(200).json({
            success: true,
            data: {}
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            error: "error getting cart"
        })
    }
     
}

// @desc     Get cart
// @route    GET /api/cart/:id
// @access   Public

exports.getCart = async (req, res, next) => {
    const cartId = req.params.id;

    try {

        if (!cartId) {
            return res.status(400).json({
                success: false,
                error: "there is no cart"
            })
        }
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({
                success: false,
                error: " there is no cart"
            })
        }
        return res.status(200).json({
            success: true,
            data: cart
        })
    } catch (error) {
       
        next(new ErrorResponse(`Unable to get cart with ID ${cartId}`, 404));
    }
     
}