const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
require('./database/database');
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/categorias', require('./routes/categorias.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ 
        message: 'API Gaming Z funcionando correctamente',
        version: '1.0.0'
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;