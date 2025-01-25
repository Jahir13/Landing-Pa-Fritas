const Receta = require('../models/receta.model');
const fs = require('fs');
const path = require('path');

const controller = {
    inicio: function (req, res) {
        return res.status(200).send({ message: "<h1>Hola desde Recetas</h1>" });
    },
    getRecetas: async function (req, res) {
        try {
            const recetas = await Receta.find({}).sort();
            if (recetas.length === 0) {
                return res.status(404).send({ message: 'No hay recetas' });
            }
            return res.status(200).send({ recetas });
        } catch (error) {
            return res.status(500).send({ message: 'Error al recuperar los datos' });
        }
    },
    saveReceta: async function (req, res) {
        try {
            const receta = new Receta();
            const params = req.body;
            receta.titulo = params.titulo;
            receta.descripcion = params.descripcion;
            receta.ingredientes = params.ingredientes;
            receta.preparacion = params.preparacion;
            receta.estado = params.estado || 'pendiente';
            receta.autor = params.autor;
            receta.imagen = null;

            const recetaStored = await receta.save();
            if (!recetaStored) {
                return res.status(404).send({ message: 'No se guardó la receta' });
            }
            return res.status(201).send({ receta: recetaStored });
        } catch (error) {
            return res.status(500).send({ message: 'Error al guardar los datos' });
        }
    },
    getReceta: async function (req, res) {
        try {
            const recetaId = req.params.id;
            if (!recetaId) return res.status(404).send({ message: "La receta no existe" });
            const receta = await Receta.findById(recetaId);
            if (!receta) return res.status(404).send({ message: "La receta no existe" });
            return res.status(200).send({ receta });
        } catch (error) {
            return res.status(500).send({ message: 'Error al recuperar los datos' });
        }
    },
    updateReceta: async function (req, res) {
        try {
            const recetaId = req.params.id;
            const update = req.body;

            const recetaUpdated = await Receta.findByIdAndUpdate(recetaId, update, { new: true });
            if (!recetaUpdated) return res.status(404).send({ message: 'La receta no se ha actualizado' });
            return res.status(200).send({ receta: recetaUpdated });
        } catch (error) {
            return res.status(500).send({ message: 'Error al actualizar los datos' });
        }
    },
    deleteReceta: async function (req, res) {
        try {
            const recetaId = req.params.id;
            const recetaRemoved = await Receta.findByIdAndDelete(recetaId);
            if (!recetaRemoved) return res.status(404).send({ message: 'La receta no se puede eliminar' });
            return res.status(200).send({ recetaRemoved });
        } catch (error) {
            return res.status(500).send({ message: 'Error al eliminar los datos' });
        }
    },
    uploadImagen: async function (req, res) {
      try {
        const recetaId = req.params.id;
        let fileName = 'Imagen no subida';

        if (req.files) {
            const filePath = req.files.imagen.path;
            const fileSplit = filePath.split('\\');
            fileName = fileSplit[1];
            const extSplit = fileName.split('.');
            const fileExt = extSplit[1];

            if (fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'gif' || fileExt === 'PNG') {
                const recetaUpdated = await Receta.findByIdAndUpdate(recetaId, { imagen: fileName }, { new: true });
                if (!recetaUpdated) return res.status(404).send({ message: 'La receta no existe y no se puede subir la imagen' });
                return res.status(200).send({ receta: recetaUpdated });
            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({ message: 'Extensión no válida' });
                });
            }
        } else {
            return res.status(200).send({ message: fileName });
        }
    } catch (err) {
        return res.status(500).send({ message: 'La imagen no se ha subido' });
    }
    },
    getImagen: async function (req, res) {
        try {
            const file = req.params.imagen;
            const pathFile = "./uploads/" + file;

            const exists = await fs.promises.access(pathFile)
                .then(() => true)
                .catch(() => false);

            if (exists) return res.sendFile(path.resolve(pathFile));
            else return res.status(200).send({ message: 'La imagen no existe' });
        } catch (err) {
            return res.status(500).send({ message: 'Error al recuperar la imagen' });
        }
    }
};

module.exports = controller;