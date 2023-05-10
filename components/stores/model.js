const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const accountstoresSchema = new Schema({
    _id: {type : ObjectId},
    nameStore: {type : String},
    emailStore: {type : String},
    passStore: {type : String},
    starStore: {type : Number},
    addressStore: {type : String},
    phoneStore: {type : String},
    idProductStore:{ type: Schema.Types.ObjectId, ref: "productstores"},
    idServiceStore:{ type: Schema.Types.ObjectId, ref: "servicestores"},
    idpetStore:{ type: Schema.Types.ObjectId, ref: "petstores"},
   
    socketId: {
        type: String
      },
      chatId:{
        type: Schema.Types.ObjectId, ref: "chats"
      },
      tokenFCM: {
        type: String
      },
});

module.exports = mongoose.model('accountstores', accountstoresSchema);
