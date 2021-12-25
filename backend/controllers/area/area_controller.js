const area = require("../../models/area")
const userAccount = require("../../models/user_account")
const { Sequelize } = require("sequelize/dist")
addArea = async (name, code, level, belong_to) => {
    area.create({
        name: name,
        code: code,
        level: level,
        belong_to: belong_to
    })
}

getChildArea = async(area_id) => {
    raw_data = await area.findAll({
        attributes: ["id", "finish_status", "code", [Sequelize.col('user_account.username'), "full_code"]],
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
    getChildArea: getChildArea
}

module.exports = areaControl