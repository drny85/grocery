const express = require('express');

const router = express.Router();

const { createCart, addToCart, getCart, deleteCart, deleteOrUpdateFromCart} = require('../controllers/cart')


router.post('/createCart', createCart);
router.route('/').post(addToCart).put(deleteOrUpdateFromCart);
router.route('/:id').get(getCart).delete(deleteCart);



module.exports = router;