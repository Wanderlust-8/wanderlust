const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "PaymentDetail",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },

      uidUser: {
        type: DataTypes.STRING,
        allowNull: false,
      },  

      idTransaction: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
};
