const Receta = require('../models/receta'); // Importar el modelo de recetas
const fs = require('fs');
const path = require('path');

// Obtener todas las recetas
exports.getRecetas = async (req, res) => {
  try {
    const recetas = await Receta.find();
    res.status(200).json(recetas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las recetas' });
  }
};

// Guardar una nueva receta
exports.saveReceta = async (req, res) => {
  const { titulo, descripcion, ingredientes, preparacion, estado, autor } = req.body;

  if (!titulo || !descripcion || !ingredientes || !preparacion || !autor) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const nuevaReceta = new Receta({
      titulo,
      descripcion,
      ingredientes: ingredientes.split(','), // Convertir ingredientes a array
      preparacion,
      estado: estado || 'pendiente',
      autor,
    });
    const recetaGuardada = await nuevaReceta.save();
    res.status(201).json(recetaGuardada);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar la receta' });
  }
};

// Obtener una receta por ID
exports.getReceta = async (req, res) => {
  const { id } = req.params;

  try {
    const receta = await Receta.findById(id);
    if (!receta) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }
    res.status(200).json(receta);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la receta' });
  }
};

// Actualizar una receta por ID
exports.updateReceta = async (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;

  try {
    const recetaActualizada = await Receta.findByIdAndUpdate(id, datosActualizados, { new: true });
    if (!recetaActualizada) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }
    res.status(200).json(recetaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la receta' });
  }
};

// Eliminar una receta por ID
exports.deleteReceta = async (req, res) => {
  const { id } = req.params;

  try {
    const recetaEliminada = await Receta.findByIdAndDelete(id);
    if (!recetaEliminada) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }
    res.status(200).json({ message: 'Receta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la receta' });
  }
};

// Subir una imagen asociada a una receta
exports.uploadImagen = async (req, res) => {
  const { id } = req.params;

  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: 'No se ha proporcionado ningún archivo' });
  }

  const filePath = req.files.file.path;
  const fileName = path.basename(filePath);
  const ext = path.extname(fileName).toLowerCase();

  // Validar que sea una imagen
  if (!['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
    fs.unlinkSync(filePath); // Eliminar archivo no válido
    return res.status(400).json({ error: 'Formato de archivo no permitido' });
  }

  try {
    const receta = await Receta.findById(id);
    if (!receta) {
      fs.unlinkSync(filePath);
      return res.status(404).json({ error: 'Receta no encontrada' });
    }

    receta.imagen = fileName;
    await receta.save();
    res.status(200).json({ message: 'Imagen subida correctamente', receta });
  } catch (error) {
    fs.unlinkSync(filePath);
    res.status(500).json({ error: 'Error al subir la imagen' });
  }
};

// Obtener una imagen por nombre de archivo
exports.getImagen = (req, res) => {
  const { imagen } = req.params;
  const filePath = path.resolve(`./uploads/${imagen}`);

  fs.exists(filePath, (exists) => {
    if (exists) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ error: 'Imagen no encontrada' });
    }
  });
};
