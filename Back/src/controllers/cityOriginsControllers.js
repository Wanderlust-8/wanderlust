const { CityOrigin } = require("../database");

const createCity = async (name, idCountry) => {
  try {
    const newCity = await CityOrigin.findOrCreate({
      where: { name, idCountry },
    });
  } catch (error) {
    console.log(error.message);
  }
};

const bulkCreateCities = async (citiesData) => {
  try {
    await CityOrigin.bulkCreate(citiesData);
  } catch (error) {
    console.log(error.message);
  }
};

const getCities = async () => {
  const dbCities = await CityOrigin.findAll();
  return dbCities;
};

const getCityById = async (id) => {
  const dbCity = await CityOrigin.findOne({
    where: {
      id: id,
    },
    include: { association: "Country", attributes: ["id", "name"] },
  });
  return dbCity;
};

const getCityByName = async (name) => {
  const dbCity = await CityOrigin.findOne({
    where: {
      name: name,
    },
    include: { association: "Country", attributes: ["id", "name"] },
  });
  console.log(dbCity);
  return dbCity;
};

const deleteCity = async (id) => {
  const deletedCity = await CityOrigin.destroy({
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
