const express = require('express');
const cors = require('cors');
const app = express();

// Configuración de CORS
const allowedOrigins = ['https://proyectofront-2.onrender.com'];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Si es necesario para autenticación
}));

// Resto de la configuración del servidor
