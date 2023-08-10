const { Sequelize } = require('sequelize');
const {TypePackage} = require('../database');

const addTypePackages = (name) => {
    //aqui se crearan tipos de paquetes nuevos  uno x uno
    if(!name || name.length === 0) {
        return {message: "El campo name no existe o esta vacio"};
    };
    const xname = name;
    const result = TypePackage.findOrCreate({where: {name: xname}});
    return result;
};

const mapList = (array) => array.map((result) => {
   return {
       id: result.id,
       name: result.name,
       available: result.available,
   }
});


const getTypePackages = async(query1) => {
    //este metodo devuelve la lista de tipos de paquetes
 
    let array = [];
    if(!query1 || query1.length === 0) {
        array = await TypePackage.findAll();
    } else {
        array = await TypePackage.findAll({where: {available: true}});
    };
    const resultado = mapList(array);
    return resultado;


};


module.exports = { addTypePackages, getTypePackages };