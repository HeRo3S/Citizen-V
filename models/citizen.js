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
    last_name:{
        type: DataTypes.CHAR(20),
        allowNull: false
    },
    first_name: {
        type: DataTypes.CHAR(40),
        allowNull: false
    },
    gender: {
        type: DataTypes.CHAR(10),
        allowNull: false
    },
    age: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    permanent_address: {
        type: DataTypes.CHAR(120),
        allowNull: false
    },
    temporary_address: {
        type: DataTypes.CHAR(120),
        allowNull: false
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
    }

}, {
    indexes: [
        {
            unique: true,
            fields: ['code']
        },
        {
            unique: false,
            fields: ['age']
        },
        {
            unique: false,
            fields: ['first_name', 'last_name']
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
    ]
})

module.exports = citizen