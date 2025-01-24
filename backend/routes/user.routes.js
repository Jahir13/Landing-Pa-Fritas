const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Obtener todos los usuarios
router.get('/', userController.getUsers);

// Obtener un usuario por ID
router.get('/:id', userController.getUserById);

// Crear un nuevo usuario
router.post('/', userController.createUser);

// Iniciar sesión
router.post('/login', userController.login);

module.exports = router;