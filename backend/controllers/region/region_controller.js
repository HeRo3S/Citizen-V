const area = require("../../models/area")

addRegion = async (name, code, level, belong_to) => {
    area.create({
        name: name,
        code: code,
        level: level,
        belong_to: belong_to
    })
}

const regionControl = {
    addRegion : addRegion
}

module.exports = regionControl