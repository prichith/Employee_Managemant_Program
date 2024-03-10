
var userdb = require('../model/user')
var employeeSchema = require('../model/employee')
// const {employeeSchema} = require('../model/employee')
var generateOTP = require('../email/generateOTP')
var sendEmail = require('../email/storeAndSendOTP')
const moment = require('moment')
// 
const express = require('express')
const { employee } = require('../services/render')
const { default: axios } = require('axios')
const { default: mongoose } = require('mongoose')
const route = express.Router()
// 
 
// let otptoken = generateOTP()
let userFullname
let userEmail
let userPassword

// create and save new user in DB and send otp via email
exports.createUser = (req,res)=>{
    if(!req.body){
        res.status(400).send({message:"content cannot be empty"})
        return;
    }
    // assigning the data
    // userFullname = req.body.signupFullname
    // userEmail = req.body.signupEmail
    // userPassword = req.body.signupFullname

    let otptoken = generateOTP()
        // send email
        let mailOptions = {
        from: 'prichith@outlook.com',  // Sender address
        to: userEmail,  // List of recipients
        subject: 'OTP',      // Subject line
        text: `Your one time password is ${otptoken}`
        };

        sendEmail(mailOptions)

// save data into db
let newUser = new userdb({
  fullname : req.body.fullname,
  email : req.body.email,
  password : req.body.password,
  verified : false,
  otp : otptoken
})

newUser.save(newUser)


        res.end()
}
// exports.createUser = (req,res)=>{
//     if(!req.body){
//         res.status(400).send({message:"content cannot be empty"})
//         return;
//     }
//     // assigning the data
//     userFullname = req.body.signupFullname
//     userEmail = req.body.signupEmail
//     userPassword = req.body.signupFullname

//         // send email
//         let mailOptions = {
//         from: 'prichith@outlook.com',  // Sender address
//         to: userEmail,  // List of recipients
//         subject: 'OTP',      // Subject line
//         text: `Your one time password is ${otptoken}`
//         };

//         sendEmail(mailOptions)
//         res.end()
// }

// validate otp
// exports.otpverification = (req,res)=>{
//     let otp = ""
//     // let otp = []
//     for(let i=1;i<5;i++){
//         otp += (req.body["otp"+i])
//     }

//     if(otptoken == otp){
//         // sendUserToDB()
//         console.log("true");
//         // new user
//         const user = new userdb({
//             fullname : userFullname,
//             email : userEmail,
//             password : userPassword,
//             otp : otptoken
//         })

//     // save user in the database
//      user
//         .save(user)
//         .then(data =>{
//             // res.send(data)
//             // res.redirect('/')
//         })
//         .catch(err =>{
//             res.status(500).send({
//                 message : err.message || "some error occures while creating a create operation"
//             })
//         })    
//     }else{
//         console.log("false");
//     }
// }

// user login
let enteredEmail
let password
let returnPassword

exports.userLogin = (req,res)=>{
    enteredEmail = req.body.email
    password = req.body.password
    console.log(` request email : ${enteredEmail}`);

// 


// second try
const { MongoClient } = require('mongodb');

// Database Name
const dbName = 'test'; // Update this with your database name

// Function to check mobile number and retrieve OTP

async function getemailByemail() {
  const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('userschemas'); // Update this with your collection name

    const query = { email: enteredEmail };
    const result = await collection.findOne(query);

    if (result) {
        returnPassword = result.password // save password into a global temp variable
    } else {
        console.log('no return values');
      return null; // Return null if mobile number doesn't exist
    }
  } catch (error) {
    console.error('Error occurred:');
    return null; // Return null in case of any error
  } finally {
    await client.close();
  }
}
 
getemailByemail()
  .then(mail => {
    if (mail) {
      console.log(`OTP for mobile number ${enteredEmail}: ${returnPassword}`);
    } else {
      console.log(`No OTP found for mobile number ${enteredEmail}.`);
    }
    if(returnPassword == password){
        console.log("password match")
        res.render('employees')
    }else{
        console.log("password not match")
    }
        console.log(`return password : ${returnPassword}`)
        console.log(`password : ${password}`)
  })
  .catch(err => console.error('Error retrieving OTP:', err));
}
// FORGET PASSWORD
exports.forgetPassword = (req,res) =>{
  
}
// END FORGET PASSWORD

// REST API FOR EMPLOYEE
  // CREATE AN EMPLOYEE
  exports.addEmployee = (req,res) =>{ 
    console.log(req.body);
    const employee  = new employeeSchema({
      salutation : req.body.salutation,
      firstname : req.body.firstname,
      lastname : req.body.lastname,
      email : req.body.email,
      phone : req.body.phone,
      dob : removeTimeFromDOB(req.body.dob), //remove time. dob format yy-mm--dd
      gender : req.body.gender,
      qualifications : req.body.qualifications,
      address : req.body.address,
      city : req.body.city,
      state : req.body.state,
      country : req.body.country,
      username : req.body.username,
      password : req.body.password
      // avatar : req.body.avatar
  })

  // save it into database
  employee
  .save(employee)
  .then(savedEmployee =>{
    let id = savedEmployee._id
    console.log(id);
    console.log(req.body.avatar);
 
  })
  function removeTimeFromDOB(birthdate){
    let array = []
    let date = birthdate.split('T')
    array.push(date[0])
    return array[0]
  }
  }
  //END CREATE AN EMPLOYEE
  // GET ALL EMPLOYEES
  exports.allEmployees = (req,res) =>{
    employeeSchema.find()
    .then(users=>{
      res.send(users)
    })
    .catch(err =>{
      res.status(500).send({ message : err.message || "Error occured while retrieving user information"})
  }) 
  }
  //END GET ALL EMPLOYEES
              //  AVATAR
            // Upload an employee avatar
            // app.post("/employees/:id/avatar", (req, res) => {
            //   const { id } = req.params;
            //   const { avatar } = req.files;

            //   if (!avatar) {
            //     return res.status(400).json({ error: "No avatar file provided" });
            //   }

            //   const uploadPath = path.join(__dirname, "public", "avatars", `${id}.jpg`);
            //   const publicPath = `${id}.jpg`;
            //   avatar.mv(uploadPath, (err) => {
            //     if (err) {
            //       console.error("Error uploading avatar:", err);
            //       return res.status(500).json({ error: "Failed to upload avatar" });
            //     }
            //   });
            //   updateEmployeeAvatar(id, publicPath);
            //   res.json({ success: true });
            // });
              // END 

      // GET AN EMPLOYEE BY ID
      exports.employee = (req,res)=>{
        let idendity = (req.params.id).split('=')
        let employeeId = idendity[1]
        console.log(`employee id is ${employeeId}`);

        employeeSchema.findById(employeeId)
        .then((employee)=>{
          // console.log(employee);
          res.json(employee)
        })
      }
      //END GET AN EMPLOYEE BY ID
      // DELETE AN EMPLOYEE BY ID
      exports.deleteEmployee = (req,res)=>{
        let idendity = (req.params.id).split('=')
        let employeeId = idendity[1]
        console.log(`delete id is : ${employeeId}`);
        let query = {_id : employeeId}

        employeeSchema.findByIdAndDelete(query)
        .then(()=>{
          res.json({message:"Employee deleted successfully"})
        })
      }
      //END DELETE AN EMPLOYEE BY ID
      // EDIT AN EMPLOYEE
      exports.editEmployee = (req,res)=>{
        console.log("i am inside update fn in controller");

        let data = req.body
        console.log(data);

        let idendity = (req.params.id).split('=')
        let employeeId = idendity[1]
        console.log(`employeeId is : ${employeeId}`)

        // let updatedEmployee = req.body
        // employeeSchema.findByIdAndUpdate(employeeId,updatedEmployee)
      }

//END REST API FOR EMPLOYEE