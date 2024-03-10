
const express = require('express')
const route = express.Router()
const services = require('../services/render')
const controller = require('../controller/controller')

/**
 * @description Root route
 * @method GET /
 */
route.get('/',services.registerLogin) 

// API
route.post('/api/users',controller.createUser)
// route.post('/api/otpverification',controller.otpverification)
route.post('/api/userlogin',controller.userLogin)
route.post('/forgetPassword',controller.forgetPassword)

// RestAPI for Employee record
route.post('/addEmployee',controller.addEmployee)
route.get('/employees',controller.allEmployees)
route.get('/employees/:id',controller.employee)
route.delete('/deleteemployee/:id',controller.deleteEmployee)
route.put('/editemployee/:id',controller.editEmployee)

// middleware to check if the request originated from the home page
function checkReferrer(req,res,next){
    if(req.headers.referer && req.headers.referer.includes('/api/userlogin')){
        next()
    }else if(req.headers.referer && req.headers.referer.includes('/employeeDetails')){
        next()
    }else if(req.headers.referer && req.headers.referer.includes('/employees')){
        next()
    }else{
        res.status(403).send('Access Forbidden')
    }
}

route.get('/employeeDetails', checkReferrer,(req,res) =>{
    res.render('employeesDetails')
})
route.get('/employees', checkReferrer,(req,res) =>{
    res.render('employees')
})
route.get('/logout', checkReferrer,(req,res) =>{
    res.render('register')
})
//END middleware to check if the request originated from the home page

module.exports = route


