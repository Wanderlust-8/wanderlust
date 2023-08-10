const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Airline', {
     id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
     },
     name: {
        type: DataTypes.STRING,
        allowNull: false,
     } ,
     available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
     } 
  },{ timestamps: false });
};