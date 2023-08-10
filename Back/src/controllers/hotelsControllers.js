const {Hotel} = require('../database');


const getHotel = async () =>{
    const hotelDB = await Hotel.findAll(
        {include: { association:'City', attributes:['id', 'name']}}
    );
    return hotelDB;
}

const searchNameHotel = async (name) => {
    const dbHotel = await Hotel.findAll({
        where: {
            name:name
        }, include: { association:'City', attributes:['id', 'name']}
    })

    return dbHotel;
}

const getHotelById = async (id) => {
    const dbHotl = await Hotel.findOne({
      where: {
        id: id,
      },
      include: { association:'City', attributes:['id', 'name']}
    });
    return dbHotl;
  };

const createHotel = async (name, image, calification, stars, details, idCity) => {
    const newHotel = await Hotel.findOrCreate({
        where:{ name, image, calification, stars, details, idCity}
    })

    return newHotel;
};

const bulkCreateHotels = async (hotelsData) => {
    try {
      await Hotel.bulkCreate(hotelsData);
    } catch (error) {
      console.log(error.message);
    }
  };


//Funcion para desactivar el hotel
const desactivHotel = async (id, available) => {
  await Hotel.update({ available: available }, { where: { id: id } });
 const desacHotel = await Hotel.findByPk(id);
 return desacHotel;
}

//funcion para editar actividades
const updateHotel = async (id, newData) => {
  // Metodo para modificar los datos
  await Hotel.update(newData, {
    where: { id: id },
  });
  // Después de la actualización, obtén los datos actualizados
  const updatedHotel = await Hotel.findByPk(id);
  return updatedHotel;
};

module.exports={
    getHotel,
    searchNameHotel,
    getHotelById,
    createHotel,
    bulkCreateHotels,
    desactivHotel,
    updateHotel,
}