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
        unique: true,
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
        beforeBulkUpdate: user => {
            user = user.attributes
            if (user.password.indexOf('$2b$') === 0){
                return
            }
            const salt = bcrypt.genSaltSync()
            user.password = bcrypt.hashSync(user.password, salt)
        }
    }, indexes: [
        {
            unique: true,
            fields: ['username']
        }
    ]
})
userAccount.prototype.validPassword = (user, password) =>{
    try {
        return bcrypt.compareSync(password, user.password);
    } catch (error) {
        console.log(error);
        return false;
    }
}

userAccount.hasOne(userAccount, {
    foreignKey: 'manager_account',
    allowNull: true
})
module.exports = userAccount