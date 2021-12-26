const express = require("express")
const { Op } = require("sequelize/dist")
const citizen = require("../../models/citizen")
const { getChildArea } = require("../area/area_controller")
const { verifyToken } = require("../auth/auth_controller")
const { addCitizen, getCitizenList, findCitizen } = require("./citizen_controller")
const citizenRouter = express.Router()

//Routing for citizen data input
citizenRouter.route("/api/individual_input").post(verifyToken, async (req, res) => {
    console.log(req.body)
    try{
        await addCitizen(req.body, req.user.username, req.user.manage_area)
        res.status(204)
    }
    catch(err){
        console.log(err)
    }

    res.status(500)
})

//Routing for viewing population of the current login user's area
//Post request act as filter

citizenRouter.route("/api/population_view")
.get(verifyToken,async (req, res) => {
    account_code = req.user.username
    if (req.user.access_level == 0){
        account_code = ""
    }
    promises = []
    promises.push(getChildArea([req.user.manage_area]))
    promises.push(getCitizenList([account_code], 20))
    try{
        data = await Promise.all(promises)
        return res.send({area: data[0], citizen: data[1]})
    }catch(err){
        console.log(err)
    }
    return res.status(404)
})
.post(verifyToken, async (req, res) => {
    id_list = []
    code_list = []
    for(option of req.body){
        id_list.push(option.id)
        code_list.push(option.full_code)
    }
    try{
        mix_data = await Promise.all([getCitizenList(code_list, 20), getChildArea(id_list)])
        citizen_data = mix_data[0]
        area_data = mix_data[1]
        return res.send({area: area_data, citizen: citizen_data})
    }catch(err){
        console.log(err)
    }
    return res.status(404)

})

//Find a citizen
citizenRouter.route("/api/individual_view")
.get(verifyToken, async (req,res) => {
    try{
        data = await citizen.findOne({
            where:{
                area_code: {[Op.startsWith]: req.user.user_code}
            }
        })
        return res.send(data.toJSON())
    }
    catch(err){
        console.log(err)
    }
    return res.status(404)
})
.post(verifyToken, findCitizen, (req, res) => {
    res.send(req.req_citizen)
})

module.exports = citizenRouter