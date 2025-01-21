const express = require('express');
const router = express.Router();
const recetaController = require('../controllers/receta.controller'); // Cambiar a 'recetaController'
const multiparty = require('connect-multiparty');
const multipartyMiddleware = multiparty({ uploadDir: './uploads' }); // Directorio de carga de imágenes

//* Ver todas las recetas
router.get('/recetas', recetaController.getRecetas);

//* Guardar una nueva receta
router.post('/recetas', recetaController.saveReceta);

//* Recuperar una receta por ID
router.get('/recetas/:id', recetaController.getReceta);

//* Actualizar una receta por ID
router.put('/recetas/:id', recetaController.updateReceta);

//* Eliminar una receta por ID
router.delete('/recetas/:id', recetaController.deleteReceta);

//* Subir una imagen asociada a una receta
router.post(
  '/subir-imagen/',
  multipartyMiddleware,
  recetaController.uploadImagen
);

//* Obtener una imagen por nombre de archivo
router.get('/recetas-imagen/:imagen', recetaController.getImagen);

module.exports = router;
