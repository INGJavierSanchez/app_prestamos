const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS clientes (
    id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,
    cedula TEXT UNIQUE,
    nombres TEXT,
    apellidos TEXT,
    alias TEXT,
    celular TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS prestamos (
    id_prestamo INTEGER PRIMARY KEY AUTOINCREMENT,
    id_cliente INTEGER,
    fecha_prestamo TEXT,
    fecha_pago TEXT,
    interes REAL,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS pagos (
    id_pago INTEGER PRIMARY KEY AUTOINCREMENT,
    id_prestamo INTEGER,
    monto REAL,
    fecha_pago TEXT,
    FOREIGN KEY (id_prestamo) REFERENCES prestamos(id_prestamo)
  )`);
});

module.exports = db;
