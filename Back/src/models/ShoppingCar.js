const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "ShoppingCar",
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
      state: {
        type: DataTypes.INTEGER,
        defaultValue: 0, //0=pendiente, 1=pagada, 2=anulada
      },
      idBill: {
        type: DataTypes.INTEGER,
        defaultValue: 0, //este id apuntará al id en la tabla de facturas cuando se realice el pago
      },
      fullValue: {
        //almacenará el valor total de la precompra
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      idTransaction: {
         //almacenara temporalmente el id de la ultima transaccion
         type: DataTypes.STRING,
         allowNull: true,
      },
    },
    { timestamps: true }
  );
};
