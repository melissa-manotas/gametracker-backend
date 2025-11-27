const mongoose = require('mongoose');

const reseñaSchema = new mongoose.Schema({
  juegoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Juego',
    required: [true, 'El ID del juego es obligatorio']
  },
  puntuacion: {
    type: Number,
    required: [true, 'La puntuación es obligatoria'],
    min: [1, 'La puntuación mínima es 1'],
    max: [5, 'La puntuación máxima es 5']
  },
  textoReseña: {
    type: String,
    required: [true, 'El texto de la reseña es obligatorio'],
    minlength: [10, 'La reseña debe tener al menos 10 caracteres']
  },
  horasJugadas: {
    type: Number,
    required: [true, 'Las horas jugadas son obligatorias'],
    min: [0, 'Las horas no pueden ser negativas']
  },
  dificultad: {
    type: String,
    enum: ['Fácil', 'Normal', 'Difícil'],
    required: [true, 'La dificultad es obligatoria']
  },
  recomendaria: {
    type: Boolean,
    default: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  }
});

// Actualizar fechaActualizacion antes de guardar
reseñaSchema.pre('save', function(next) {
  this.fechaActualizacion = Date.now();
  next();
});

module.exports = mongoose.model('Resena', reseñaSchema);