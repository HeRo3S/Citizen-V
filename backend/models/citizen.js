const sequelize = require("./sequelize")
const { DataTypes } = require("sequelize/dist")
const area = require("./area")

const citizen = sequelize.define("citizen", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    code: {
        type: DataTypes.CHAR(30),
        allowNull: true
    },
    name: {
        type: DataTypes.CHAR(60),
        allowNull: false
    },
    gender: {
        type: DataTypes.CHAR(10),
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    permanent_address: {
        type: DataTypes.CHAR(120),
        allowNull: false
    },
    temporary_address: {
        type: DataTypes.CHAR(120),
        allowNull: false,
        defaultValue: "Không"
    },
    origin_address: {
        type: DataTypes.CHAR(120),
        allowNull: false
    },
    religion: {
        type: DataTypes.CHAR(30),
        allowNull: false,
        defaultValue: "Không"
    },
    education: {
        type: DataTypes.CHAR(30),
        allowNull: true
    },
    profession: {
        type: DataTypes.CHAR(30),
        allowNull: false,
        defaultValue: "Không"
    },
    area_code: {
        type: DataTypes.CHAR(10),
        allowNull: false
    }

}, {
    indexes: [
        {
            unique: true,
            fields: ['code']
        },
        {
            unique: false,
            fields: ['birthday']
        },
        {
            unique: false,
            fields: ['name']
        },
        {
            unique: false,
            fields: ['gender']
        },
        {
            unique: false,
            fields: ['religion']
        },
        {
            unique: false,
            fields: ['education']
        },
        {
            unique: false,
            fields: ['profession']
        },
        {
            unique: false,
            fields: ['area_code']
        }
    ]
})

module.exports = citizen