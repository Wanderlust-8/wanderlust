//Este modelo almacenara los paquetes turisticos

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Package",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      initialDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      finalDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalLimit: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
      },
      bookings: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      standarPrice: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      promotionPrice: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      duration: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      outboundFlight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      returnFlight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      qualification: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      service: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      offer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: false }
  );
};
