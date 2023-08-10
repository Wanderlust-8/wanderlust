const { Admin } = require("../database.js");

// Controller Nuevo Administrador
const createAdmin = async (req, res) => {
  try {
    const { profile, name, lastName, email, password } = req.body;

    // Verificar si falta algún elemento obligatorio
    if (!profile || !name || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Falta uno o más elementos obligatorios" });
    }

    // Validación de formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "El correo electrónico no tiene un formato válido" });
    }

    // Validación de contraseña segura
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/;
    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json({
          message:
            "La contraseña debe tener al menos 5 caracteres e incluir al menos una letra mayúscula, una letra minúscula y un número",
        });
    }

    // Validación de unicidad de correo electrónico
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res
        .status(409)
        .json({ message: "El correo electrónico ya está registrado" });
    }

    // Validación de longitud de campo
    if (
      name.length < 2 ||
      name.length > 50 ||
      lastName.length < 2 ||
      lastName.length > 50
    ) {
      return res
        .status(400)
        .json({
          message:
            "La longitud del nombre y el apellido debe estar entre 2 y 50 caracteres",
        });
    }

    const newAdmin = await Admin.create({
      profile,
      name,
      lastName,
      email,
      password,
    });
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controller llamado a todos los Administradores
const getAllAdmin = async () => {
  const admin = await Admin.findAll();
  return admin;
};

// Controller eliminar un Usuario
const deleteAdmin = async (id) => {
  const user = await Admin.findByPk(id);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  await user.destroy();
};

// Controller llamdo a usuario por Id
const getAdminById = async (id) => {
  const user = await Admin.findByPk(id);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  return user;
};

module.exports = {
  createAdmin,
  getAllAdmin,
   deleteAdmin,
  getAdminById,
};
