const express = require( 'express' );

const router = express.Router();

const {
    auth,
    admin
} = require( '../middlewares/auth' )

const {
    createGrocery,
    getGroceries,
    deleteGrocery,
    updateGrocery,
    getGrocery
} = require( '../controllers/grocery' )

router.route( '/' ).post( auth, admin, createGrocery ).get( getGroceries );

router.route( '/:id' ).delete( auth, admin, deleteGrocery ).put( auth, admin, updateGrocery ).get( getGrocery );





module.exports = router;