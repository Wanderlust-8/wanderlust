const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Country', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true,

        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        calification: {
          type: DataTypes.DECIMAL,
          defaultValue: 0,         
        },
        flag: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      { timestamps: false }
    );
  }