const User = require('../models/user.model');
const bcrypt = require('bcrypt');

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { contraseña: 0 }); // Excluir la contraseña de la respuesta
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios', details: err });
  }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, { contraseña: 0 }); // Excluir la contraseña
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuario', details: err });
  }
};

const createUser = async (req, res) => {
  try {
    const { nombre, email, contraseña, rol } = req.body;
    if (!nombre || !email || !contraseña) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt);

    const newUser = new User({
      nombre,
      email,
      contraseña: hashedPassword,
      rol: rol || 'usuario', 
    });

    await newUser.save();

    const { contraseña: _, ...userWithoutPassword } = newUser.toObject();

    res.status(201).json({ message: 'Usuario creado', user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear usuario', details: err });
  }
};

const login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    if (!email || !contraseña) {
      return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    const { contraseña: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json({ message: 'Inicio de sesión exitoso', user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: 'Error al autenticar usuario', error: error.message });
  }
};

module.exports = { getUsers, getUserById, createUser, login };