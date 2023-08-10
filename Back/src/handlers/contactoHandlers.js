const { Router } = require('express');
const {correoContacto} = require("../controllers/contactoController")

const router = Router();


router.post("/", async (req,res) => {
    const {name, email, phone, message } = req.body;
    try {
        const response = await correoContacto(name, email, phone, message);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).send("Error al enviar el correo");
    }
})


module.exports = router;