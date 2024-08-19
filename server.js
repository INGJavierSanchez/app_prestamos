const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors());

// Clientes
app.get('/clientes', (req, res) => {
  db.all('SELECT * FROM clientes', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/clientes', (req, res) => {
  const { cedula, nombres, apellidos, alias, celular } = req.body;
  db.run('INSERT INTO clientes (cedula, nombres, apellidos, alias, celular) VALUES (?, ?, ?, ?, ?)', [cedula, nombres, apellidos, alias, celular], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id_cliente: this.lastID });
  });
});

// Agregar rutas para prestamos y pagos aquí de forma similar

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
