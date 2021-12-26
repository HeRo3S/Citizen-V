require("dotenv").config()
const jwt = require("jsonwebtoken")
const userAccount = require("../../models/user_account")

//Create a new user
//Not currently in use due to being not flexible enough

createUser = async (username, password, auth_level, manage_area) => {
    await userAccount.create({
        username: username,
        password: password,
        access_level: auth_level,
        manage_area : manage_area
    })
}

//Check login credential and return user data
authUser = async (username, password) => {
    user = await userAccount.findOne({
        attributes: {
            exclude: ["createdAt", "updatedAt"]
        },
        where: {
            username: username,
        }
    }).catch(error => {
        throw error
    })
    if(user?.validPassword(user, password)){
        user = user.toJSON()
        const {password, ...account_info} = user
        return account_info
    }
    throw new Error("Invalid login credentials")
}

//Verify and decode jwt token

verifyToken = async (req, res, next) => {
    token = req.headers["x-access-token"]
    if(token){
        try{
            decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded
            req.user.user_code = req.user.username
            if(req.user.access_level == 0){
                req.user.user_code = ""
            }
            return next()
        }
        catch(err){
            console.log(err)
        }
    }
    return res.status(403).send({message: "Unauthorized"})
}

const authControl = {
    createUser: createUser,
    authUser: authUser,
    verifyToken: verifyToken
}
module.exports = authControl