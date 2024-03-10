


const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const path = require('path') //for set path of ejs files

const connectDB = require('./server/database/connection.js')

const app = express()

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080



// log request
app.use(morgan('tiny'))

// mongodb connection
connectDB()

// parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

// set view engine
app.set("view engine","ejs")
// app.set("views",path.resolve(__dirname))  //if we have ejs files inside a folder inside views folder then use this code

// load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
// "/css/style.css"  //if we have to access a css file "style.css". we should write like this. Dont't need to specify all folders.

// load routers
app.use('/', require('./server/routes/router'))
app.use('/ed', require('./server/routes/router'))




app.listen(PORT,() => {console.log(`server is running on http://localhost:${PORT}`);})

