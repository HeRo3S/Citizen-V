require("dotenv").config()
const express = require("express")
const area = require("../../models/area")
const sequelize = require("../../models/sequelize")
const userAccount = require("../../models/user_account")
const { verifyToken } = require("../auth/auth_controller")
const areaRouter = express.Router()

areaRouter.route("/api/region_code").post(verifyToken, async (req, res) => {
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
            if(req.user.access_level == 0){
                prefix = ""
            }else{
                prefix = req.user.username
            }
            await userAccount.create({
                username: prefix + data.code,
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
.get(verifyToken,async (req, res) => {
    raw_data = await area.findAll({
        attributes: ["id", "name", "code"], 
        where: {
            belong_to: req.user.manage_area
        },
        order: [
            ["code", "ASC"]
        ]})
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

module.exports = areaRouter