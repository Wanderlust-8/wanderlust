const { Router } = require("express");
const {
    generateItinerary,
    getItineraryByid,
    updateItinerary
} = require("../controllers/itineraryController");

const router = Router();

router.post('/', async(req, res) => {
   datos = req.body;
   try {
      const result = await generateItinerary(datos);
      res.status(200).json(result);
   } catch (error) {
      res.status(500).json({message: error.message});
   };

});

// Obtener un usuario por su uid
router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const itinerary = await getItineraryByid(id);
  
      // Parsea el resultado JSON almacenado como cadena a un objeto JSON
      const itineraryData = JSON.parse(itinerary.itinerary);
  
      res.status(200).json(itineraryData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  


  // Ruta para modificar un usuario por su id
router.put("/:id", async (req, res) => {
    const {id} = req.params;
    const newData = req.body; // Los datos que se desean modificar se enviarán en el cuerpo de la solicitud.
  
    try {
      const result = await updateItinerary(id, newData);
      res.json(result);
    } catch (error) {
      console.error("Error al modificar el itinerario:", error);
      res.status(500).json({ error: "Hubo un problema al modificar el itinerario" });
    }
  });
  


module.exports = router;