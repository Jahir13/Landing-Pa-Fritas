const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Obtener todos los usuarios
router.get('/', userController.getUsers);

// Obtener un usuario por ID
router.get('/:id', userController.getUserById);

// Crear un nuevo usuario
router.post('/', userController.createUser);

// In your routes file, e.g., user.routes.js
router.post('/login', async (req, res) => {
    const { email, contraseña } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user && await bcrypt.compare(contraseña, user.contraseña)) { // Note: use bcrypt to compare hashed passwords
        // Don't send password back to client
        const { contraseña, ...userWithoutPassword } = user.toObject();
        res.json(userWithoutPassword);
      } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al autenticar usuario', error: error.message });
    }
  });

module.exports = router;
