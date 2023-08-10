const { Country } = require("../database");
const { Association } = require("../database");

const createCountry = async (name, calification, flag, idContinent) => {
  try {
    await Country.findOrCreate({
      where: { name, calification, flag, idContinent },
    });
  } catch (error) {
    console.log(error.message);
  }
};

const bulkCreateCountries = async (countriesData) => {
  try {
    await Country.bulkCreate(countriesData);
  } catch (error) {
    console.log(error.message);
  }
};

const getCountries = async () => {
  const dbCountries = await Country.findAll();
  return dbCountries;
};

const getCountriesById = async (id) => {
  const dbCountry = await Country.findOne({
    where: {
      id: id,
    },
    include: { association: "Continent", attributes: ["id", "name"] },
  });

  return dbCountry;
};

const getCountryByName = async (name) => {
  console.log(name);
  const dbcountry = await Country.findOne({
    where: {
      name: name,
    },
    include: { association: "Continent", attributes: ["id", "name"] },
  });

  console.log(dbcountry);
  return dbcountry;
};

const deleteCountry = async (id) => {
  const deletedCountry = await Country.destroy({
    where: {
      id: id,
    },
  });

  if (deletedCountry === 0) {
    throw new Error("No se encontró el país con el ID especificado");
  }
};

module.exports = {
  createCountry,
  bulkCreateCountries,
  getCountries,
  getCountriesById,
  getCountryByName,
  deleteCountry,
};
