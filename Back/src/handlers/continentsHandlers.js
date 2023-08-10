const { Router } = require("express");
const {
  createContinent,
  getContinents,
  getContinentsByName,
  getContinentsById,
  deleteContinent,
  bulkCreateContinent,
} = require("../controllers/continentsControllers");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      throw new Error("Falta agregar 'name'");
    }
    await createContinent(name);
    return res.status(201).send("Continente creado satisfactoriamente");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/massive", async (req, res) => {
  try {
    const continentsData = req.body;

    if (!continentsData) {
      throw new Error("Falta agregar los nombres de los continentes");
    }
    await bulkCreateContinent(continentsData);
    return res.status(201).send("Continentes creados satisfactoriamente");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const result = name
      ? await getContinentsByName(name)
      : await getContinents();
    result.length > 0
      ? res.status(200).json(result)
      : res.status(404).json("No hay continentes");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const continent = await getContinentsById(id);
    continent
      ? res.status(200).json(continent)
      : res.status(404).json("Continente no existe");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteContinent(id);
    res.status(200).json("Continente eliminado");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
