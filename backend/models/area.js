const sequelize = require("./sequelize")
const { DataTypes } = require("sequelize/dist")
const userAccount = require("./user_account")
const citizen = require("./citizen")
const area = sequelize.define("area", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.CHAR(30),
        allowNull: false
    },
    finish_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    code: {
        type: DataTypes.CHAR(10),
        allowNull: false        
    },
    level: {
        type: DataTypes.TINYINT,
        allowNull: false
    }
}, {
    indexes: [
        {
            unique: false,
            fields: ['level']
        },
        {
            unique: false,
            fields: ['code']
        }
    ]
})
userAccount.hasOne(area, {
    foreignKey: 'manage_area',
    allowNull: true
})
area.belongsTo(userAccount, {
    foreignKey: 'manage_area',
    allowNull: true
})
area.belongsTo(area, {
    foreignKey: 'belong_to',
    allowNull: true
})
area.hasMany(area, {
    foreignKey: 'belong_to',
    allowNull: true
})
area.hasMany(citizen, {
    foreignKey: 'belong_to',
    allowNull: false
})
citizen.belongsTo(area, {
    foreignKey: 'belong_to',
    allowNull: false
})
module.exports = area