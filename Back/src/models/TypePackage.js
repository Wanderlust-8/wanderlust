//Este modelo almacenara los tipos de paquetes turisticos

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('TypePackage', {
     id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
     },
     name: {
        type: DataTypes.STRING,
        allowNull: false,
     },
     available : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
     }  
  },{ timestamps: false });
};
