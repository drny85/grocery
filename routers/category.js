const express = require( 'express' );

const router = express.Router();

const {
    auth,
    admin
} = require( '../middlewares/auth' );

const {
    addCategory,
    getCategories,
    deleteCategory,
    updateCategory,
    getCategory
} = require( '../controllers/category' )

router.route( '/' ).post( auth, admin, addCategory ).get( getCategories );

router.route( '/:id' ).delete( auth, admin, deleteCategory ).put( auth, admin, updateCategory ).get( getCategory )

module.exports = router;