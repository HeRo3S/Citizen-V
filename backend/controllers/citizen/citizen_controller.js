const { Op, fn, col } = require("sequelize/dist")
const moment = require("moment")
const citizen = require("../../models/citizen")


//Get the amount of citizen in the specified area array

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

//Add a new citizen to the specified area

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

//Find citizen from post request
//Don't use like a normal function

findCitizen = async (req, res, next) => {
    console.log(req.body)
    //Validate data
    target_code = (req.body.code? req.body.code : "")
    target_name = (req.body.name? req.body.name : "")
    target_gender = (req.body.gender? req.body.gender : "")

    //Create and validate additional option
    additional_option = [
        {name: target_name},
        {gender: target_gender},
    ]
    if(req.body.profession && req.body.profession != ''){
        additional_option.push({profession: req.body.profession})
    }
    if(req.body.religion && req.body.religion != ''){
        additional_option.push({religion: req.body.religion})
    }
    if(req.body.education && req.body.education != ''){
        additional_option.push({education: req.body.education})
    }
    if(req.body.birthday && req.body.birthday != ''){
        additional_option.push({birthday: req.body.birthday})
    }

    try{
        raw_data = await citizen.findOne({
            where: {
                [Op.or] : [
                    {code: target_code},
                    {[Op.and] : additional_option
                }
                ]
            }
        })
        if(!raw_data){
            return res.status(404)
        }
        req.req_citizen = raw_data.toJSON()
        return next()
    }
    catch(err){
        console.log(err)
    }
    return res.status(404)
}

const citizenControl = {
    getCitizenList: getCitizenList,
    addCitizen: addCitizen,
    getCitizenRatioByAttribute: getCitizenRatioByAttribute,
    getCitizenCountByAge: getCitizenCountByAge,
    getCitizenRatioByAge: getCitizenRatioByAge,
    findCitizen: findCitizen,
}

module.exports = citizenControl