const { City } = require("../database");
const { Association } = require("../database");

const createCity = async (name, originCity, idCountry) => {
  try {
    await City.findOrCreate({
      where: { name, originCity, idCountry },
    });
  } catch (error) {
    console.log(error.message);
  }
};

const bulkCreateCities = async (citiesData) => {
  try {
     await City.bulkCreate(citiesData);
  } catch (error) {
    console.log(error.message);
  }
};

const getCities = async () => {
  const dbCities = await City.findAll();
  return dbCities;
};

const getCityById = async (id) => {
  const dbCity = await City.findOne({
    where: {
      id: id,
    },
    include: { association: "Country", attributes: ["id", "name"] },
  });
  return dbCity;
};

const getCityByName = async (name) => {
  const dbCity = await City.findOne({
    where: {
      name: name,
    },
    include: { association: "Country", attributes: ["id", "name"] },
  });
  console.log (dbCity);
  return dbCity;
};

const deleteCity = async (id) => {
  const deletedCity = await City.destroy({
    where: {
      id: id,
    },
  });

  if (deletedCity === 0) {
    throw new Error("No se encontró la ciudad con el ID especificado");
  }
};

module.exports = {
  createCity,
  getCities,
  getCityById,
  getCityByName,
  bulkCreateCities,
  deleteCity,
};
