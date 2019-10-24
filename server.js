const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const errorHandler = require('./middlewares/error');
const connectDB = require('./config/db')
const path = require('path');
const app = express();

//loads env variables
dotenv.config({path: './config/config.env'});

//connect to database
connectDB();

// default options
app.use(fileUpload());

//parse body to json
app.use(express.json());

// run  morgan middleware for logging
app.use(morgan('dev'));

//setup static folder
app.use(express.static(path.join(__dirname, 'public')));

//routers
const groceryRoutes = require('./routers/grocery');
const itemRoutes = require('./routers/item');
const cartRoutes = require('./routers/cart');
const userRoutes = require('./routers/user');
const categoryRoutes = require('./routers/category');


// routes
app.use('/api/grocery', groceryRoutes);
app.use('/api/item', itemRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);

//custom error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
 console.log(`Server started in port ${PORT}`.cyan.underline);
})

process.on('unhandledRejection', (err, promise) => {
    // @ts-ignore
    console.log(`Error: ${err.message}`.red.underline);
    server.close(() => process.exit(1))
})