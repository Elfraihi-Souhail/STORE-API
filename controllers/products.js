const Product = require('../models/product');

const getAllProducts = async (req , res) => {

    const {name , featured , company , sort , fields , numiricFilters} = req.query;
     const queryObject = {};
    
    
    
    if(numiricFilters){
        const operatorMap = {
            '<':'$lt',
            '<=':'$lte',
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq'
        }
        const regEx = /\b(<|<=|>|>=|=)\b/g;
        let filters = numiricFilters.replace(
            regEx , (match) => `-${operatorMap[match]}-`
        )
        const permittedFields = ['price' , 'rating'];
        const options = filters.split(',').forEach( (item) => {
            const [field , operator , rawValue] = item.split('-');
            //checking if the values are valid
            if(!permittedFields.includes(filed)) return;
            if(isNaN(Number(rawValue))) return;

            if(!queryObject[field]) queryObject[field] = {};
            queryObject[field][operator] = Number(rawValue);

        });
        
    }

    if(name){
        queryObject.name = {$regex: name , $options: 'i'};
    }
    if(featured){
        queryObject.featured = featured === 'true' ? true : false;
    }
    if(company){
        queryObject.company = company;
    }

    let result =  Product.find(queryObject);
    if(fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }
    if(sort){
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('createdAt');
    }

    const limit = Number(req.query.limit) || 10 ;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit ;
    result = result.skip(skip).limit(limit);
    
    const products = await result;
    res.status(200).json({ products  , nbHits:products.length });
}

module.exports = {
    getAllProducts
} 