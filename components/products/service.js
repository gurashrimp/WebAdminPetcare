const productModel = require('./model');

exports.getAllProduct = async () => {
    return await productModel.find({});
}

exports.getProductById = async (id) => {
    console.log('id product', id);
    const product = await productModel.findById(id);
    // console.log('product service',product);0
    return product;
};
exports.getProductByName = async (name) => {
    console.log('id product', name);
    const product = await productModel.findB(id);
    // console.log('product service',product);
    return product;
};
exports.insert = async (product) => {
    const p = new productModel(product);
    await p.save();
}

exports.update = async (id, product) => {
    await productModel.findByIdAndUpdate(id, product);
}

exports.delete = async (id) => {
    await productModel.findByIdAndDelete(id);
}

exports.getById = async (id) => {
    return await productModel.findById(id);
}
