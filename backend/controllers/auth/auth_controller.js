require("dotenv").config()
const jwt = require("jsonwebtoken")
const userAccount = require("../../models/user_account")


createUser = async (username, password, auth_level, manage_area) => {
    await userAccount.create({
        username: username,
        password: password,
        access_level: auth_level,
        manage_area : manage_area
    })
}

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


verifyToken = async (req, res, next) => {
    token = req.headers["x-access-token"]
    decoded = null
    if(token){
        try{
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        }
        catch(err){
            console.log(err)
        }
        if(decoded){
            req.user = decoded
            return next()
        }

    }
    return res.status(401).send({message: "Unauthorized"})
}

const authControl = {
    createUser: createUser,
    authUser: authUser,
    verifyToken: verifyToken
}
module.exports = authControl