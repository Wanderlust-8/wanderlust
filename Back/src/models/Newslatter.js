const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Newslatter', {
     id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
     },
     email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
     } ,
     suscribe: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
     } 
  },{ timestamps: true });
};