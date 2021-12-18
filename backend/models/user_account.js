const { DataTypes, fn } = require("sequelize/dist")
const sequelize = require("./sequelize")
const bcrypt = require("bcrypt")
const area = require("./area")
const userAccount = sequelize.define("user_account", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    username: {
        type: DataTypes.CHAR(30),
        allowNull: false,
    },
    password: {
        type: DataTypes.CHAR(128),
        allowNull: false
    },
    access_level: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    open_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    hooks: {
        beforeCreate: user => {
            const salt = bcrypt.genSaltSync()
            user.password = bcrypt.hashSync(user.password, salt)
        },
        beforeUpdate: user => {
            if (user.password.indexOf('$2a$') === 0){
                fn(null, user)
                return
            }
            const salt = bcrypt.genSaltSync()
            user.password = bcrypt.hashSync(user.password, salt)
            fn(null, user)
        }
    }
})
userAccount.prototype.validPassword = (user, password) =>{
    try {
        return bcrypt.compareSync(password, user.password);
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = userAccount