const { Router } = require("express");
const {getItems} = require("../controllers/itemsBillControllers");
const router = Router();

router.get('/', async(req, res) => {
   try {
       const result = await getItems();
       res.status(200).json(result);
   } catch (error) {
       res.status(500).json({message: error.message});
   }
});

module.exports = router;