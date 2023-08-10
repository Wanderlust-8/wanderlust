const { ActivityComment, User, Activity } = require('../database');
const { Association } = require("sequelize");

// Controlador para crear nuevos comentarios
const createComment = async (datos) => {
    const { uidUser, testimony, idActivity, calification } = datos;

    // Verificar si falta algún elemento obligatorio
    if (!uidUser || !testimony || !idActivity || !calification) {
      return { message: 'Falta uno o más elementos obligatorios'};
    };
    
    // Verificar si el usuario existe
    const existingUser = await User.findOne({where: {uid: uidUser}});
    if (!existingUser) {
      return { message: 'El usuario no existe' };
    };
    const idUser = existingUser.id;

    // verificar si existe la actividad
    const existingActivity = await Activity.findByPk(idActivity);
    if (!existingActivity) {
      return { message: 'La actividad no existe' };
    }  
    const newComment = await ActivityComment.create({ idUser, uidUser, testimony, idActivity, calification });
    return newComment;

};

// Controlador para obtener todos los comentarios
const getAllComments = async () => {
    const comments = await ActivityComment.findAll({
       include: [ { association: "User", attributes: ["uid", "name", "lastName", "avatar", "id"]},
                  { association: "Activity", attributes: ["id", "name", "duration", "price", "idPackage"]} ]
    });
    return comments;
 };

// Controlador para obtener un comentario por su ID
const getCommentById = async (id) => {
    const comment = await ActivityComment.findByPk(id, {
      include: [{ association: "User", attributes: ["uid", "name", "lastName", "avatar", "id"] },
                { association: "Activity", attributes: ["id", "name", "duration", "price", "idPackage"]}]
    }); // Buscar el comentario por su ID en la base de datos
    return comment;
 };

 //Controlador para obtener todos los comentarios de una actividad por el Id de la actividad
const getCommentByIdActivity = async(id) => {
   if(id == undefined) { return {message: "No ha definido Id de la actividad"}};
   const idAct = Number(id);
   const comment = await ActivityComment.findAll(
      {where: {idActivity: idAct},
      include: [{ association: "User", attributes: ["uid", "name", "lastName", "avatar", "id"] },]
    });
   return comment;
};

//Controlador para obtener todos los comentarios de un usuario
const getCommentByIdUser = async(uid) => {
  if(uid == undefined) { return {message: "No ha definido uid del Usuario"}};

  const comment = await ActivityComment.findAll(
     {where: {uidUser: uid},
     include: [{ association: "Activity", attributes: ["id", "name", "duration", "price", "idPackage"] },]
   });
  return comment;
};

//controlador para eliminar un comentario
const deleteComment = async(id) => {
   const idC = Number(id);
   const registro = await ActivityComment.findByPk(idC);
   if (registro !== null) {
      await registro.destroy();
      return {message: "Comentario Eliminado"};
   };
   return {message: "No se encontro registro a Eliminar"};
};

//controlador para editar comentarios
const updateComment = async(id, datos) => {
   const idC = Number(id);
   const {testimony} = datos;
   const actualizado = await ActivityComment.update({testimony}, {where: {id: idC}});
   return actualizado;
};

module.exports = { 
    createComment,
    getAllComments,
    getCommentById,
    getCommentByIdActivity,
    getCommentByIdUser,
    deleteComment,
    updateComment,
 };
