const Item = require( '../models/Item' );
const ErrorResponse = require( '../utils/errorResponse' );
const asyncHandler = require( '../middlewares/async' );
const path = require( 'path' );

// @desc     Add item to grocery only admin can add an item -- data need to be sent as form-data
// @route    POST /api/admin/item
// @access   Private
exports.addItem = asyncHandler( async ( req, res, next ) => {

    const tempItem = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        userId: req.user.id
    }

    if ( !tempItem.name || !tempItem.price || !tempItem.category ) {
        return next( new ErrorResponse( `All fields are required`, 400 ) );
    }
    //CHECK IF ITEM NAME ALREADY EXIST
    const checkItem = await Item.findOne( {
        name: tempItem.name,
        userId: req.user.id
    } );
    if ( checkItem ) {
        return next( new ErrorResponse( `This item is already in database, please change name`, 400 ) );
    }

    //check if file was uploaded
    if ( !req.files ) {
        return next( new ErrorResponse( `Please upload an image`, 400 ) );
    }
    //extract the file uploaded
    const file = req.files.imageURL;
    //get the file name
    let fileName = file.name;

    //check the image type only to accept images
    if ( !file.mimetype.startsWith( 'image' ) ) {
        return next( new ErrorResponse( `Please upload a valid image`, 400 ) );
    }
    //check the size of the image not bigger than 10mbs
    if ( file.size > process.env.IMG_SIZE_LIMIT ) {
        return next( new ErrorResponse( `Please upload an image less then ${parseInt(process.env.IMG_SIZE_LIMIT) / 100000} mbs`, 400 ) );
    }
    //rename the file with user id and current date
    fileName = `${req.user.id}-${Date.now()}${path.parse(file.name).ext}`;

    //MOVE PHOTO TO THE UPLOAD FOLDER
    file.mv( `${process.env.FILE_UPLOAD_DIR}/${fileName}`, async ( err ) => {
        if ( err ) {
            console.log( "ERR", err );
            return next( new ErrorResponse( `There was a problem uploading the image`, 500 ) );
        }

        //change file name to be used as imageURL
        tempItem.imageURL = `${req.protocol}://${req.get('host')}/uploads/${fileName}`;

        const item = await Item.create( tempItem );

        return res.status( 200 ).json( {
            success: true,
            data: item
        } )

    } )


} );

exports.getItems = asyncHandler( async ( req, res, next ) => {

    const items = await Item.find().populate( 'category' );

    return res.status( 200 ).json( {
        success: true,
        count: items.length,
        data: items
    } );

} )

// @desc     Update an item -- only admin can update an item
// @route    PUT /api/admin/item/:id
// @access   Private

exports.updateItem = asyncHandler( async ( req, res, next ) => {

    const itemId = req.params.id;

    const item = await Item.findByIdAndUpdate( itemId, req.body, {
        new: true,
        runValidators: true
    } )

    return res.status( 200 ).json( {
        success: true,
        data: item
    } )
} )

// @desc     Delete an item -- only admin can update an item
// @route    DELETE /api/admin/item/:id
// @access   Private
exports.deleteItem = asyncHandler( async ( req, res, next ) => {

    const itemId = req.params.id;

    const item = await Item.findById( itemId );

    await item.remove();

    return res.status( 200 ).json( {
        success: true,
        data: {}
    } )

} );