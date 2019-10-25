const express = require( 'express' );

const router = express.Router();

const {
    auth,
    admin
} = require( '../middlewares/auth' );

const {
    addCategory,
    getCategory,
    deleteCategory,
    updateCategory
} = require( '../controllers/category' )

router.route( '/' ).post( auth, admin, addCategory ).get( getCategory );

router.route( '/:id' ).delete( deleteCategory ).put( updateCategory )

module.exports = router;