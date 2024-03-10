
const axios = require('axios')  //allow you to send a request

exports.registerLogin = (req,res) =>{
    res.render('register')
}

exports.ed = (req,res) =>{
    res.render('employeesdetails')
}
// 
exports.employee = (req,res) =>{
    res.render('employees')
}
// 
