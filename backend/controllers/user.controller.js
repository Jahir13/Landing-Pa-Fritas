const User = require('../models/user.model');

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios', details: err });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
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
    const newUser = new User({ nombre, email, contraseña, rol });
    await newUser.save();
    res.status(201).json({ message: 'Usuario creado', user: newUser });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear usuario', details: err });
  }
};

module.exports = { getUsers, getUserById, createUser };
