const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Error al conectar con la base de datos:', err);
    } else {
        console.log('✅ Conectado a la base de datos SQLite');
        initDatabase();
    }
});

// Inicializar tablas
function initDatabase() {
    // Tabla Categorías
    db.run(`
        CREATE TABLE IF NOT EXISTS categorias (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL UNIQUE,
            descripcion TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Tabla Productos
    db.run(`
        CREATE TABLE IF NOT EXISTS productos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            descripcion TEXT,
            precio REAL NOT NULL,
            categoria_id INTEGER,
            imagen TEXT,
            stock INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (categoria_id) REFERENCES categorias(id)
        )
    `);

    // Tabla Usuarios
    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            nombre TEXT NOT NULL,
            rol TEXT DEFAULT 'user',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('❌ Error al crear tablas:', err);
        } else {
            console.log('✅ Tablas creadas/verificadas correctamente');
            insertInitialData();
        }
    });
}

// Insertar datos iniciales
function insertInitialData() {
    // Insertar categorías iniciales
    const categorias = [
        ['Ratones', 'Ratones gaming de alta precisión'],
        ['Teclados', 'Teclados mecánicos gaming'],
        ['Auriculares', 'Auriculares gaming con sonido envolvente']
    ];

    categorias.forEach(([nombre, descripcion]) => {
        db.run(
            'INSERT OR IGNORE INTO categorias (nombre, descripcion) VALUES (?, ?)',
            [nombre, descripcion]
        );
    });

    console.log('✅ Datos iniciales insertados');
}

module.exports = db;