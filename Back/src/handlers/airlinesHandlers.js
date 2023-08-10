const { Router } = require('express');
const {addAirline, getAirlines,
       addMassiveAirlines, getAirlineById} = require('../controllers/airlinesControllers');

const router = Router();

//esta ruta agrega una aerolinea
router.post('/', async(req, res) => {
   const {name} = req.body;
   try {
       const result = await addAirline(name);
       res.status(200).json(result);     
   } catch (error) {
       res.status(500).json({message: error.message});
   }
});


//esta ruta trae la lista de todas las aerolineas creadas
router.get('/', async(req, res) => {
    let {query1} = req.query;
    try {
        const result = await getAirlines(query1);  
        res.status(200).json(result);      
    } catch (error) {
        res.status(500).json({message: error.message});  
    }
})


//esta ruta agrega masivamente las aerolineas
router.post('/massive', async(req, res) => {
   const arrayAirlines = req.body 
   try {
       const result = await addMassiveAirlines(arrayAirlines);
       res.status(200).json(result);
   } catch (error) {
       res.status(500).json({message: error.message});  
   }
});


//esta ruta devuelve una aerolinea por su ID
router.get('/:id', async(req, res) => {
   const {id} = req.params;
   try {
       const result = await getAirlineById(id);
       res.status(200).json(result);
   } catch (error) {
       res.status(500).json({message: error.message});  
   }
});

module.exports = router;