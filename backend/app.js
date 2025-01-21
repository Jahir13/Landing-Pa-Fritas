const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const recetasRoutes = require('./routes/recetas.routes'); // Cambiado a "recetas.route"

// Middleware para parsear datos
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar CORS (para permitir peticiones desde distintos orígenes)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permitir cualquier origen
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

// Configurar las rutas
app.use('/', recetasRoutes); // Prefijo "api" para claridad

// Exportar la aplicación
module.exports = app;
