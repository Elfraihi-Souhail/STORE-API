const mongoose = require('mongoose');


const Product = new mongoose.Schema({
    name:{
        type:String,
        required:[true , 'You must enter a valid name'],
        trim:true
    },
    price:{
        type:Number,
        required:[true , 'You must enter a valid price'],
        min:[0 , 'Price must be a non negative value']
    },
    featured:{
        type:Boolean,
        default:false,
    },
    rating:{
        type:Number,
        default:0.0,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    company:{
        type:String ,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported',
        },
    },

})

module.exports = mongoose.model('Product' , Product);