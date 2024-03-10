
const  mongoose = require('mongoose')

var schema = new mongoose.Schema({
    fullname : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    verified : {
        type : Boolean,
        required : true
    }
    ,
    otp : {
        type : Number,
        required : true
    }
})
const userSchema = mongoose.model('userSchema',schema)  // design a schema model into userschemas collection

module.exports = userSchema
