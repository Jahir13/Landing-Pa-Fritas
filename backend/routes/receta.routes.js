const express = require('express');
const router = express.Router();
const recetaController = require('../controllers/receta.controller');
const multiparty = require('connect-multiparty');
const multipartyMiddleware = multiparty({ uploadDir: './uploads' }); // Directorio de carga de imágenes

//* Ver todas las recetas
router.get('/', recetaController.getRecetas);

//* Guardar una nueva receta
router.post('/', recetaController.saveReceta);

//* Recuperar una receta por ID
router.get('/:id', recetaController.getReceta);

//* Actualizar una receta por ID
router.put('/:id', recetaController.updateReceta);

//* Eliminar una receta por ID
router.delete('/:id', recetaController.deleteReceta);

//* Subir una imagen asociada a una receta
router.post('/subir-imagen', multipartyMiddleware, recetaController.uploadImagen);

//* Obtener una imagen por nombre de archivo
router.get('/recetas-imagen/:imagen', recetaController.getImagen);

module.exports = router;
