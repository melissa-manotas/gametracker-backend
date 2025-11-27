const express = require('express');
const router = express.Router();
const Juego = require('../models/Juego');
const multer = require('multer');
const path = require('path');

// Configuración de multer para guardar imágenes en /uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// GET /api/juegos - Obtener todos los juegos
router.get('/', async (req, res) => {
  try {
    const juegos = await Juego.find().sort({ fechaCreacion: -1 });
    res.json(juegos);
  } catch (error) {
    res.status(500).json({ 
      mensaje: 'Error al obtener los juegos', 
      error: error.message 
    });
  }
});

// GET /api/juegos/:id - Obtener un juego por ID
router.get('/:id', async (req, res) => {
  try {
    const juego = await Juego.findById(req.params.id);
    
    if (!juego) {
      return res.status(404).json({ mensaje: 'Juego no encontrado' });
    }
    
    res.json(juego);
  } catch (error) {
    res.status(500).json({ 
      mensaje: 'Error al obtener el juego', 
      error: error.message 
    });
  }
});

// POST /api/juegos - Crear un nuevo juego con imagen
router.post('/', upload.single('imagenPortada'), async (req, res) => {
  try {
    const { titulo, descripcion, genero, plataforma } = req.body;
    let imagenPortada = '';
    if (req.file) {
      imagenPortada = `/uploads/${req.file.filename}`;
    }
    const nuevoJuego = new Juego({
      titulo,
      descripcion,
      genero,
      plataforma,
      imagenPortada
    });
    const juegoGuardado = await nuevoJuego.save();
    res.status(201).json(juegoGuardado);
  } catch (error) {
    res.status(400).json({ 
      mensaje: 'Error al crear el juego', 
      error: error.message 
    });
  }
});

// PUT /api/juegos/:id - Actualizar un juego
router.put('/:id', async (req, res) => {
  try {
    const juegoActualizado = await Juego.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!juegoActualizado) {
      return res.status(404).json({ mensaje: 'Juego no encontrado' });
    }
    
    res.json(juegoActualizado);
  } catch (error) {
    res.status(400).json({ 
      mensaje: 'Error al actualizar el juego', 
      error: error.message 
    });
  }
});

// DELETE /api/juegos/:id - Eliminar un juego
router.delete('/:id', async (req, res) => {
  try {
    const juegoEliminado = await Juego.findByIdAndDelete(req.params.id);
    
    if (!juegoEliminado) {
      return res.status(404).json({ mensaje: 'Juego no encontrado' });
    }
    
    res.json({ 
      mensaje: 'Juego eliminado exitosamente', 
      juego: juegoEliminado 
    });
  } catch (error) {
    res.status(500).json({ 
      mensaje: 'Error al eliminar el juego', 
      error: error.message 
    });
  }
});

module.exports = router;