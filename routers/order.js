const express = require( 'express' );

const router = express.Router();

const {
    auth,
    admin
} = require( '../middlewares/auth' )

const {
    placeOrder,
    getOrders,
    getOrderById
} = require( '../controllers/order' )

router.route( '/' ).post( auth, placeOrder ).get( auth, getOrders );

router.route( '/:id' ).get( auth, getOrderById )



module.exports = router;