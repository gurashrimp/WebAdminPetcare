const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const productSchema = new Schema( {
    id : {type : ObjectId},
    nameProduct: { type: String },
    priceProducts: { type: Number },
    imgProduct: { type: String },
    descriptionProduct: { type: String },
    quantityProduct: { type: Number },
    typeProduct:{type : String},
    codeProduct: {type: String},
}); 
module.exports = mongoose.model('productstores', productSchema);