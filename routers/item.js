const express = require( 'express' );

const router = express.Router();

const {
    auth,
    admin
} = require( '../middlewares/auth' )

const {
    addItem,
    getItems,
    updateItem,
    deleteItem
} = require( '../controllers/item' )


router.route( '/' ).post( auth, admin, addItem ).get( getItems );

router.route( '/:id' ).put( auth, admin, updateItem ).delete( auth, admin, deleteItem );


module.exports = router;