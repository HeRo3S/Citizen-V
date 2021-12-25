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
    return citizen.create({
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
getCitizenRatioByGender = async (area_code) => {
    area_code = area_code.concat("%")
    raw_data = await citizen.findAndCountAll({
        where: {
            area_code: {
                [Op.like]: area_code
            }
        },
        attributes: 
        [
            "gender"
        ],
        group: [
            "gender"
        ]
    })
    return raw_data.count
}


getCitizenRatioByProfession = async (area_code) => {
    area_code = area_code.concat("%")
    raw_data = await citizen.findAndCountAll({
        where: {
            area_code: {
                [Op.like]: area_code
            }
        },
        attributes: 
        [
            "profession"
        ],
        group: [
            "profession"
        ]
    })
    return raw_data.count
}

getCitizenRatioByReligion = async (area_code) => {
    area_code = area_code.concat("%")
    raw_data = await citizen.findAndCountAll({
        where: {
            area_code: {
                [Op.like]: area_code
            }
        },
        attributes: 
        [
            "religion"
        ],
        group: [
            "religion"
        ]
    })
    return raw_data.count
}


getCitizenRatioByEducation = async (area_code) => {
    area_code = area_code.concat("%")
    raw_data = await citizen.findAndCountAll({
        where: {
            area_code: {
                [Op.like]: area_code
            }
        },
        attributes: 
        [
            "education"
        ],
        group: [
            "education"
        ]
    })
    return raw_data.count
}

const citizenControl = {
    getCitizenList: getCitizenList,
    addCitizen: addCitizen,
    getCitizenRatioByGender: getCitizenRatioByGender,
    getCitizenRatioByEducation: getCitizenRatioByEducation,
    getCitizenRatioByProfession: getCitizenRatioByProfession,
    getCitizenRatioByReligion: getCitizenRatioByReligion,
}

module.exports = citizenControl