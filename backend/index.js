const app = require('./app');
const mongoose = require('mongoose');

const PORT = 3000; // Puedes cambiar el puerto si es necesario

mongoose
  .connect('mongodb://localhost:27017/prjREQ', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
  });
