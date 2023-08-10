const {ItemsBill, Bill} = require("../database");
const { Association } = require("sequelize");
const { Op } = require("sequelize");

const getItems = async() => {
    const items = await ItemsBill.findAll( {
    include: [
        {association: "Bill", attributes: ['number', 'date', 'uidUser', 'idUser']}
    ]});
    return items;
};

module.exports = { getItems};