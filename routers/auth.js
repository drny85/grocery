const express = require( 'express' );

const router = express.Router();

const {
    auth
} = require( '../middlewares/auth' )

const {
    register,
    login,
    getMe
} = require( '../controllers/auth' )

router.route( '/register' ).post( register );
router.post( '/login', login );
router.get( '/me', auth, getMe )

module.exports = router;