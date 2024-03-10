
const  mongoose = require('mongoose')

let employeesSchema = new mongoose.Schema({
    salutation:{
        type:String,
        required:true
    },firstname:{
        type:String,
        required:true
    },lastname:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true
    },phone:{
        type:Number,
        required:true
    },dob:{
        type:Date,
        required:true
    },gender:{
        type:String,
        required:true
    },qualifications:{
        type:String,
        required:true
    },address:{
        type:String,
        required:true
    },city:{
        type:String,
        required:true
    },state:{
        type:String,
        required:true
    },country:{
        type:String,
        required:true
    },username:{
        type:String,
        required:true
    },password:{
        type:String,
        required:true
    },avatar:{
        type:String
    }
})

const employeeSchema = mongoose.model('employeeSchema',employeesSchema)  // design a schema model into employeeSchema collection

module.exports = employeeSchema
