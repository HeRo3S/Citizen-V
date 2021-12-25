require("dotenv").config()
const express = require("express")
const { Sequelize } = require("sequelize/dist")
const area = require("../../models/area")
const sequelize = require("../../models/sequelize")
const userAccount = require("../../models/user_account")
const { verifyToken } = require("../auth/auth_controller")
const { getCitizenRatioByAttribute, getCitizenRatioByAge } = require("../citizen/citizen_controller")
const { getAreaProgess, getChildArea } = require("./area_controller")
const areaRouter = express.Router()


//Add new area
areaRouter.route("/api/region_code")
.post(verifyToken, async (req, res) => {
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

//Get current area's progress


areaRouter.route("/api/progress_tracking")
.get(verifyToken,async (req, res) => {
    try{
        data = await getAreaProgess(req.user.manage_area)
        return res.send(data)
    }
    catch(err){
        console.log(err)
    }
    return res.status(404)

})

//Process finish status request

areaRouter.route("/api/progress_report")
.post(verifyToken, async (req, res) => {
    console.log(req.body)
    await area.update({
        finish_status: req.body.finish_status
    },{
        where: {
            id: req.user.manage_area
        },
        individualHooks: true
    },
    )
    .then(() => {
        res.status(204)
    })
    .catch(error => {
        console.log(error)
        res.status(500)
    })
})
.get(verifyToken,async (req, res) => {
    try{
        data = await area.findByPk(req.user.manage_area, {
            attributes: ["name", "finish_status", [Sequelize.col('user_account.username'), "code"]],
            include: [
                {
                    model: userAccount,
                    attributes: []
                }
            ]
        })
        return res.send(data.toJSON())
    }
    catch(err){
        console.log(err)
    }
    return res.status(404)

})



//Get analysis data

areaRouter.route("/api/analysis_view")
.post(verifyToken, async (req, res) => {
    promises = []
    id_list = []
    code_list = []
    for (sub of req.body){
        id_list.push(sub.id)
        code_list.push(sub.full_code)
    }
    promises.push(getChildArea(id_list))
    promises.push(getCitizenRatioByAttribute(code_list, "gender"))
    promises.push(getCitizenRatioByAttribute(code_list, "education"))
    promises.push(getCitizenRatioByAttribute(code_list, "religion"))
    promises.push(getCitizenRatioByAttribute(code_list, "profession"))
    
    try{
        analysis_data = await Promise.all([Promise.all(promises), getCitizenRatioByAge(code_list)])
        analysis_data.flat(1)
        return res.send({
            age: analysis_data[1],
            area: analysis_data[0][0],
            gender: analysis_data[0][1],
            education: analysis_data[0][2],
            religion: analysis_data[0][3],
            profession: analysis_data[0][4],
        })
    }
    catch(err) {
        console.log(err)
    }

    return res.status(404)
})
.get(verifyToken, async (req, res) => {
    promises = []
    id_list = [req.user.manage_area]
    code_list = [req.user.user_code]

    promises.push(getChildArea(id_list))
    promises.push(getCitizenRatioByAttribute(code_list, "gender"))
    promises.push(getCitizenRatioByAttribute(code_list, "education"))
    promises.push(getCitizenRatioByAttribute(code_list, "religion"))
    promises.push(getCitizenRatioByAttribute(code_list, "profession"))
    
    try{
        analysis_data = await Promise.all([Promise.all(promises), getCitizenRatioByAge(code_list)])
        analysis_data.flat(1)
        return res.send({
            age: analysis_data[1],
            area: analysis_data[0][0],
            gender: analysis_data[0][1],
            education: analysis_data[0][2],
            religion: analysis_data[0][3],
            profession: analysis_data[0][4],
        })
    }
    catch(err) {
        console.log(err)
    }

    return res.status(404)
})



module.exports = areaRouter