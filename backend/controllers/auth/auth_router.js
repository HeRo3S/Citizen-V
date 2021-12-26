require("dotenv").config()
const express = require("express")
const jwt = require("jsonwebtoken")
const { Sequelize } = require("sequelize/dist")
const area = require("../../models/area")
const userAccount = require("../../models/user_account")
const { verifyToken } = require("./auth_controller")
const authRouter = express.Router()
const authControl = require('./auth_controller')


// authControl.createUser("superuser", "TTStudio1902", 0, null)

//login routing
authRouter.route("/api/auth/signin")

.post(async (req, res) =>{
    reqData = req.body
    try{
        user = await authControl.authUser(reqData.username, reqData.password)
    }
    catch(error){
        console.log(error)
        return res.status(401).send(error)
    }
    token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
    return res.send({accessToken: token})
})

//Account manager routing
//Include changing password and open status
authRouter.route("/api/accountManager")

.get(verifyToken,async (req, res) => {
    raw_data = await userAccount.findAll({
        attributes: ["id", "open_status", [Sequelize.col('area.code'), "code"], [Sequelize.col('area.name'), "name"]],
        where: {
            manager_account: req.user.id
        },
        include: [
            {
                model: area,
                attributes: []
            }
        ],
        order: [
            ["area", "code", "ASC"]
        ]
    }).catch(error => {
        console.log(error)
    })
    if(raw_data?.length){
        data = []
        for (sub of raw_data){
            sub = sub.toJSON()
            data.push(sub)
        }
        return res.send(data)
    }
    return res.status(404)
})
.post(verifyToken, async (req, res) => {
    promises = []
    for (user of req.body){
        promises.push(userAccount.update({
            password: user.password,
            open_status: user.open_status
        },{
            where: {
                id: user.id
            },
            individualHooks: true

        }))
    }
    Promise.all(promises).then(() => {
        return res.status(200)
    }).catch(err => {
        console.log(err)
        return res.status(500)
    })
})

module.exports = authRouter