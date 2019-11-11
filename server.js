const express = require( 'express' );
const colors = require( 'colors' );
const morgan = require( 'morgan' );
const dotenv = require( 'dotenv' );
const fileUpload = require( 'express-fileupload' );
const errorHandler = require( './middlewares/error' );
const connectDB = require( './config/db' )
const path = require( 'path' );
const helmet = require('helmet')
const cors = require('cors')
const app = express();

//loads env variables
<<<<<<< HEAD
dotenv.config({ path: './config/config.env' });
=======
dotenv.config( {
    path: './config/config.env'
} );
>>>>>>> 2e4aae5ed04c4bad4694267ee46137ecf5d5e691

//connect to database
connectDB();

<<<<<<< HEAD
// default optionsç
app.use(fileUpload());
=======
app.use(helmet());

app.use(cors());


// default options
app.use( fileUpload() );
>>>>>>> 2e4aae5ed04c4bad4694267ee46137ecf5d5e691

//parse body to json
app.use( express.json() );

// run  morgan middleware for logging
app.use( morgan( 'dev' ) );

//setup static folder
app.use( express.static( path.join( __dirname, 'public' ) ) );

//routers
const groceryRoutes = require( './routers/grocery' );
const itemRoutes = require( './routers/item' );
const cartRoutes = require( './routers/cart' );
const categoryRoutes = require( './routers/category' );
const authRoutes = require( './routers/auth' );
const orderRoutes = require( './routers/order' );


// routes
app.use( '/api/grocery', groceryRoutes );
app.use( '/api/item', itemRoutes );
app.use( '/api/cart', cartRoutes );
app.use( '/api/category', categoryRoutes );
app.use( '/api/auth', authRoutes );
app.use( '/api/order', orderRoutes )

//custom error handler
app.use( errorHandler );

const PORT = process.env.PORT || 5000
<<<<<<< HEAD
const server = app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`.cyan.underline);
})
=======
const server = app.listen( PORT, () => {
    console.log( `Server started in port ${PORT}`.cyan.underline );
} )
>>>>>>> 2e4aae5ed04c4bad4694267ee46137ecf5d5e691

process.on( 'unhandledRejection', ( err, promise ) => {
    // @ts-ignore
    console.log( `Error: ${err.message}`.red.underline );
    server.close( () => process.exit( 1 ) )
} )