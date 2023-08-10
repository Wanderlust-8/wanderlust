const { Router } = require('express');
const {addTypePackages, getTypePackages} = require('../controllers/typePackagesControllers');

const router = Router();

router.post('/', async(req, res) => {
   const {name} = req.body;
   try {
       const result = await addTypePackages(name);
       res.status(200).json(result);     
   } catch (error) {
       res.status(500).json({message: error.message});
   }
});

router.get('/', async(req, res) => {
    let {query1} = req.query;
    try {
        const result = await getTypePackages(query1);  
        res.status(200).json(result);      
    } catch (error) {
        res.status(500).json({message: error.message});  
    }
})

module.exports = router;