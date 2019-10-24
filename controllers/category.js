const Category = require('../models/Category');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');


// @desc     Add category 
// @route    POST /api/category
// @access   Private -- Only admin
exports.addCategory = asyncHandler(async (req, res, next) => {
   
    const found = await Category.findOne({name: req.body.name});
    if (found) {
        return next(new ErrorResponse(`Category name already exist`, 400));
    }

    const category = await Category.create(req.body);

    return res.status(200).json({
        success: true,
        data: category
    })
})


// @desc     Get all categories 
// @route    GET /api/category
// @access   Public
exports.getCategory = asyncHandler(async (req, res, next) => {

    const categories = await Category.find();

    return res.status(200).json({
        success: true,
        data: categories
    })
})

// @desc     Delete category 
// @route    DELETE /api/category/:id
// @access   Private -- Only admin
exports.deleteCategory = asyncHandler(async (req, res, next) => {

    const category = await Category.findById(req.params.id)

    category.remove();

    return res.status(200).json({
        success: true,
        data: {}
    })
})

// @desc     Update category 
// @route    PUT /api/category/:id
// @access   Private -- Only admin
exports.updateCategory = asyncHandler(async(req, res, next) => {

    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true, runValidators: true
    })

    return res.status(200).json({
        success: true,
        data: category
    })
})

