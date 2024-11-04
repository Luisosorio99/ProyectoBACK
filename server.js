const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const db = require('./app/config/db.config.js');

// Sincronizar la base de datos
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync with { force: true }');
});

// Importar el enrutador
let router = require('./app/routers/router.js');

// Configuración de CORS
const cors = require('cors');
const allowedOrigins = ['http://localhost:3000','https://proyectofront-2.onrender.com']; 
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {

      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Middleware para parsear JSON
app.use(bodyParser.json());
app.use('/', router);

// Ruta para comprobar si el servidor está en funcionamiento
app.get("/", (req, res) => {
  res.json({message: "HOLA I AM LIVE!!"});
});

// Crear el servidor
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, '0.0.0.0', function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
