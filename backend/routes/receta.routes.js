const express = require('express');
const router = express.Router();
const recetaController = require('../controllers/receta.controller');
const multiparty = require('connect-multiparty');
const multipartyMiddleware = multiparty({ uploadDir: './uploads' });

// Rutas para recetas
router.get('/inicio', recetaController.inicio);
router.get('/', recetaController.getRecetas);
router.post('/', recetaController.saveReceta);
router.get('/:id', recetaController.getReceta);
router.put('/:id', recetaController.updateReceta);
router.delete('/:id', recetaController.deleteReceta);

// Ruta para subir imagen
router.post('/upload-imagen/:id', multipartyMiddleware, recetaController.uploadImagen);

// Ruta para obtener imagen
router.get('/imagen/:imagen', recetaController.getImagen);

module.exports = router;