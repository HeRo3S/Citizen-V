const area = require("../../models/area")

addArea = async (name, code, level, belong_to) => {
    area.create({
        name: name,
        code: code,
        level: level,
        belong_to: belong_to
    })
}

const areaControl = {
    addArea : addArea
}

module.exports = areaControl