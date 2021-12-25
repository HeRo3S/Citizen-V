const express = require("express")
const { getChildArea } = require("../area/area_controller")
const { verifyToken } = require("../auth/auth_controller")
const { addCitizen, getCitizenList } = require("./citizen_controller")
const citizenRouter = express.Router()

citizenRouter.route("/api/individual_input").post(verifyToken, async (req, res) => {
    console.log(req.body)
    await addCitizen(req.body, req.user.username, req.user.manage_area)
    res.status(200)
})


citizenRouter.route("/api/population_view")
.get(verifyToken,async (req, res) => {
    account_code = req.user.username
    if (req.user.access_level == 0){
        account_code = ""
    }
    promises = []
    promises.push(getChildArea(req.user.manage_area))
    promises.push(getCitizenList(account_code))
    try{
        data = await Promise.all(promises)
        return res.send({area: data[0], citizen: data[1]})
    }catch(err){
        console.log(err)
    }
    return res.status(404)
})
.post(verifyToken, async (req, res) => {
    console.log(req.body)
})

module.exports = citizenRouter