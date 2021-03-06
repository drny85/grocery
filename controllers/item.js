// @ts-nocheck
const Item = require( "../models/Item" );
const ErrorResponse = require( "../utils/errorResponse" );
const asyncHandler = require( "../middlewares/async" );
const path = require( "path" );
const Grocery = require( "../models/Grocery" );
const Category = require( '../models/Category' );


// @desc     Add item to grocery only admin can add an item -- data need to be sent as form-data
// @route    POST /api/admin/item
// @access   Private
exports.addItem = asyncHandler( async ( req, res, next ) => {
    console.log( req.body );
    console.log( req );

    const tempItem = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        userId: req.user.id,
        grocery: req.body.grocery,
        description: req.body.description
    };
    // check that all fields are filled out and check that a groceryId was provided
    if ( !tempItem.name || !tempItem.price || !tempItem.category ) {
        return next( new ErrorResponse( `All fields are required`, 400 ) );
    } else if ( !tempItem.grocery ) {
        return next( new ErrorResponse( `Please select a store for this item`, 400 ) );
    }

    const checkGrocery = await Category.findById( tempItem.category );
    if ( !checkGrocery ) {
        return next( new ErrorResponse( `we could not find this category ${tempItem.category}`, 400 ) );
    }

    //CHECK IF ITEM NAME ALREADY EXIST
    const checkItem = await Item.findOne( {
        name: req.body.name,
        userId: req.user.id,
        grocery: {
            _id: req.body.grocery
        }
    } );
    if ( checkItem ) {
        return next(
            new ErrorResponse(
                `This item is already in database, please change name`,
                400
            )
        );
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
    if ( !file.mimetype.startsWith( "image" ) ) {
        return next( new ErrorResponse( `Please upload a valid image`, 400 ) );
    }
    //check the size of the image not bigger than 10mbs
    if ( file.size > process.env.IMG_SIZE_LIMIT ) {
        return next(
            new ErrorResponse(
                `Please upload an image less then ${parseInt(
                    process.env.IMG_SIZE_LIMIT
                ) / 100000} mbs`,
                400
            )
        );
    }
    //check if there is an store or grocery created with id provided
    const grocery = await Grocery.findOne( {
        userId: req.user.id,
        _id: req.body.grocery
    } );

    if ( !grocery ) {
        return next(
            new ErrorResponse( 'No store or grocery found', 500 )
        );
    }
    //rename the file with user id and current date
    fileName = `${req.user.id}-${Date.now()}${path.parse(file.name).ext}`;

    //MOVE PHOTO TO THE UPLOAD FOLDER
    file.mv( `${process.env.FILE_UPLOAD_DIR}/${fileName}`, async err => {
        if ( err ) {
            console.log( "ERR", err );
            return next(
                new ErrorResponse( `There was a problem uploading the image`, 500 )
            );
        }

        //change file name to be used as imageURL
        tempItem.imageURL = `${req.protocol}s://${req.get(
            "host"
        )}/uploads/${fileName}`;

        const item = await Item.create( tempItem );


        grocery.items.push( item );

        await grocery.save();

        return res.status( 200 ).json( {
            success: true,
            data: item
        } );
    } );
} );


// @desc     Get all items -- 
// @route    GET /api/item
// @access   Public

exports.getItems = asyncHandler( async ( req, res, next ) => {
    const items = await Item.find().populate( "category" );

    return res.status( 200 ).json( {
        success: true,
        count: items.length,
        data: items
    } );
} );

// @desc     Update an item -- only admin can update an item
// @route    PUT /api/admin/item/:id
// @access   Private

exports.updateItem = asyncHandler( async ( req, res, next ) => {
    const itemId = req.params.id;

    const item = await Item.findByIdAndUpdate( itemId, req.body, {
        new: true,
        runValidators: true
    } );

    return res.status( 200 ).json( {
        success: true,
        data: item
    } );
} );

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
    } );
} );

// @desc     Get items from a grocery -- 
// @route    GET /api/item/grocery/:id
// @access   Public

exports.getItemsByGroceryId = asyncHandler( async ( req, res, next ) => {
    const groceryId = req.params.id;

    const groceries = await Item.find( {
        grocery: {
            _id: groceryId
        }
    } )

    return res.status( 200 ).json( {
        success: true,
        count: groceries.length,
        data: groceries
    } );
} );


// @desc     Chnage all item photos names / url -- 
// @route    PATCH /api/item/updateAllPhotosUrl
// @access   Public

exports.changeAllPicturesURL = asyncHandler( async ( req, res, next ) => {

    const items = await Item.find();
    const newURL = req.body.newUrl;
    if ( newURL === 'undefined' ) {
        return next(
            new ErrorResponse( `There was a problem uploading the image`, 500 )
        );
    }
    if ( newURL.length < 1 || newURL == 'undefined' ) {
        return next(
            new ErrorResponse( `There was a problem uploading the image`, 500 )
        );
    }
    for ( item in items ) {

        const img = items[ item ].imageURL.split( '/uploads' )[ 1 ];
        items[ item ].imageURL = newURL + '/uploads' + img

        items[ item ].save();



    }
    return res.json( {
        success: true
    } );


} );