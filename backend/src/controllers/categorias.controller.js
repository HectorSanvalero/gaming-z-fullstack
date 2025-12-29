const Categoria = require('../models/categoria.model');

// Obtener todas las categorías
exports.getAllCategorias = (req, res) => {
    Categoria.getAll((err, categorias) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener categorías' });
        }
        res.json(categorias);
    });
};

// Obtener categoría por ID
exports.getCategoriaById = (req, res) => {
    const { id } = req.params;
    
    Categoria.getById(id, (err, categoria) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener categoría' });
        }
        if (!categoria) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.json(categoria);
    });
};

// Crear categoría
exports.createCategoria = (req, res) => {
    const categoria = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    };

    Categoria.create(categoria, function(err) {
        if (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                return res.status(400).json({ error: 'La categoría ya existe' });
            }
            return res.status(500).json({ error: 'Error al crear categoría' });
        }
        res.status(201).json({ 
            message: 'Categoría creada exitosamente',
            id: this.lastID 
        });
    });
};

// Actualizar categoría
exports.updateCategoria = (req, res) => {
    const { id } = req.params;
    
    const categoria = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    };

    Categoria.update(id, categoria, function(err) {
        if (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                return res.status(400).json({ error: 'La categoría ya existe' });
            }
            return res.status(500).json({ error: 'Error al actualizar categoría' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.json({ message: 'Categoría actualizada exitosamente' });
    });
};

// Eliminar categoría
exports.deleteCategoria = (req, res) => {
    const { id } = req.params;
    
    Categoria.delete(id, function(err) {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar categoría' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.json({ message: 'Categoría eliminada exitosamente' });
    });
};

// Obtener productos de una categoría
exports.getProductosByCategoria = (req, res) => {
    const { id } = req.params;
    
    Categoria.getProductos(id, (err, productos) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener productos' });
        }
        res.json(productos);
    });
};