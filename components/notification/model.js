const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const notifySchema = new Schema({
    id: {type : ObjectId},
    title: {type : String},
    content: {type : String},
    sender: {type : String},
    type: {type : String},
    createdAt: {type: Date, default: Date.now}
});
notifySchema.set('timestamps', true);
module.exports = mongoose.model('notify', notifySchema);