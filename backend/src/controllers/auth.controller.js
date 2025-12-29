const Usuario = require('../models/usuario.model');
const jwt = require('jsonwebtoken');

// Registrar usuario
exports.register = async (req, res) => {
    try {
        const { email, password, nombre } = req.body;

        // Verificar si el usuario ya existe
        Usuario.getByEmail(email, async (err, existingUser) => {
            if (err) {
                return res.status(500).json({ error: 'Error en el servidor' });
            }
            
            if (existingUser) {
                return res.status(400).json({ error: 'El email ya está registrado' });
            }

            // Crear usuario
            const usuario = { email, password, nombre, rol: 'user' };
            
            Usuario.create(usuario, function(err) {
                if (err) {
                    return res.status(500).json({ error: 'Error al crear usuario' });
                }
                
                res.status(201).json({ 
                    message: 'Usuario registrado exitosamente',
                    userId: this.lastID
                });
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario
        Usuario.getByEmail(email, async (err, usuario) => {
            if (err) {
                return res.status(500).json({ error: 'Error en el servidor' });
            }
            
            if (!usuario) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }

            // Verificar contraseña
            const isValidPassword = await Usuario.verifyPassword(password, usuario.password);
            
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }

            // Generar token JWT
            const token = jwt.sign(
                { 
                    id: usuario.id, 
                    email: usuario.email,
                    rol: usuario.rol 
                },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                message: 'Login exitoso',
                token,
                usuario: {
                    id: usuario.id,
                    email: usuario.email,
                    nombre: usuario.nombre,
                    rol: usuario.rol
                }
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Obtener perfil del usuario autenticado
exports.getProfile = (req, res) => {
    Usuario.getById(req.usuario.id, (err, usuario) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener perfil' });
        }
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(usuario);
    });
};