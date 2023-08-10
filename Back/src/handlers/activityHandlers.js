const { Router } = require('express');
const {getActivity,
    searchNameActivity,
    createActivity,
    getActivityById,
    desactivActivity,
    updateActivity,
    createMassiveActivitys,
} = require('../controllers/activitiesControllers');

const router = Router();


router.get('/', async (req, res)=>{
    const {name}= req.query;
    console.log(req.query);
    try {
        const resultado = name ? await searchNameActivity(name) : await getActivity();
        resultado.length ? 
        res.status(200).json(resultado) : res.status(404).json({error: error.message});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//esta ruta trae una actividad buscada por su ID
router.get('/:id', async (req, res)=>{
    const {id}= req.params;
    try {
        const resultado =  await getActivityById(id);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/', async(req, res) =>{
    const {name, image, price, included, duration, idPackage} = req.body;
    console.log(req.body);
    try {
        if (!name) {
            return("Faltan datos");
          }
         await createActivity(name, image, price, included, duration, idPackage);
        res.status(201).send("actividad creada exitosamente");
    } catch (error) {
        res.status(404).send("Faild create activity");
    }
})

//Ruta para eliminar actividades
router.put('/desactive/:id', async (req, res) => {
    const { id } = req.params;
    try {
     const deleteActi = await desactivActivity(id, false);
      res.status(200).json(deleteActi);
    } catch (error) {
      console.log('error');
      res.status(400).send({ error: 'Desactive Fail' });
    }
  });

router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const {newData} = req.body; // Espera que los nuevos datos a actualizar se envíen en el cuerpo de la solicitud
  
    try {
      const updatedActi = await updateActivity(id, newData);
      res.status(200).json(updatedActi);
    } catch (error) {
      console.log('error', error);
      res.status(400).send({ error: 'Update Fail' });
    }
  });

  router.post('/massive', async(req, res) => {
     const array = req.body;
     console.log(array)
     try {
        const result = await createMassiveActivitys(array);
        res.status(200).json({message: "Actividades Almacenadas exitosamente"});
     } catch (error) {
        res.status(500).json({message: error.message});
        console.log(message)
     }
  });



module.exports = router;