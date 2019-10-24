const express = require('express');

const router = express.Router();

const { createGrocery, getGroceries, deleteGrocery, updateGrocery} = require('../controllers/grocery')

router.route('/').post(createGrocery).get(getGroceries);

router.route('/:id').delete(deleteGrocery).put(updateGrocery);





module.exports = router;