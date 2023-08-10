const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Comment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    testimony: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    uidUser: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    calification: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 4,
    },

  },{timestamps: true});
};
