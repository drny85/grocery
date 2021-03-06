const express = require( 'express' );

const router = express.Router();
const multer = require( 'multer' );
const upload = multer( {
    dest: '../public/uploads'
} );


const {
    auth,
    admin
} = require( '../middlewares/auth' )

const {
    addItem,
    getItems,
    updateItem,
    deleteItem,
    getItemsByGroceryId,
    changeAllPicturesURL,
    // testFile

} = require( '../controllers/item' )


router.route( '/grocery/:id' ).get( getItemsByGroceryId );

router.patch( '/updatedAllPhotosUrl', changeAllPicturesURL );


router.route( '/' ).post( auth, admin, addItem ).get( getItems );

router.route( '/:id' ).put( auth, admin, updateItem ).delete( auth, admin, deleteItem );



module.exports = router;