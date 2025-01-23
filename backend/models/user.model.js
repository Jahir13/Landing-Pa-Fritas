const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  rol: { type: String, required: true, enum: ['admin', 'usuario'], default: 'usuario' },
  fechaRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
