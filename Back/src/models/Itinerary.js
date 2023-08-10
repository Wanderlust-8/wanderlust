const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Itinerary",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      itinerary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
