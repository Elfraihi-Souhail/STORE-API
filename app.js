require('dotenv').config({ quiet:true });
require('express-async-handler');
const ProductsRouter = require('./routes/products');
//Async errors



const express = require('express');
const app = express();


const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const connectDB = require('./db/connect');

//middlerware
app.use(express.json());


//products routes
app.use('/api/v1/products' , ProductsRouter)

app.use(notFound);
app.use(errorHandler);


//Connect DB 
const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port , console.log(`Connected to MongoDB\nServer is listening on port : ${ port }`))
    } catch (err) {
        console.log(err);      
    }
}

start();