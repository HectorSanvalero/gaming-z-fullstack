const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.run("UPDATE usuarios SET rol = 'admin' WHERE id = 1", function(err) {
    if (err) {
        console.error('❌ Error:', err);
    } else {
        console.log('✅ Usuario actualizado a admin correctamente');
    }
    db.close();
});