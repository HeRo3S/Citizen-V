const { Op, fn, col } = require("sequelize/dist")
const moment = require("moment")
const citizen = require("../../models/citizen")

getCitizenList = async (area_code_arr, amount) => {
    area_code = []
    for(code of area_code_arr){
        area_code.push({[Op.startsWith]: code})
    }
    raw_data = await citizen.findAll({
        where: {
            area_code: {
                [Op.or]: area_code
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

//Get citizen ratio of the specified array of area_code
//Attribute include gender/profession/education/religion
getCitizenRatioByAttribute = async (area_code_arr, attribute) => {
    area_code = []
    for(code of area_code_arr){
        area_code.push({[Op.startsWith]: code})
    }
    raw_data = await citizen.findAll({
        where: {
            area_code: {
                [Op.or]: area_code
            }
        },
        attributes: 
        [
            [attribute, "attribute"],
            [fn("COUNT", col(attribute)), "count"]
        ]
        ,
        group:[
            attribute
        ]
    })
    data = []
    for(sub of raw_data){
        data.push(sub.toJSON())
    }
    return data
}

//Get the total amount of citizens in the specified range
getCitizenCountByAge = async (min_age, max_age, area_code_arr) => {
    lower_hold = moment().subtract(max_age, "years");
    upper_hold = moment().subtract(min_age, "years");
    area_code = []
    for(code of area_code_arr){
        area_code.push({[Op.startsWith]: code})
    }
    raw_data = await citizen.findAll({
        where: {
            birthday: {
                [Op.lt]: upper_hold,
                [Op.gte]: lower_hold 
            },
            area_code: {
                [Op.or]: area_code
            }
        },
        attributes: ["id"]
    })
    return raw_data.length
}

//Pre-defined function to sort and get citizen ratio by age
//No touchy if you don't know what you're doing

getCitizenRatioByAge =async (area_code_arr) => {
    promises = []
    promises.push(getCitizenCountByAge(0, 6, area_code_arr))
    promises.push(getCitizenCountByAge(6, 18, area_code_arr))
    promises.push(getCitizenCountByAge(18, 24, area_code_arr))
    promises.push(getCitizenCountByAge(24, 60, area_code_arr))
    promises.push(getCitizenCountByAge(60, 75, area_code_arr))
    promises.push(getCitizenCountByAge(75, 300, area_code_arr))

    age_data = await Promise.all(promises)
    return [
        ['Số tuổi', 'Tổng'],
        ['0-6', age_data[0]],
        ['6-18', age_data[1]],
        ['18-24', age_data[2]],
        ['24-60', age_data[3]],
        ['60-75', age_data[4]],
        ['75-100+', age_data[5]],
    ]
} 

const citizenControl = {
    getCitizenList: getCitizenList,
    addCitizen: addCitizen,
    getCitizenRatioByAttribute: getCitizenRatioByAttribute,
    getCitizenCountByAge: getCitizenCountByAge,
    getCitizenRatioByAge: getCitizenRatioByAge,
}

module.exports = citizenControl