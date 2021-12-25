const area = require("../../models/area")
const userAccount = require("../../models/user_account")
const { Sequelize, Op } = require("sequelize/dist")


addArea = async (name, code, level, belong_to) => {
    area.create({
        name: name,
        code: code,
        level: level,
        belong_to: belong_to
    })
}

getChildArea = async(area_code_arr) => {
    raw_data = await area.findAll({
        attributes: ["id", "name", "code", [Sequelize.col('user_account.username'), "full_code"]],
        where: {
            belong_to: {
                [Op.or]: area_code_arr
            }
        },
        include: [
            {
                model: userAccount,
                attributes: []
            }
        ]
    })
    data = []
    for(sub of raw_data){
        data.push(sub.toJSON())
    }
    return data
}

getAreaProgess =async (area_id) => {
    raw_data = await area.findAll({
        attributes: ["id", "name", "code", "finish_status", [Sequelize.col('user_account.username'), "full_code"]],
        where: {
            belong_to: area_id
        },
        include: [
            {
                model: userAccount,
                attributes: []
            }
        ]
    })
    data = []
    for(sub of raw_data){
        data.push(sub.toJSON())
    }
    return data
}

const areaControl = {
    addArea : addArea,
    getChildArea: getChildArea,
    getAreaProgess: getAreaProgess
}

module.exports = areaControl