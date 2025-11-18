const express = require('express');
const router = express.Router();
const Reseña = require('../models/Reseña');

// GET /api/reseñas - Obtener todas las reseñas
router.get('/', async (req, res) => {
  try {
    const reseñas = await Reseña.find()
      .populate('juegoId', 'titulo imagenPortada')
      .sort({ fechaCreacion: -1 });
    res.json(reseñas);
  } catch (error) {
    res.status(500).json({ 
      mensaje: 'Error al obtener las reseñas', 
      error: error.message 
    });
  }
});

// GET /api/reseñas/juego/:juegoId - Obtener reseñas de un juego específico
router.get('/juego/:juegoId', async (req, res) => {
  try {
    const reseñas = await Reseña.find({ juegoId: req.params.juegoId })
      .sort({ fechaCreacion: -1 });
    res.json(reseñas);
  } catch (error) {
    res.status(500).json({ 
      mensaje: 'Error al obtener las reseñas del juego', 
      error: error.message 
    });
  }
});

// GET /api/reseñas/:id - Obtener una reseña por ID
router.get('/:id', async (req, res) => {
  try {
    const reseña = await Reseña.findById(req.params.id)
      .populate('juegoId', 'titulo imagenPortada');
    
    if (!reseña) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }
    
    res.json(reseña);
  } catch (error) {
    res.status(500).json({ 
      mensaje: 'Error al obtener la reseña', 
      error: error.message 
    });
  }
});

// POST /api/reseñas - Crear una nueva reseña
router.post('/', async (req, res) => {
  try {
    const nuevaReseña = new Reseña(req.body);
    const reseñaGuardada = await nuevaReseña.save();
    res.status(201).json(reseñaGuardada);
  } catch (error) {
    res.status(400).json({ 
      mensaje: 'Error al crear la reseña', 
      error: error.message 
    });
  }
});

// PUT /api/reseñas/:id - Actualizar una reseña
router.put('/:id', async (req, res) => {
  try {
    const reseñaActualizada = await Reseña.findByIdAndUpdate(
      req.params.id,
      { ...req.body, fechaActualizacion: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!reseñaActualizada) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }
    
    res.json(reseñaActualizada);
  } catch (error) {
    res.status(400).json({ 
      mensaje: 'Error al actualizar la reseña', 
      error: error.message 
    });
  }
});

// DELETE /api/reseñas/:id - Eliminar una reseña
router.delete('/:id', async (req, res) => {
  try {
    const reseñaEliminada = await Reseña.findByIdAndDelete(req.params.id);
    
    if (!reseñaEliminada) {
      return res.status(404).json({ mensaje: 'Reseña no encontrada' });
    }
    
    res.json({ 
      mensaje: 'Reseña eliminada exitosamente', 
      reseña: reseñaEliminada 
    });
  } catch (error) {
    res.status(500).json({ 
      mensaje: 'Error al eliminar la reseña', 
      error: error.message 
    });
  }
});

module.exports = router;