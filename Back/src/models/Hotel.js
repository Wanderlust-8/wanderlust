const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Hotel', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        image:{
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false,
          },
        calification: {
            type: DataTypes.DECIMAL,
            defaultValue: 0,
            allowNull: false,
        },
        stars:{
            type: DataTypes.DECIMAL,
            defaultValue: 0,
            allowNull: false,
        },
        details: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        available: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }

    },{ timestamps: false })
};