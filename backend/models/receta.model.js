const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecetaSchema = new Schema({
  titulo: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  ingredientes: {
    type: [String],
    required: true,
  },
  preparacion: {
    type: String,
    required: true,
    trim: true,
  },
  estado: {
    type: String,
    enum: ['pendiente', 'aprobada', 'rechazada'],
    default: 'pendiente',
  },
  fechaEnvio: {
    type: Date,
    default: Date.now,
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
});

module.exports = mongoose.model('Receta', RecetaSchema);
