require("dotenv").config()
const express = require("express")
const jwt = require("jsonwebtoken")
const area = require("../../models/area")
const sequelize = require("../../models/sequelize")
const userAccount = require("../../models/user_account")
const Router = express.Router()
const authControl = require('./auth_controller')


Router.route("/api/region_code").post([authControl.verifyToken],async (req, res) => {
    data = req.body[0]
    if(!data){
        return res.status(400).send({message: "No data found"})
    }
    t = await sequelize.transaction()
    area_id = null
    try{
        await area.create({
            name: data.name,
            code: data.code,
            level: req.user.access_level,
            belong_to: req.user.manage_area
        },{
            transaction: t
        })
        .then(async area => {
            await userAccount.create({
                username: data.code,
                password: "TTStudio1902",
                access_level: req.user.access_level + 1,
                manager_account: req.user.id,
                manage_area: area.id
            }, {
                transaction: t
            })
            area_id = area.id
        }).then(() => {
            t.commit()
        })

    } catch(err){
        console.log(err)
        await t.rollback()
        return res.status(409).send({message: "An error occurred adding data"})
    }
    return res.send({message: "Data added successfully"})
})
.get([authControl.verifyToken],async (req, res) => {
    raw_data = await area.findAll({
        attributes: ["id", "name", "code"], 
        where: {
            belong_to: req.user.manage_area
        }})
    if(raw_data.length){
        data = []
        for (sub of raw_data){
            sub = sub.toJSON()
            data.push(sub)
        }
        return res.send(data)
    }
    return res.status(404).send({message: "No area found"})
})

// authControl.createUser("superuser", "TTStudio1902", 0, null)

Router.route("/api/auth/signin").post(async (req, res) =>{
    reqData = req.body
    user = await authControl.authUser(reqData.username, reqData.password).catch(error => {
        return res.status(401).send(error)
    })
    token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
    return res.send({accessToken: token})
})

module.exports = Router