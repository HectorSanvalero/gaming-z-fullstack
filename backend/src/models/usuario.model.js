const db = require('../database/database');
const bcrypt = require('bcryptjs');

class Usuario {
    // Crear usuario
    static async create(usuario, callback) {
        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(usuario.password, 10);
        
        const sql = 'INSERT INTO usuarios (email, password, nombre, rol) VALUES (?, ?, ?, ?)';
        const params = [
            usuario.email,
            hashedPassword,
            usuario.nombre,
            usuario.rol || 'user'
        ];
        
        db.run(sql, params, callback);
    }

    // Buscar usuario por email
    static getByEmail(email, callback) {
        const sql = 'SELECT * FROM usuarios WHERE email = ?';
        db.get(sql, [email], callback);
    }

    // Buscar usuario por ID
    static getById(id, callback) {
        const sql = 'SELECT id, email, nombre, rol, created_at FROM usuarios WHERE id = ?';
        db.get(sql, [id], callback);
    }

    // Verificar contraseña
    static async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    // Obtener todos los usuarios (sin contraseñas)
    static getAll(callback) {
        const sql = 'SELECT id, email, nombre, rol, created_at FROM usuarios';
        db.all(sql, [], callback);
    }
}

module.exports = Usuario;