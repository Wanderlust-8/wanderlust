const { Router } = require('express');
const {getHotel,
    searchNameHotel,
    createHotel,
    getHotelById,
    bulkCreateHotels,
    desactivHotel,
    updateHotel
} = require('../controllers/hotelsControllers');

const router = Router();


router.get('/' , async (req, res) => {
   const { name } = req.query;

   try {
    const resultado = name ? await searchNameHotel(name) : await getHotel();
    resultado.length ?
        res.status(200).json(resultado) : res.status(404).json({error: error.message})
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
})

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try{
        const hl = await getHotelById(id);
        hl
        ? res.status(200).json(hl)
        : res.status(404).json("Ciudad no existe")
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})

router.post('/', async (req, res) => {
    const {name, image, calification, stars, details, idCity} = req.body;
    console.log(req.body)

try {
    const hotelNew = await createHotel(name, image, calification, stars, details, idCity);
    res.status(201).json(hotelNew);
} catch (error) {
    console.log(error.message);
    res.status(404).send("Faild create hotel");
}
})

router.post('/massive', async (req, res) => {
  try {
    const hotelsData = req.body;
    if (!hotelsData) {
      throw new Error("Falta agregar los hoteles");
    }

    await bulkCreateHotels(hotelsData);
    return res.status(201).send("Hoteles creados satisfactoriamente");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  });

  //Ruta para desactivar hoteles
router.put('/desactive/:id', async (req, res) => {
  const { id } = req.params;
  try {
   const deleteHo = await desactivHotel(id, false);
    res.status(200).json(deleteHo);
  } catch (error) {
    console.log('error');
    res.status(400).send({ error: 'Desactive Fail' });
  }
});

router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const {newData} = req.body; // Espera que los nuevos datos a actualizar se envíen en el cuerpo de la solicitud
console.log(req.body);
  try {
    const updatedHo = await updateHotel(id, newData);
    res.status(200).json(updatedHo);
  } catch (error) {

    res.status(400).send({ error: 'Update Fail' });
  }
});



module.exports = router;