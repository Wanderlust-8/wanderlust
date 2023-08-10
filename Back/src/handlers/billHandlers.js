const { Router } = require('express');
const {addBill, getBillById, 
    getAllBill, addMassiveBill} = require("../controllers/billControllers");

const router = Router();

//esta ruta permite crear una factura nueva a partir de la info del carrito suministrado por id
router.post('/', async(req, res) => {
   const datos = req.body;
   try {
       const result = await addBill(datos);
       res.status(200).json(result);
   } catch (error) {
       res.status(500).json({message: error.message});
   };
});

//esta ruta devuelve todas las facturas
router.get('/', async(req, res) => {
    try {
        const result = await getAllBill();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
 });

//esta ruta busca una factura por su ID
router.get('/:id', async(req, res) => {
   const {id} = req.params;
   try {
       const result = await getBillById(id);
       res.status(200).json(result);
   } catch (error) {
       res.status(500).json({message: error.message});
   }
});

//ruta para agregar masivamente Facturas aleatorias 
router.post('/massive', async(req, res) => {
   const {nventas} = req.body; 
   try {
     const result = await addMassiveBill(nventas);
     res.status(200).send("Facturas Masivas generadas exitosamente");
   } catch (error) {
     res.status(500).json({message: error.message});
   }
});


module.exports = router;