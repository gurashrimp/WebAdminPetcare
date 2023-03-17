const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const storeSchema = new Schema({
    id: {type : ObjectId},
    nameStore: {type : String},
    emailStore: {type : String},
    password: {type : String},
    starStore: {type : Number},
    addressStore: {type : String},
    phoneStore: {type : String},
    idProductStore:{ type: Schema.Types.ObjectId, ref: 'products'},
    idServiceStore:{ type: Schema.Types.ObjectId, ref: 'services'},
    idpetStore:{ type: Schema.Types.ObjectId, ref: 'pets'},
    otpMailStore: {type : String},
    avtStore: {type : String},
    descriptionStore: {type : String},
    socketId: {
        type: String
      },
      tokenFCM: {
        type: String
      },
});

module.exports = mongoose.model('store', storeSchema);