const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const tokenSchema = new Schema({
    id: {type : ObjectId},
    fcm_tokens: {type : Array},
});
module.exports = mongoose.model('fcm_tokens', tokenSchema);