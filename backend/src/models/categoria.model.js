const db = require('../database/database');

class Categoria {
    // Obtener todas las categorías
    static getAll(callback) {
        const sql = 'SELECT * FROM categorias ORDER BY nombre ASC';
        db.all(sql, [], callback);
    }

    // Obtener categoría por ID
    static getById(id, callback) {
        const sql = 'SELECT * FROM categorias WHERE id = ?';
        db.get(sql, [id], callback);
    }

    // Crear categoría
    static create(categoria, callback) {
        const sql = 'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)';
        const params = [categoria.nombre, categoria.descripcion];
        db.run(sql, params, callback);
    }

    // Actualizar categoría
    static update(id, categoria, callback) {
        const sql = 'UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?';
        const params = [categoria.nombre, categoria.descripcion, id];
        db.run(sql, params, callback);
    }

    // Eliminar categoría
    static delete(id, callback) {
        const sql = 'DELETE FROM categorias WHERE id = ?';
        db.run(sql, [id], callback);
    }

    // Obtener productos de una categoría
    static getProductos(id, callback) {
        const sql = 'SELECT * FROM productos WHERE categoria_id = ?';
        db.all(sql, [id], callback);
    }
}

module.exports = Categoria;