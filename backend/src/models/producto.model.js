const db = require('../database/database');

class Producto {
    // Obtener todos los productos
    static getAll(callback) {
        const sql = `
            SELECT p.*, c.nombre as categoria_nombre 
            FROM productos p 
            LEFT JOIN categorias c ON p.categoria_id = c.id
            ORDER BY p.created_at DESC
        `;
        db.all(sql, [], callback);
    }

    // Obtener producto por ID
    static getById(id, callback) {
        const sql = `
            SELECT p.*, c.nombre as categoria_nombre 
            FROM productos p 
            LEFT JOIN categorias c ON p.categoria_id = c.id
            WHERE p.id = ?
        `;
        db.get(sql, [id], callback);
    }

    // Crear producto
    static create(producto, callback) {
        const sql = `
            INSERT INTO productos (nombre, descripcion, precio, categoria_id, imagen, stock)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const params = [
            producto.nombre,
            producto.descripcion,
            producto.precio,
            producto.categoria_id,
            producto.imagen,
            producto.stock || 0
        ];
        db.run(sql, params, callback);
    }

    // Actualizar producto
    static update(id, producto, callback) {
        const sql = `
            UPDATE productos 
            SET nombre = ?, descripcion = ?, precio = ?, categoria_id = ?, imagen = ?, stock = ?
            WHERE id = ?
        `;
        const params = [
            producto.nombre,
            producto.descripcion,
            producto.precio,
            producto.categoria_id,
            producto.imagen,
            producto.stock,
            id
        ];
        db.run(sql, params, callback);
    }

    // Eliminar producto
    static delete(id, callback) {
        const sql = 'DELETE FROM productos WHERE id = ?';
        db.run(sql, [id], callback);
    }
}

module.exports = Producto;