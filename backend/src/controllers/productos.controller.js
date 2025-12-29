const Producto = require('../models/producto.model');

// Obtener todos los productos
exports.getAllProductos = (req, res) => {
    Producto.getAll((err, productos) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener productos' });
        }
        res.json(productos);
    });
};

// Obtener producto por ID
exports.getProductoById = (req, res) => {
    const { id } = req.params;
    
    Producto.getById(id, (err, producto) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener producto' });
        }
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(producto);
    });
};

// Crear producto
exports.createProducto = (req, res) => {
    const producto = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        categoria_id: req.body.categoria_id,
        imagen: req.file ? `/uploads/${req.file.filename}` : null,
        stock: req.body.stock || 0
    };

    Producto.create(producto, function(err) {
        if (err) {
            return res.status(500).json({ error: 'Error al crear producto' });
        }
        res.status(201).json({ 
            message: 'Producto creado exitosamente',
            id: this.lastID 
        });
    });
};

// Actualizar producto
exports.updateProducto = (req, res) => {
    const { id } = req.params;
    
    const producto = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        categoria_id: req.body.categoria_id,
        imagen: req.file ? `/uploads/${req.file.filename}` : req.body.imagen,
        stock: req.body.stock
    };

    Producto.update(id, producto, function(err) {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar producto' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto actualizado exitosamente' });
    });
};

// Eliminar producto
exports.deleteProducto = (req, res) => {
    const { id } = req.params;
    
    Producto.delete(id, function(err) {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar producto' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado exitosamente' });
    });
};