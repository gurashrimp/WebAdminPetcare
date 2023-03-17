const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const notiSchema = new Schema( {
    id : {type : ObjectId},
    key: { type: String },
    token: { type: String },
    title: { type: String },
    content: { type: String },
    
}); 
module.exports = mongoose.model('notification', notiSchema);