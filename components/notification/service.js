const notiModel = require('./model');
exports.send = async (product) => {
    const n = new notiModel(product);
    await n.save();
}