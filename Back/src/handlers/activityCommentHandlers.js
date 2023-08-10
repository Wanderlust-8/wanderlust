const { Router } = require('express');
const { createComment, getAllComments,
        getCommentById, getCommentByIdActivity,
        getCommentByIdUser, deleteComment,
        updateComment } = require('../controllers/activityCommentsControllers');
const router = Router();

// Ruta para crear comments 
router.post('/', async(req, res) => {
   const datos = req.body;
   try {
       const result = await createComment(datos);
       res.status(200).json(result);
   } catch (error) {
       res.status(500).json({ message: error.message });
   }
});

// Ruta para obtener todos los comentarios
router.get('/', async (req, res) => {
    try {
      const comments = await getAllComments(); // Llamar al controlador para obtener todos los comentarios
      res.status(200).json(comments); // Devolver los comentarios como respuesta
    } catch (error) {
      res.status(500).json({ message: error.message }); // Manejar cualquier error que ocurra durante la obtención de los comentarios
    }
});

// Ruta para obtener todos los comentarios de una misma actividad
router.get('/Activity/:id', async (req, res) => {
  const {id}= req.params;
  try {
    const comments = await getCommentByIdActivity(id); // Llamar al controlador para obtener todos los comentarios
    res.status(200).json(comments); // Devolver los comentarios como respuesta
  } catch (error) {
    res.status(500).json({ message: error.message }); // Manejar cualquier error que ocurra durante la obtención de los comentarios
  }
});


// Ruta para obtener un comentario por su ID
router.get('/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID del comentario desde los parámetros de la URL
    try {
      const comment = await getCommentById(id); // Llamar al controlador para obtener el comentario por su ID
      if (!comment) {
        res.status(404).json({ message: 'Comment not found' }); // Manejar el caso en que el comentario no exista
      } else {
        res.status(200).json(comment); // Devolver el comentario encontrado como respuesta
      }
    } catch (error) {
      res.status(500).json({ message: error.message }); // Manejar cualquier error que ocurra durante la obtención del comentario
    }
});

// Ruta para obtener todos los comentarios de un mismo usuario
router.get('/user/:uid', async (req, res) => {
  const {uid}= req.params;
  try {
    const comments = await getCommentByIdUser(uid); // Llamar al controlador para obtener todos los comentarios
    res.status(200).json(comments); // Devolver los comentarios como respuesta
  } catch (error) {
    res.status(500).json({ message: error.message }); // Manejar cualquier error que ocurra durante la obtención de los comentarios
  }
});

// Ruta para eliminar comentarios
router.delete('/:id', async(req, res) => {
  const {id}= req.params;
  try {
    const comments = await deleteComment(id); 
    res.status(200).json(comments); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//ruta para modificar comentarios
router.put('/:id', async(req, res) => {
  const {id}= req.params;
  const datos = req.body;
  try {
    const comments = await updateComment(id, datos); 
    res.status(200).json(comments); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
})

module.exports = router;