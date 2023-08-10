const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "City",
    {
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

      originCity: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },

      calification: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
