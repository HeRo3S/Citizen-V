const area = require("../../models/area")

getCitizenList = async (area_id) => {
    data = await area.findOne({
        where: {
            id : area_id
        },
        include:{
            all: true,
            nested: true
        }
    })
    return data
}

const citizenControl = {
    getCitizenList: getCitizenList
}

module.exports = citizenControl