const tokenModel = require('./model');



exports.getAll = async () => {
    return await tokenModel.find();
}





