const express = require('express');
const router = express.Router();
const Resena = require('../models/Resena');
const mongoose = require('mongoose');
const Juego = require('../models/Juego');

// GET /api/resenas - Obtener todas las reseñas
router.get('/', async (req, res) => {
  try {
    const resenas = await Resena.find()
      .populate('juegoId', 'titulo imagenPortada')
      .sort({ fechaCreacion: -1 });
    res.json(resenas);
  } catch (error) {
    res.status(500).json({ 
      mensaje: 'Error al obtener las reseñas', 
      error: error.message 
    });
  }
});

// GET /api/resenas/juego/:juegoId - Obtener reseñas de un juego específico
router.get('/juego/:juegoId', async (req, res) => {
  try {
    const resenas = await Resena.find({ juegoId: req.params.juegoId })
      .sort({ fechaCreacion: -1 });
    res.json(resenas);
  } catch (error) {
    res.status(500).json({ 
      mensaje: 'Error al obtener las reseñas del juego', 
      error: error.message 
    });
  }
});

// GET /api/resenas/:id - Obtener una reseña por ID
router.get('/:id', async (req, res) => {
  try {
    const resena = await Resena.findById(req.params.id)
      .populate('juegoId', 'titulo imagenPortada');
    
    if (!resena) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }
    
    res.json(resena);
  } catch (error) {
    res.status(500).json({ 
      mensaje: 'Error al obtener la reseña', 
      error: error.message 
    });
  }
});

// POST /api/resenas - Crear una nueva reseña
router.post('/', async (req, res) => {
  try {
    const { juegoId } = req.body;
    
    // Validar que el juegoId sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(juegoId)) {
      return res.status(400).json({ mensaje: 'ID de juego inválido' });
    }
    
    // Validar que el juego exista
    const juego = await Juego.findById(juegoId);
    if (!juego) {
      return res.status(404).json({ mensaje: 'Juego no encontrado' });
    }
    
    const nuevaResena = new Resena({
      ...req.body,
      juegoId: mongoose.Types.ObjectId(juegoId)
    });
    const resenaGuardada = await nuevaResena.save();
    await resenaGuardada.populate('juegoId', 'titulo imagenPortada');
    res.status(201).json(resenaGuardada);
  } catch (error) {
    res.status(400).json({ 
      mensaje: 'Error al crear la reseña', 
      error: error.message 
    });
  }
});

// PUT /api/resenas/:id - Actualizar una reseña
router.put('/:id', async (req, res) => {
  try {
    const resenaActualizada = await Resena.findByIdAndUpdate(
      req.params.id,
      { ...req.body, fechaActualizacion: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!resenaActualizada) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }
    
    res.json(resenaActualizada);
  } catch (error) {
    res.status(400).json({ 
      mensaje: 'Error al actualizar la reseña', 
      error: error.message 
    });
  }
});

// DELETE /api/resenas/:id - Eliminar una reseña
router.delete('/:id', async (req, res) => {
  try {
    const resenaEliminada = await Resena.findByIdAndDelete(req.params.id);
    
    if (!resenaEliminada) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }
    
    res.json({ 
      mensaje: 'Reseña eliminada exitosamente', 
      resena: resenaEliminada 
    });
  } catch (error) {
    res.status(500).json({ 
      mensaje: 'Error al eliminar la reseña', 
      error: error.message 
    });
  }
});

module.exports = router;