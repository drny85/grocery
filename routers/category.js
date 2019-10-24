const express = require('express');

const router = express.Router();

const { addCategory, getCategory, deleteCategory, updateCategory} = require('../controllers/category')

router.route('/').post(addCategory).get(getCategory);

router.route('/:id').delete(deleteCategory).put(updateCategory)

module.exports = router;