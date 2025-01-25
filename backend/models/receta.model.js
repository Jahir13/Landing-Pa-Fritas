const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecetaSchema = new Schema({
    titulo: String,
    descripcion: String,
    ingredientes: [String],
    preparacion: String,
    estado: { type: String, default: 'pendiente' },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    imagen: String,
    fechaEnvio: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Receta', RecetaSchema);