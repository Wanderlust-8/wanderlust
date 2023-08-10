const { Router } = require('express');
const {addSuscribe} = require('../controllers/newslatterController');

const router = Router();


router.post('/', async (req,res) => {
    const { email } = req.body;

    try {
        const response = await addSuscribe(email);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json("Error al suscribirse");
    }
});

// router.put('/unsuscribe', async (req, res) => {
//     const {}
// })






module.exports = router;