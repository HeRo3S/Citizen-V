require("dotenv").config()
const logger = require("morgan")
const express = require("express")
const app = express()
const path = require("path")
const session = require("express-session")
const fs = require("fs")
const authRouter = require('./controllers/auth/auth_router')
const cors = require("cors")
require("ejs")
const sequelize = require("./models/sequelize")

//                                                         Import sequelize model

// const models = path.join(__dirname, 'models')

// fs.readdirSync(models)
//   .filter(function (file) {
//     return (file.indexOf('.') !== 0)  && (file.slice(-3) === '.js')
//   })
//   .forEach(function (file) {
//     require(path.join(models, file))
//   })
  
//   sequelize.sync({force : true}).catch(error => {
//       console.log(error)
//   });




//                                                             Config express
app.use(logger("dev"))
app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded( {extended: true} ))
//Session
app.use(session({
    key: 'user_sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        expires: 600000,
    }
  }))

//                                              ROUTING
app.use(cors())
app.use("/", authRouter)

app.listen(3001)

console.log("Listening on port 3001")