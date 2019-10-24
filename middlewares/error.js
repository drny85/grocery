const ErrorResponse = require('../utils/errorResponse');

const errorhandler = (err, req, res, next) => {

    let error = { ...err};

    error.message = err.message;

     console.log(err);

     //Validation for bad Object ID
     if (err.name === 'CastError') {
        
        const message = `Resource not found with ID of ${err.value}`;
        error = new ErrorResponse(message, 400)
     }
     //Validation for duplicate key
     if (err.code === 11000) {
        
         const message = `Duplicate value was entered, please pick another one`;
         error = new ErrorResponse(message, 404)
     }

     if (err.name === 'MongoError') {
        const message = `Duplicate value was entered, please pick another one`;
        error = new ErrorResponse(message, 404)
     }

     //Validation Error
     if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(message, 400);
     }

     res.status(error.statusCode || 500).json({
         success: false,
         error: error.message || "Server Error"
     })
}

module.exports = errorhandler;