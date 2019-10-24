const express = require('express');

const router = express.Router();

const { addItem, getItems, updateItem, deleteItem} = require('../controllers/item')


router.route('/').post(addItem).get(getItems);

router.route('/:id').put(updateItem).delete(deleteItem);


module.exports = router;