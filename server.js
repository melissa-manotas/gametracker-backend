const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// Crear la aplicación Express
const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/juegos', require('./routes/juegos'));
app.use('/api/reseñas', require('./routes/reseñas'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    mensaje: '🎮 API de GameTracker funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      juegos: '/api/juegos',
      reseñas: '/api/reseñas'
    }
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
});
