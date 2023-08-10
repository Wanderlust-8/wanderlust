const { Router } = require("express");
const {
  createCountry,
  getCountries,
  getCountriesById,
  getCountryByName,
  bulkCreateCountries,
  deleteCountry,
} = require("../controllers/countriesControllers");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, calification, flag, idContinent } = req.body;
    if (!name) {
      throw new Error("Falta agregar 'name'");
    }

    if (!flag) {
      throw new Error("Falta agregar 'flag'");
    }

    if (!idContinent) {
      throw new Error("Falta agregar 'idContinent'");
    }
    await createCountry(name, calification, flag, idContinent);
    return res.status(201).send("País creado satisfactoriamente");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/massive", async (req, res) => {
  try {
    const countriesData = req.body;
    if (!countriesData) {
      throw new Error("Falta agregar los Países");
    }

    await bulkCreateCountries(countriesData);
    return res.status(201).send("Países creados satisfactoriamente");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const result = name ? await getCountryByName(name) : await getCountries();

    result.length > 0
      ? res.status(200).json(result)
      : res.status(404).json("No hay países");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const country = await getCountriesById(id);
    country
      ? res.status(200).json(country)
      : res.status(404).json("País no existe");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteCountry(id);
    res.status(200).json("País eliminado");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
