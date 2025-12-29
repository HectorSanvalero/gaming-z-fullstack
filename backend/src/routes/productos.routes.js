const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const { body, validationResult } = require('express-validator');

// Middleware de validación
const validateProducto = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('descripcion').optional(),
    body('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
    body('categoria_id').isInt({ min: 1 }).withMessage('La categoría es obligatoria'),
    body('stock').optional().isInt({ min: 0 }).withMessage('El stock debe ser un número positivo'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Rutas públicas
router.get('/', productosController.getAllProductos);
router.get('/:id', productosController.getProductoById);

// Rutas protegidas (requieren autenticación y rol admin)
router.post('/', verifyToken, isAdmin, upload.single('imagen'), validateProducto, productosController.createProducto);
router.put('/:id', verifyToken, isAdmin, upload.single('imagen'), validateProducto, productosController.updateProducto);
router.delete('/:id', verifyToken, isAdmin, productosController.deleteProducto);

module.exports = router;