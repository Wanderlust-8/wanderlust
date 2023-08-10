const { Router } = require("express");
const {
  createCity,
  getCities,
  getCityById,
  getCityByName,
  bulkCreateCities,
  deleteCity,
} = require("../controllers/cityOriginsControllers");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, idCountry } = req.body;
    if (!name) {
      throw new Error("Falta agregar name");
    }

    if (!idCountry) {
      throw new Error("Falta agregar idCountry ");
    }

    await createCity(name, idCountry);
    return res.status(201).send("Ciudad creada satisfactoriamente");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.post("/massive", async (req, res) => {
  try {
    const citiesData= req.body;
    if (!citiesData) {
      throw new Error("Falta agregar las ciudades");
    }

    await bulkCreateCities(citiesData);
    return res.status(201).send("Ciudades creadas satisfactoriamente");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.get("/", async (req, res) => {
  try {
    const result = await getCities();
    result.length > 0
      ? res.status(200).json(result)
      : res.status(404).json("No hay Ciudades");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const city = await getCityById(id);
    city
      ? res.status(200).json(city)
      : res.status(404).json("Ciudad no existe");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/cities-origins", async (req, res) => {
  try {
    const { name } = req.query;
    const city = await getCityByName(name);

    city
      ? res.status(200).json(city)
      : res.status(404).json("Ciudad no existe");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteCity(id);
    res.status(200).json("Ciudad eliminada");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});







module.exports = router;
