# 🎮 GameTracker - Backend API

API RESTful para gestionar biblioteca personal de videojuegos.

## 🛠️ Tecnologías

- Node.js
- Express
- MongoDB
- Mongoose

## 📋 Endpoints

### Juegos
- `GET /api/juegos` - Obtener todos los juegos
- `GET /api/juegos/:id` - Obtener un juego
- `POST /api/juegos` - Crear juego
- `PUT /api/juegos/:id` - Actualizar juego
- `DELETE /api/juegos/:id` - Eliminar juego

### Reseñas
- `GET /api/reseñas` - Obtener todas las reseñas
- `GET /api/reseñas/juego/:juegoId` - Reseñas de un juego
- `GET /api/reseñas/:id` - Obtener una reseña
- `POST /api/reseñas` - Crear reseña
- `PUT /api/reseñas/:id` - Actualizar reseña
- `DELETE /api/reseñas/:id` - Eliminar reseña

## 🚀 Instalación
```bash
npm install
```

## ▶️ Ejecutar
```bash
npm run dev
```

## 👩‍💻 Desarrollado por

Melissa Manotas - 2025