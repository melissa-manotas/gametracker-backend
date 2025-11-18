const mongoose = require('mongoose');

const juegoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true
  },
  genero: {
    type: String,
    required: [true, 'El género es obligatorio'],
    trim: true
  },
  plataforma: {
    type: String,
    required: [true, 'La plataforma es obligatoria'],
    trim: true
  },
  añoLanzamiento: {
    type: Number,
    required: [true, 'El año de lanzamiento es obligatorio'],
    min: [1970, 'El año debe ser mayor a 1970']
  },
  desarrollador: {
    type: String,
    required: [true, 'El desarrollador es obligatorio'],
    trim: true
  },
  imagenPortada: {
    type: String,
    default: ''
  },
  descripcion: {
    type: String,
    default: ''
  },
  completado: {
    type: Boolean,
    default: false
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Juego', juegoSchema);