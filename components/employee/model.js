const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const employeeSchema = new Schema({
    id: {type : ObjectId},
    username: {type : String, requiredPaths: true},
    password: {type : String, requiredPaths: true},
    idUser: {type: ObjectId, ref:"accounnts"}
});

module.exports = mongoose.model('employee', employeeSchema);