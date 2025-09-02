require('dotenv').config({quiet : true});

const connectDB = require('./db/connect');
const Product = require('./models/product');
const jsonProduct = require('./products.json');


const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(jsonProduct);
        console.log('Success' );
        process.exit(0);
    } catch(err){
        console.log(err);
        process.exit(1); 
    }
}

start();