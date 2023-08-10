const getFriendlyErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "El correo electrónico ya está en uso.";
    case "auth/invalid-email":
      return "El correo electrónico no es válido.";
    case "auth/weak-password":
      return "La contraseña debe tener al menos 6 caracteres.";
    case "auth/wrong-password":
      return "La contraseña es incorrecta.";
    case "auth/user-not-found":
      return "El Email no existe.";
    case "auth/too-many-requests":
      return "Demasiados intentos de inicio de sesión fallidos. Inténtelo de nuevo más tarde.";
    case "auth/popup-closed-by-user":
      return "El inicio de sesión con fue cancelado.";
    case "auth/account-exists-with-different-credential":
      return "El correo electrónico ya está en uso.";
    case "auth/operation-not-allowed":
      return "El inicio de sesión con no está habilitado.";
    case "auth/credential-already-in-use":
      return "El correo electrónico ya está en uso.";
    case "auth/invalid-credential":
      return "El inicio de sesión con  no está habilitado.";
    case "auth/missing-email":
      return "El correo electrónico es requerido.";
    default:
      return "Ha ocurrido un error. Inténtelo de nuevo más tarde.";
  }
};

export default getFriendlyErrorMessage;
