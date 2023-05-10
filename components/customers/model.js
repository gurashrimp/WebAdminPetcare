const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const customerSchema = new Schema({
    id: {type : ObjectId},
    nameAccount: {type : String},
    emailAccount: {type : String,unique:true},
    passWordAccount: {type : String},
    roleAccount: {
        type: Boolean,
    },
    address: {type : Array},
    numberphone: {type : Array},
    favoriteProductId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'productStore',
        },

    ],
    favoritePetId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'petStore',
        },

    ],
    favoriteServiceId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'serviceStore',
        },

    ],
    
    tokenFCM: {
        type: String
    },
    socketId: {
        type: String
    },
    chatId: {
        type: Array
    }
});

module.exports = mongoose.model('accounts', customerSchema);