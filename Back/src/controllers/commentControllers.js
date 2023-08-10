const { Comment, User, Package } = require('../database');
const { Association } = require("sequelize");

// Controlador para crear nuevos comentarios
const createComment = async (datos) => {
    const { uidUser, testimony, idPackage, calification } = datos;

    // Verificar si falta algún elemento obligatorio
    if (!uidUser || !testimony || !idPackage || !calification) {
      return { message: 'Falta uno o más elementos obligatorios'};
    };
    
    // Verificar si el usuario existe
    const existingUser = await User.findOne({where: {uid: uidUser}});
    if (!existingUser) {
      return { message: 'El usuario no existe' };
    };
    const idUser = existingUser.id;

    // verificar si existe el paquete
    const existingPackage = await Package.findByPk(idPackage);
    if (!existingPackage) {
      return { message: 'El paquete no existe' };
    }  
    const newComment = await Comment.create({ idUser, uidUser, testimony, idPackage, calification });
    return newComment;

};

// Controlador para obtener todos los comentarios
const getAllComments = async () => {
    const comments = await Comment.findAll({
       include: [ { association: "User", attributes: ["uid", "name", "lastName", "avatar", "id"]},
                  { association: "Package", attributes: ["id", "title", "idCity"]} ]
    });
    return comments;
 };

// Controlador para obtener un comentario por su ID
const getCommentById = async (id) => {
    const comment = await Comment.findByPk(id, {
      include: [{ association: "User", attributes: ["uid", "name", "lastName", "avatar", "id"] },
                { association: "Package", attributes: ["id", "title", "idCity"]}]
    }); // Buscar el comentario por su ID en la base de datos
    return comment;
 };

 //Controlador para obtener todos los comentarios de un paquete por el IdPackage
const getCommentByIdPackage = async(id) => {
   if(id == undefined) { return {message: "No ha definido Id del Paquete"}};
   const idPac = Number(id);
   const comment = await Comment.findAll(
      {where: {idPackage: idPac},
      include: [{ association: "User", attributes: ["uid", "name", "lastName", "avatar", "id"] },]
    });
   return comment;
};

//Controlador para obtener todos los comentarios de un usuario
const getCommentByIdUser = async(uid) => {
  if(uid == undefined) { return {message: "No ha definido uid del Usuario"}};

  const comment = await Comment.findAll(
     {where: {uidUser: uid},
     include: [{ association: "Package", attributes: ["id", "title", "idCity"] },]
   });
  return comment;
};

//controlador para eliminar un comentario
const deleteComment = async(id) => {
   const idC = Number(id);
   const registro = await Comment.findByPk(idC);
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
   const actualizado = await Comment.update({testimony}, {where: {id: idC}});
   return actualizado;
};

module.exports = { 
    createComment,
    getAllComments,
    getCommentById,
    getCommentByIdPackage,
    getCommentByIdUser,
    deleteComment,
    updateComment,
 };
