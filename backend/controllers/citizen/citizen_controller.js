const { Op } = require("sequelize/dist")
const area = require("../../models/area")
const citizen = require("../../models/citizen")

getCitizenList = async (area_code, amount) => {
    area_code = area_code.concat("%")
    raw_data = await citizen.findAll({
        where: {
            area_code: {
                [Op.like]: area_code
            }
        },
        limit: amount
    })
    data = []
    for(sub of raw_data){
        data.push(sub.toJSON())
    }
    return data
}

addCitizen = async (target, area_code, area_id) => {
    await citizen.create({
        code: target.code,
        name: target.name,
        birthday: target.birthday,
        gender: target.gender,
        profession: target.profession,
        education: target.education,
        religion: target.religion,
        origin_address: target.origin_address,
        temporary_address: target.temporary_address,
        permanent_address: target.permanent_address,
        belong_to: area_id,
        area_code: area_code
    })
}

const citizenControl = {
    getCitizenList: getCitizenList,
    addCitizen: addCitizen
}

module.exports = citizenControl