const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./app/config/db.config.js');
const cors = require('cors');

// Sincronizar la base de datos
db.sequelize.sync({ force: false }).then(() => {
  console.log('Database synchronized');
});

// Importar el enrutador
let router = require('./app/routers/router.js');

// Configuración de CORS
const allowedOrigins = ['http://localhost:3000', 'https://proyectofront-2.onrender.com'];
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsear JSON
app.use(bodyParser.json());
app.use('/', router);

// Ruta para comprobar si el servidor está en funcionamiento
app.get("/", (req, res) => {
  res.json({ message: "HOLA I AM LIVE!!" });
});

// Crear el servidor
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, '0.0.0.0', function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
