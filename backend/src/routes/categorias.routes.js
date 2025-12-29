const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categorias.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const { body, validationResult } = require('express-validator');

// Middleware de validación
const validateCategoria = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('descripcion').optional(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Rutas públicas
router.get('/', categoriasController.getAllCategorias);
router.get('/:id', categoriasController.getCategoriaById);
router.get('/:id/productos', categoriasController.getProductosByCategoria);

// Rutas protegidas (requieren autenticación y rol admin)
router.post('/', verifyToken, isAdmin, validateCategoria, categoriasController.createCategoria);
router.put('/:id', verifyToken, isAdmin, validateCategoria, categoriasController.updateCategoria);
router.delete('/:id', verifyToken, isAdmin, categoriasController.deleteCategoria);

module.exports = router;