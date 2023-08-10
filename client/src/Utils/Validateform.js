// Objetivo: Validar los campos del formulario de registro de usuario
// tengo name, lastname, email, password,
//

const validateForm = (input) => {
  let errors = {};
  let regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  if (!input.name) {
    errors.name = "El nombre es obligatorio";
  } else if (input.name.length < 2) {
    errors.name = "El nombre debe tener al menos 2 caracteres";
  }

  if (!input.lastName) {
    errors.lastName = "El apellido es obligatorio";
  } else if (input.lastName.length < 2) {
    errors.lastName = "El apellido debe tener al menos 2 caracteres";
  }

  if (!input.email) {
    errors.email = "El email es obligatorio";
  } else if (!regexEmail.test(input.email)) {
    errors.email = "El email no es válido";
  }

  if (!input.password) {
    errors.password = "La contraseña es obligatoria";
  } else if (input.password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres";
  }

  return errors;
};

export default validateForm;
