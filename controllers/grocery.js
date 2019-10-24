const Grocery = require('../models/Grocery');
const asyncHandler = require('../middlewares/async');

// @desc     Create grocery
// @route    POST /api/grocery
// @access   Private
exports.createGrocery = asyncHandler(async (req, res, next) => {

    
    const grocery = await Grocery.create(req.body);

    return res.status(200).json({
        success: true,
        data: grocery
    });
  
});

// @desc     Get groceries
// @route    GET /api/grocery
// @access   Private

exports.getGroceries = async (req, res, next) => {
   

   try {
    const groceries = await Grocery.find();
    return res.status(200).json({
        success: true,
        data: groceries
    })
   } catch (error) {
       return res.status(500).json({
           success: false,
           error: "server error"
       })
   }
}


// @desc     Delete a grocery
// @route    DELETE api/grocery/:id
// @access   Private

exports.deleteGrocery = async (req, res, next) => {
  
    try {
    
       const grocery = await Grocery.findById(req.params.id);
       if (!grocery) {
           
           return res.status(400).json({
               success: false,
               error: `this grocery with id ${req.params.id} does not exist`
           })
       }
       //if grocery was found then delete it
       await grocery.remove();

       return res.status(200).json({
           success: true,
           data: {}
       });

    } catch (error) {
        
        return res.status(400).json({
            success: false,
            error: "error deleting grocery"
        })
    }
}

// @desc     Update a grocery
// @route    PUT api/grocery/:id
// @access   Private

exports.updateGrocery = async (req, res, next) => {
  
    try {
    
       const query = await Grocery.findById(req.params.id);
       if (!query) {
           
           return res.status(400).json({
               success: false,
               error: `this grocery with id ${req.params.id} does not exist`
           })
       }
       //if grocery was found then delete it
       const grocery = await Grocery.findByIdAndUpdate(req.params.id, req.body, {new: true,runValidators: true});

       return res.status(200).json({
           success: true,
           data: grocery
       });

    } catch (error) {
        
        return res.status(400).json({
            success: false,
            error: "error updating grocery"
        })
    }
}