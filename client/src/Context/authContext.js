import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GithubAuthProvider,
  sendPasswordResetEmail,
  EmailAuthProvider,
  deleteUser as firebaseDeleteUser,
  reauthenticateWithCredential,
} from "firebase/auth";
import { toast } from "react-toastify";
import getFriendlyErrorMessage from "./errorMessages";

// Creando el Contexto
export const authContext = createContext();

// Hook Personalizado
export const useAuth = () => {
  return useContext(authContext);
};

// Proveedores de Google y Facebook
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Se ha enviado un correo para restablecer la contraseña");
      })
      .catch((error) => {
        console.log(error);
        const errorCode = getFriendlyErrorMessage(error.code);
        setError(errorCode);
      });
  };

  const deleteUser = async (email, password) => {
    try {
      // Reautenticar al usuario antes de borrarlo
      const credential = EmailAuthProvider.credential(email, password);
      await reauthenticateWithCredential(currentUser, credential);

      // Borra al usuario
      await firebaseDeleteUser(currentUser);

      // Actualizar el estado de la aplicación
      setCurrentUser(null);
      toast.success("Usuario eliminado con éxito");
    } catch (error) {
      console.error(error);
      const friendlyError = getFriendlyErrorMessage(error.code);
      setError(friendlyError);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    toast.success("Sesión cerrada con éxito");
    return auth.signOut();
  };

  const resetError = () => {
    setError(null);
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setCurrentUser(user);
      return userCredential;
    } catch (error) {
      const errorCode = getFriendlyErrorMessage(error.code);
      setError(errorCode);
    }
  };

  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setCurrentUser(user);
      return userCredential;
    } catch (error) {
      const errorCode = getFriendlyErrorMessage(error.code);
      setError(errorCode);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      setCurrentUser(user);
      return userCredential;
    } catch (error) {
      const errorCode = getFriendlyErrorMessage(error.code);
      setError(errorCode);
    }
  };

  const signInWithFacebook = async () => {
    try {
      const userCredential = await signInWithPopup(auth, facebookProvider);
      const user = userCredential.user;
      setCurrentUser(user);
      return userCredential;
    } catch (error) {
      const errorCode = getFriendlyErrorMessage(error.code);
      setError(errorCode);
    }
  };

  const signInWithGithub = async () => {
    try {
      const userCredential = await signInWithPopup(auth, githubProvider);
      const user = userCredential.user;
      setCurrentUser(user);
      return userCredential;
    } catch (error) {
      const errorCode = getFriendlyErrorMessage(error.code);
      setError(errorCode);
    }
  };

  // Valores proporcionados a través del Contexto
  const value = {
    currentUser,
    register,
    logout,
    login,
    signInWithGoogle,
    signInWithFacebook,
    signInWithGithub,
    error,
    resetError,
    resetPassword,
    deleteUser,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
