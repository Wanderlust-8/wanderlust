const { Router } = require("express");
const {
  getAllUsers,
  deleteUser,
  getUserByUid,
  createUser,
  updateUser,
} = require("../controllers/usersControllers");

const router = Router();

// Crear un nuevo usuario
router.post("/", async (req, res) => {
  const datos = req.body;
  try {
    const result = await createUser(datos);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar un usuario por su uid
router.delete("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    await deleteUser(uid);
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un usuario por su uid
router.get("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await getUserByUid(uid);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para modificar un usuario por su id
router.put("/:uid", async (req, res) => {
  console.log("ESTO LELGA", req.params);
  const { uid } = req.params;
  const newData = req.body; // Los datos que se desean modificar se enviarán en el cuerpo de la solicitud.

  try {
    const result = await updateUser(uid, newData);
    res.json(result);
  } catch (error) {
    console.error("Error al modificar el usuario:", error);
    res.status(500).json({ error: "Hubo un problema al modificar el usuario" });
  }
});

module.exports = router;
