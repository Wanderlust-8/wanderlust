const { Continent } = require("../database");

const createContinent = async (name) => {
  try {
     await Continent.create({ name });
  } catch (error) {
    console.log(error.message);
  }
};

const bulkCreateContinent = async (contienentsData) => {
  try {
     await Continent.bulkCreate(contienentsData);
  } catch (error) {
    console.log(error.message);
  }
};

const getContinents = async () => {
  const dbContinents = await Continent.findAll();
  return dbContinents;
};
const getContinentsById = async (id) => {
  const dbContinent = await Continent.findOne({
    where: {
      id: id,
    },
  });
  return dbContinent;
};

const getContinentsByName = async (name) => {
    const dbContinents = await Continent.findAll({
    where: {
      name: name,
    },
  });
  return dbContinents;
};

const deleteContinent = async (id) => {
  const deletedContinent = await Continent.destroy({
    where: {
      id: id,
    },
  });

  if (deletedContinent === 0) {
    throw new Error("No se encontró el continente con el ID especificado");
  }
};

module.exports = {
  createContinent,
  bulkCreateContinent,
  getContinents,
  getContinentsById,
  getContinentsByName,
  deleteContinent,
};
