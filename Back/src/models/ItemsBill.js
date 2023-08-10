const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "ItemsBill",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      amount: {
        type: DataTypes.INTEGER,
        defautlValue: 0,
      },
      unitPrice: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      totalPrice: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      typeProduct: {
        type: DataTypes.INTEGER,
        defaultValue: 1,      //1=package  2=activitys
      },
      idProduct: {
        type: DataTypes.INTEGER,   //si typeproduct=1 apunta al id del paquete, si es 2 apunta al id de la activity
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,     //aqui se almacena el titulo del paquete o de la actividad
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
