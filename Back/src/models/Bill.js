
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Bill",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      number: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: Date.now, 
      },
      subtotal: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      taxes: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      fullValue: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      uidUser: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idTransaction: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: true }
  );
};
