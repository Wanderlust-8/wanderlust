const {Airline} = require('../database');

const addAirline = (name) => {
    //aqui se crearan aerolineas nuevas
    if(!name || name.length === 0) {
        return {message: "El campo name no existe o esta vacio"};
    };
    const xname = name;
    const result = Airline.findOrCreate({where: {name: xname}});
    return result;
};

const mapList = (array) => array.map((result) => {
   return {
       id: result.id,
       name: result.name,
       available: result.available,
   }
});

const getAirlines = async(query1) => {
    //este metodo devuelve la lista de aerolineas
    
    let array = [];
    if(!query1 || query1.length === 0) {
        array = await Airline.findAll();
    } else {
        array = await Airline.findAll({where: {available: true}});
    };
    const resultado = mapList(array);
    return resultado;
};

const addMassiveAirlines = async(arrayAirlines) => {
   if(!arrayAirlines) return {message: "Informacion incompleta"};
   await Airline.bulkCreate(arrayAirlines);
   return {message: "Aerolineas creadas satisfactoriamente"};
};


const getAirlineById = async(id) => {
   const idAir = Number(id);
   const air = await Airline.findByPk(id);
   return air;
};

module.exports = { addAirline, getAirlines, addMassiveAirlines, getAirlineById };